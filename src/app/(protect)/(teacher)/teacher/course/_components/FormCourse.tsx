"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
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
  return (
    <Box pt={1}>
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
            <InputLabel id="object">Object</InputLabel>
            <Select labelId="object" label="Age">
              <MenuItem>Beginner</MenuItem>
              <MenuItem>Fresher</MenuItem>
              <MenuItem>Junior</MenuItem>
              <MenuItem>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="type" label="Age">
              <MenuItem>Public</MenuItem>
              <MenuItem>Private</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DatePicker label="Open date register" />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DatePicker label="Close date register" />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload roadmap
              <VisuallyHiddenInput type="file" />
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" endIcon={<SendIcon />} sx={{ mt: 2, float: "right" }}>
        {type === "create" ? "Send" : "Edit"}
      </Button>
    </Box>
  );
};

export default FormCourse;
