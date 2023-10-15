"use client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";

import { IFormCourse, IEditFormCouse } from "@/types/ICourse";
import { initFormCourse } from "@/utils/initialValues";
import { FormCourseSchema } from "@/utils/validation/course";

import { DateTimePicker, DateTimeValidationError } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from "react";
import { selectFields, textFields } from "../_fields";
import { getChangedValuesObject } from "@/utils/functions";
import { toast } from "react-toastify";
import AboutCourse from "./AboutCourse";

const VisuallyHiddenInput = styled("input")({
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IPropsFormCourse {
  type: "create" | "edit";
  course?: ICourse;
  onSubmit: (value: IFormCourse) => Promise<void>;
}

const FormCourse = ({ type, course, onSubmit }: IPropsFormCourse) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema: FormCourseSchema,
    initialValues: initFormCourse,
    onSubmit: async (values) => {
      try {
        let payload = {
          ...values,
        } as IFormCourse;
        if (thumbnail?.file) payload["thumbnail"] = thumbnail?.file;
        if (roadmap) payload["roadmap"] = roadmap;

        if (payload.type === "private") {
          const formatOpenDate = dayjs(openDate).toISOString();
          const formatCloseDate = dayjs(closeDate).toISOString();

          if (type === "edit") {
            if (formatOpenDate !== course?.openDate) payload.openDate = formatOpenDate;
            if (formatCloseDate !== course?.closeDate) payload.closeDate = formatCloseDate;
          } else {
            Object.assign(payload, {
              openDate: formatOpenDate,
              closeDate: formatCloseDate,
            });
          }
        }

        if (type === "edit" && course) {
          payload = getChangedValuesObject(payload, course);
        }
        if (type === "create" && !payload["thumbnail"]) {
          toast.error("Thumbnail is required");
          return;
        }
        await onSubmit(payload);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  const [thumbnail, setThumbnail] = useState<{ file: File | null; preview: string }>();
  const [roadmap, setRoadmap] = useState<File | null>();
  const [openDate, setOpenDate] = useState<string | null | dayjs.Dayjs>(null);
  const [closeDate, setCloseDate] = useState<string | null | dayjs.Dayjs>(null);
  const [errorOpenDate, setErrorOpenDate] = useState<DateTimeValidationError | null>(null);
  const [errorCloseDate, setErrorCloseDate] = useState<DateTimeValidationError | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (course) {
      const data = {} as any;
      // Get value is compatiable with values
      for (const key of Object.keys(initFormCourse)) {
        data[key] = course[key as keyof ICourse];
      }
      setValues(data);
      course.openDate && setOpenDate(dayjs(course.openDate));
      course.closeDate && setCloseDate(dayjs(course.closeDate));
    }
  }, [course]);

  useEffect(() => {
    return () => {
      thumbnail?.preview && URL.revokeObjectURL(thumbnail.preview);
    };
  }, [thumbnail]);

  useEffect(() => {
    if (values.type === "private") {
      if (!openDate) setOpenDate(dayjs().add(1, "hour"));
      if (!closeDate) setCloseDate(dayjs().add(2, "day"));
    }
  }, [values.type]);

  // Peview thumbnail
  const onPreviewThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.includes("image"))
      setThumbnail({
        file,
        preview: URL.createObjectURL(file),
      });
    thumbnailInputRef.current!.value = "";
  };

  // On change fiel roadmap

  const onChangeRoadmap = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setRoadmap(file);
  };

  // On change open date
  const handleChangeOpenDate = (value: any) => {
    if (!value) {
      setOpenDate(null);
    } else {
      setOpenDate(value);
    }
  };

  // On change close date
  const handleChangeCloseDate = (value: any) => {
    if (!value) {
      setCloseDate(null);
    } else {
      setCloseDate(value);
    }
  };

  // Message for open date
  const errorOpenDateMessage = useMemo(() => {
    switch (errorOpenDate) {
      case "minTime": {
        return "Please select a datetime more than 30 minutes now";
      }

      default: {
        return "";
      }
    }
  }, [errorOpenDate]);

  // Message for close date
  const errorCloseDateMessage = useMemo(() => {
    switch (errorCloseDate) {
      case "minTime": {
        return "Please select a datetime more than 4 hours open date";
      }

      default: {
        return "";
      }
    }
  }, [errorCloseDate]);

  // Disabled open date register: when open date is past time
  const isPastOpenDate = useMemo(() => {
    if (course?.openDate) {
      const now = new Date().getTime();
      const openDate = new Date(course.openDate).getTime();
      return now - openDate > 0;
    }
  }, [course, type]);

  return (
    <Box pt={1} pb={2}>
      <Typography
        variant="h2"
        className="underline-gradient"
        margin={"0 auto"}
        textTransform="capitalize"
        gutterBottom
        mb={2}
      >
        {type} course
      </Typography>

      {/* About */}
      {course && <AboutCourse course={course} />}

      {/* Form */}
      <Grid
        container
        mt={1}
        spacing={2}
        component={"form"}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        onSubmit={handleSubmit}
      >
        {/* Text fields */}
        {textFields.map((props, i) => (
          <Grid key={i} item md={6} xs={12}>
            <TextField
              {...props}
              value={values[props.name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched[props.name] && errors[props.name])}
              helperText={touched[props.name] && errors[props.name]}
            />
          </Grid>
        ))}

        {/* Select fields */}
        {selectFields.map(({ props, menuItem }, i) => (
          <Grid key={i} item md={6} xs={12}>
            <FormControl fullWidth required>
              <Typography variant="subtitle2" color="text.secondary">
                {props.label}
              </Typography>
              <Select
                {...props}
                MenuProps={{
                  disableScrollLock: true,
                }}
                value={values[props.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched[props.name] && errors[props.name])}
              >
                {menuItem.map((menu, j) => (
                  <MenuItem key={j} value={menu.value}>
                    {menu.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched[props.name] && errors[props.name]}</FormHelperText>
            </FormControl>
          </Grid>
        ))}

        {/* Open date*/}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DateTimePicker
              disablePast={type === "create"}
              label="Open date register"
              disabled={!!(values.type === "public") || isPastOpenDate}
              minDateTime={type === "create" ? dayjs().add(29, "minutes") : undefined}
              value={values.type === "private" ? openDate ?? dayjs().add(1, "hour") : null}
              slotProps={{
                textField: {
                  helperText: errorOpenDateMessage || (isPastOpenDate && "Open date was past"),
                  InputProps: {
                    disabled: true,
                    sx: {
                      ".mui-aw45kt-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "text.primary",
                      },
                    },
                  },
                },
              }}
              onError={(newError) => setErrorOpenDate(newError)}
              onChange={handleChangeOpenDate}
            />
          </FormControl>
        </Grid>

        {/* Close date */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DateTimePicker
              disablePast
              label="Close date register"
              disabled={!!(values.type === "public")}
              value={values.type === "private" ? closeDate ?? dayjs().add(2, "day") : null}
              minDateTime={dayjs(openDate).add(4, "hour") || dayjs().add(4, "hour")}
              slotProps={{
                textField: {
                  helperText: errorCloseDateMessage,
                  InputProps: {
                    disabled: true,
                  },
                  sx: {
                    ".mui-aw45kt-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                      WebkitTextFillColor: "text.primary",
                    },
                  },
                },
              }}
              onError={(newError) => setErrorCloseDate(newError)}
              onChange={handleChangeCloseDate}
            />
          </FormControl>
        </Grid>

        {/* Upload files */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload roadmap
              <VisuallyHiddenInput type="file" onChange={onChangeRoadmap} />
            </Button>
            <FormHelperText>{roadmap?.name}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Upload thumbnail */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            {thumbnail?.preview && (
              <Box position={"relative"} mb={2}>
                <Image
                  src={thumbnail.preview}
                  alt="thumb-nail"
                  width={300}
                  height={300}
                  style={{ borderRadius: 12, margin: "0 auto" }}
                />
                <IconButton
                  sx={{ position: "absolute", top: 0, right: 5 }}
                  onClick={() =>
                    setThumbnail({
                      file: null,
                      preview: "",
                    })
                  }
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>
            )}
            <Button
              component="label"
              variant="contained"
              color="info"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload thumbnail*
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                ref={thumbnailInputRef}
                onChange={onPreviewThumbnail}
              />
            </Button>
            <Typography variant="caption" ml={1} mt={1}>
              Accept: image/png, image/gif, image/jpeg
            </Typography>
          </FormControl>
        </Grid>

        {/* Intro */}
        <Grid item md={12} xs={12}>
          <FormControl fullWidth>
            <TextField
              multiline
              fullWidth
              name="intro"
              margin="dense"
              variant="outlined"
              placeholder="Introduce course"
              spellCheck={false}
              minRows={5}
              value={values.intro || ""}
              error={!!(touched.intro && errors.intro)}
              helperText={touched.intro && errors.intro}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </FormControl>
        </Grid>

        <Grid item md={12} display={"flex"} justifyContent={"end"}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!!(errorOpenDate || errorCloseDate || isSubmitting)}
          >
            {type === "create" ? "Create" : "Edit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(FormCourse);
