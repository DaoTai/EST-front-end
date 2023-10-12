"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";

import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { FormCourseSchema } from "@/utils/validation/course";
import { initFormCourse } from "@/utils/initialValues";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

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
  const { values } = useFormik({
    validationSchema: FormCourseSchema,
    initialValues: initFormCourse,
    onSubmit: async (values) => {},
  });

  const [thumbnail, setThumbnail] = useState<{ file: File | null; preview: string }>();

  useEffect(() => {
    return () => {
      thumbnail?.preview && URL.revokeObjectURL(thumbnail.preview);
    };
  }, [thumbnail]);

  const onPreviewThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file)
      setThumbnail({
        file,
        preview: URL.createObjectURL(file),
      });
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
      <Grid container mt={2} spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField required fullWidth placeholder="Name course" label="Name" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            fullWidth
            placeholder="Category course (Ex: Front-end, Back-end, Mobile ...)"
            label="Category"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth required>
            <Typography variant="subtitle2" color="text.secondary">
              Consumer
            </Typography>
            <Select
              margin="dense"
              MenuProps={{
                disableScrollLock: true,
              }}
              defaultValue={values.consumer}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="fresher">Fresher</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth required>
            <Typography variant="subtitle2" color="text.secondary">
              Type
            </Typography>
            <Select
              margin="dense"
              MenuProps={{
                disableScrollLock: true,
              }}
              defaultValue={values.type}
            >
              <MenuItem value="bublic">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Date */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DatePicker
              disablePast
              label="Open date register"
              disabled={!!(values.type === "public")}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DatePicker
              disablePast
              label="Close date register"
              disabled={!!(values.type === "public")}
            />
          </FormControl>
        </Grid>

        {/* Upload files */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload roadmap
              <VisuallyHiddenInput type="file" />
            </Button>
          </FormControl>
        </Grid>
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
              <VisuallyHiddenInput type="file" onChange={onPreviewThumbnail} />
            </Button>
          </FormControl>
        </Grid>
        {/* Intro */}
        <Grid item md={12} xs={12}>
          <FormControl fullWidth>
            <TextField
              multiline
              fullWidth
              margin="dense"
              variant="outlined"
              placeholder="Intro ..."
              spellCheck={false}
              minRows={5}
            />
          </FormControl>
        </Grid>

        <Grid item md={12} display={"flex"} justifyContent={"end"}>
          <Button variant="contained" endIcon={<SendIcon />}>
            {type === "create" ? "Send" : "Edit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormCourse;
