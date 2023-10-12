"use client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

import { initFormCourse } from "@/utils/initialValues";
import { FormCourseSchema } from "@/utils/validation/course";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { textFields, selectFields } from "../_fields";
import dayjs from "dayjs";
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
}

const FormCourse = ({ type }: IPropsFormCourse) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    validationSchema: FormCourseSchema,
    initialValues: initFormCourse,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        thumbnail: thumbnail?.file,
        roadmap,
      };

      if (payload.type === "private") {
        Object.assign(payload, {
          openDate: dayjs(openDate).toISOString(),
          closeDate: dayjs(closeDate).toISOString(),
        });
      }

      console.log("payload: ", payload);
    },
  });

  const [thumbnail, setThumbnail] = useState<{ file: File | null; preview: string }>();
  const [roadmap, setRoadmap] = useState<File | null>();
  const [openDate, setOpenDate] = useState<string | null | dayjs.Dayjs>();
  const [closeDate, setCloseDate] = useState<string | null | dayjs.Dayjs>();

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      thumbnail?.preview && URL.revokeObjectURL(thumbnail.preview);
    };
  }, [thumbnail]);

  useEffect(() => {
    if (values.type === "private") {
      if (!openDate) setOpenDate(dayjs().add(1, "day"));
      if (!closeDate) setCloseDate(dayjs().add(1, "day"));
    }
  }, [values.type]);

  // Peview thumbnail
  const onPreviewThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file)
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
    try {
      if (!value) {
        setOpenDate(null);
      } else {
        setOpenDate(dayjs(value).toISOString());
      }
    } catch (error) {}
  };

  // On change close date
  const handleChangeCloseDate = (value: any) => {
    try {
      if (!value) {
        setCloseDate(null);
      } else {
        setCloseDate(dayjs(value).toISOString());
      }
    } catch (error) {}
  };

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

      {/* Form */}
      <Grid container mt={2} spacing={2} component={"form"} onSubmit={handleSubmit}>
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

        {/* Date */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DateTimePicker
              disablePast
              label="Open date register"
              disabled={!!(values.type === "public")}
              minDate={dayjs()}
              value={values.type === "private" ? openDate ?? dayjs().add(1, "day") : null}
              onChange={handleChangeOpenDate}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DateTimePicker
              disablePast
              label="Close date register"
              disabled={!!(values.type === "public")}
              value={values.type === "private" ? closeDate ?? dayjs().add(1, "day") : null}
              minDate={dayjs(openDate) || dayjs()}
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
                ref={thumbnailInputRef}
                onChange={onPreviewThumbnail}
              />
            </Button>
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
            />
          </FormControl>
        </Grid>

        <Grid item md={12} display={"flex"} justifyContent={"end"}>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            {type === "create" ? "Send" : "Edit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormCourse;
