"use client";
import { signUp, verifyEmail } from "@/services/auth";
import { SignUpSchema } from "@/utils/validation/auth";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [isSending, setSending] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<string>("");
  const [visiblePwd, setVisiblePwd] = useState<boolean>(false);
  const captchaResult = useRef<string>();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        fullName: "",
        password: "",
      },
      validationSchema: SignUpSchema,
      onSubmit: async (values) => {
        if (captcha === captchaResult.current) {
          await signUp(values);
        } else {
          toast.error("Captcha is unmatched");
        }
      },
    });

  // Send captchat to email
  const handleSendCaptcha = async () => {
    setSending(true);
    captchaResult.current = await verifyEmail(values.email);
    setSending(false);
  };

  return (
    <>
      <Box component={"form"} width={"100%"} onSubmit={handleSubmit}>
        <Typography variant="h2" textAlign={"center"} gutterBottom>
          Sign up
        </Typography>

        {/* Full name */}
        <TextField
          required
          label="Full name"
          name="fullName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.fullName && errors.fullName)}
          helperText={touched.fullName && errors.fullName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Email */}
        <TextField
          required
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}
        <Stack flexDirection={"row"}>
          <TextField
            required
            type={visiblePwd ? "text" : "password"}
            label="Password"
            name="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "unset",
                    },
                  }}
                  onClick={() => setVisiblePwd(!visiblePwd)}
                >
                  <InputAdornment position="end">
                    {visiblePwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </InputAdornment>
                </IconButton>
              ),
            }}
          />
        </Stack>

        {/* Captcha*/}
        <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1} mt={1}>
          <TextField
            required
            label="Captcha"
            variant="filled"
            sx={{ flex: "2 1 auto" }}
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value.trim())}
          />

          {/* Send captcha */}
          <Button
            disabled={!!errors.email || !values.email || isSending}
            variant="outlined"
            sx={{ flex: "1 1 auto" }}
            onClick={handleSendCaptcha}
          >
            Send captcha to email
          </Button>
        </Stack>

        {/* Submit button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={isSubmitting || isSending}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>

      {/* Navigate to sign-in */}
      <Button
        fullWidth
        variant="text"
        color="info"
        sx={{ mt: 2, textDecoration: "underline" }}
        onClick={() => router.push("/sign-in")}
      >
        Sign in
      </Button>
    </>
  );
};

export default SignUp;
