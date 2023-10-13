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
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";

import { DateTimePicker, DateTimeValidationError } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { initFormCourse } from "@/utils/initialValues";
import { FormCourseSchema } from "@/utils/validation/course";
import { selectFields, textFields } from "../_fields";
import { IFormCourse } from "@/types/ICourse";
import { Stack } from "@mui/material";
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
  const { values, errors, touched, setValues, handleBlur, handleChange, handleSubmit } = useFormik({
    validationSchema: FormCourseSchema,
    initialValues: initFormCourse,
    onSubmit: async (values) => {
      const payload = {
        ...values,
      } as IFormCourse;
      if (thumbnail?.file) payload["thumbnail"] = thumbnail?.file;
      if (roadmap) payload["roadmap"] = roadmap;

      if (payload.type === "private") {
        Object.assign(payload, {
          openDate: dayjs(openDate).toISOString(),
          closeDate: dayjs(closeDate).toISOString(),
        });
      }
      await onSubmit(payload);
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
      setValues(course);
      course.openDate && setOpenDate(course.openDate);
      course.closeDate && setCloseDate(course.closeDate);
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

  return (
    <Box pt={1} pb={2}>
      <Typography
        variant="h2"
        className="underline-gradient"
        margin={"0 auto"}
        textTransform="capitalize"
        gutterBottom
      >
        {type} course
      </Typography>

      {course && (
        <Stack mt={2} gap={1} flexDirection={"row"} flexWrap={"wrap"}>
          <Image
            src={course.thumbnail.uri}
            alt="thumb-nail"
            width={300}
            height={300}
            style={{ borderRadius: 12, objectFit: "contain" }}
          />
          <Box component={"ul"}>
            <Typography component={"li"} variant="body1" gutterBottom>
              Created time: {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
            </Typography>
            <Typography component={"li"} variant="body1" gutterBottom>
              Updated time: {dayjs(course.updatedAt).format("MMMM D, YYYY h:mm A")}
            </Typography>
            <Typography component={"li"} variant="body1" gutterBottom>
              Lessons: {course.lessons.length}
            </Typography>
            <Typography component={"li"} variant="body1" gutterBottom>
              Members: {course.members.length}
            </Typography>
          </Box>
        </Stack>
      )}

      {/* Form */}
      <Grid
        container
        mt={2}
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
              disablePast
              label="Open date register"
              disabled={!!(values.type === "public")}
              minDateTime={dayjs().add(29, "minutes")}
              value={values.type === "private" ? openDate ?? dayjs().add(1, "hour") : null}
              slotProps={{
                textField: {
                  helperText: errorOpenDateMessage,
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
              Upload thumbnail
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
            disabled={!!(errorOpenDate || errorCloseDate)}
          >
            {type === "create" ? "Send" : "Edit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormCourse;
