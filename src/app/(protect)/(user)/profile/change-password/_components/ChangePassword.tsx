"use client";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { changePassword } from "@/services/user/password";
import { initChangePwd } from "@/utils/initialValues";
import { EditPasswordSchema } from "@/utils/validation/profile";
import { useFormik } from "formik";
const ChangePwd = () => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange, handleReset } =
    useFormik({
      initialValues: initChangePwd,
      validationSchema: EditPasswordSchema,
      onSubmit: async (values) => {
        await changePassword(values);
      },
    });

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        gutterBottom
        variant="h2"
        className="underline-gradient"
        textAlign="center"
        sx={{ width: "fit-content", display: "block", margin: "0 auto" }}
      >
        Password
      </Typography>

      {/* Inputs */}
      <Stack mt={3}>
        <TextField
          fullWidth
          type="password"
          label="Current password"
          margin="dense"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.currentPassword && errors.currentPassword)}
          helperText={touched.currentPassword && errors.currentPassword}
        />
        <TextField
          fullWidth
          type="password"
          label="New password"
          margin="dense"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.newPassword && errors.newPassword)}
          helperText={touched.newPassword && errors.newPassword}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm password"
          margin="dense"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.confirmPassword && errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
      </Stack>

      <Stack pt={2} pb={2} flexDirection={"row"} justifyContent={"space-between"}>
        <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePwd;
