"use client";
import { SignInSchema } from "@/utils/validation/auth";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Link from "next/link";
import { signIn } from "next-auth/react";
import ProviderButtons from "../_components/ProviderAuthButtons";
const SignIn = () => {
  const { values, errors, touched, isValid, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    },
  });

  return (
    <>
      <Box component={"form"} width={"100%"} onSubmit={handleSubmit}>
        <Typography variant="h2" textAlign={"center"} gutterBottom>
          Sign in
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          variant="outlined"
          margin="normal"
          value={values.email}
          error={!!(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.password}
          error={!!(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          disabled={!isValid}
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Sign in
        </Button>
      </Box>

      {/* Next-Auth Provider */}
      <ProviderButtons />

      {/* Forgot passwrod */}
      <Box mt={1} mb={1} width={"100%"} textAlign={"center"}>
        <Link href={"/forget-password"}>Forgot password ?</Link>
      </Box>

      {/* Sign-up */}
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{
          mt: 1,
          mb: 1,
          padding: 0,
          a: {
            color: "white",
            padding: 1.5,
            display: "block",
            width: "100%",
          },
        }}
      >
        <Link href={"/sign-up"}>Sign up</Link>
      </Button>
    </>
  );
};

export default SignIn;
