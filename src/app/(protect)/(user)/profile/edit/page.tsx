"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { FocusEvent, useEffect, useMemo } from "react";

import { initEditProfile } from "@/utils/initialValues";
import { EditProfileSchema } from "@/utils/validation/profile";
import { useRouter } from "next/navigation";
import { Heading, ListFavLanguages } from "./_components";
import { textFields } from "./_fields";
import { MessageValidation } from "@/utils/constants/messages";

const EditProfile = () => {
  const { data: user } = useSession();
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    setFieldError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initEditProfile,
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const isError = useMemo(() => {
    return !!Object.keys(errors).length;
  }, [errors, touched, values]);

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

  // On change date
  const handleChangeDate = (value: any) => {
    try {
      if (!value) {
        setFieldValue("dob", null);
      } else {
        const isValidYear = new Date().getFullYear() - dayjs(value).get("year") >= 0;
        if (isValidYear) setFieldValue("dob", dayjs(value).toISOString());
        else setFieldError("dob", MessageValidation.date);
      }
    } catch (error) {}
  };

  // On blur date
  const handleBlurDate = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const isInvalid = new Date().getFullYear() - dayjs(e.target.value).get("year") >= 0;
    if (isInvalid) setFieldError("dob", MessageValidation.date);
  };

  return (
    <Paper sx={{ p: 1 }}>
      <Heading />
      <Box
        component="form"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        onSubmit={handleSubmit}
      >
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

              <DatePicker
                disableFuture
                value={values?.dob ? dayjs(values?.dob) : null}
                onError={(error: any) => setFieldError("dob", MessageValidation.date)}
                onChange={handleChangeDate}
                slotProps={{
                  textField: {
                    name: "dob",
                    error: !!errors.dob,
                    helperText: errors.dob,
                    onBlur: handleBlurDate,
                    onKeyDown: (e) => e.preventDefault(),
                  },
                }}
              />
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

          {/* List favourite programming languages */}
          <Grid item sm={6} xs={12}>
            <ListFavLanguages
              name="favouriteProramingLanguages"
              value={values.favouriteProramingLanguages}
              setFieldValue={setFieldValue}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Stack mt={2} flexDirection="row" justifyContent="space-between">
          <Button variant="outlined" onClick={() => router.push("/profile/change-password")}>
            Change password
          </Button>
          <Button type="submit" variant="contained" disabled={isError}>
            Save
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default EditProfile;
