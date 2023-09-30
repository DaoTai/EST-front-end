"use client";

import { Box, Button, FormHelperText, Grid, Paper, TextField, TextFieldProps } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { InferType } from "yup";

import { Heading, ListFavLanguages } from "./_components";
import { iniEditProfile } from "@/utils/initialValues";
import { EditProfileSchema } from "@/utils/validation/profile";

type NameField = InferType<typeof EditProfileSchema>;

type CustomTextFieldProps = TextFieldProps & { name: keyof NameField };

const textFields: CustomTextFieldProps[] = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Enter your fullname",
  },
  {
    name: "username",
    label: "User name",
    type: "text",
    placeholder: "Enter your user name",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    name: "school",
    label: "School",
    type: "text",
    placeholder: "Enter your school",
  },
];

const EditProfile = () => {
  const { data: user } = useSession();
  const {
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: iniEditProfile,
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (user) {
      const data = {
        fullName: user?.fullName,
        username: user?.username,
        bio: user?.bio,
        dob: user?.dob,
        gender: user?.gender,
        school: user?.school,
        city: user?.city,
        favouriteProramingLanguages: user?.favouriteProrammingLanguages,
      } as any;

      setValues(data);
    }
  }, [user]);

  return (
    <Paper sx={{ p: 1 }}>
      <Heading />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={2} mb={2}>
          {/* Text field */}
          {textFields.map((props, i) => (
            <Grid key={i} item sm={6} xs={12}>
              <TextField
                {...props}
                fullWidth
                label={props.label}
                value={values[props.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched[props.name] && errors[props.name])}
                helperText={touched[props.name] && errors[props.name]}
              />
            </Grid>
          ))}

          {/* Gender */}
          <Grid item sm={6} xs={12}>
            <FormControl error={!!errors.gender}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row name="gender" value={values?.gender || ""} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              <FormHelperText>{errors.gender}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Dob */}
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 1 }}>Birthday</FormLabel>
              {values?.dob ? (
                <DatePicker
                  value={dayjs(values?.dob)}
                  onChange={(newValue) =>
                    setFieldValue("dob", dayjs(newValue as any).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
                  }
                  slotProps={{
                    textField: {
                      name: "dob",
                      error: !!errors.dob,
                      helperText: errors.dob,
                    },
                  }}
                />
              ) : (
                <DatePicker
                  onAccept={(value) => console.log(value)}
                  slotProps={{
                    textField: {
                      name: "dob",
                      error: !!errors.dob,
                      helperText: errors.dob,
                      value: values.dob,
                      onChange: (e) => {
                        console.log(e.target.value);
                        // setFieldValue(
                        //   "dob",
                        //   dayjs(e.target.value).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                        // );
                      },
                    },
                  }}
                />
              )}
            </FormControl>
          </Grid>

          {/* Bio */}
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              multiline
              name="bio"
              variant="outlined"
              label="Bio"
              value={values.bio || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <ListFavLanguages />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ ml: "auto", display: "block", mt: 2, pl: 3, pr: 3 }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default EditProfile;
