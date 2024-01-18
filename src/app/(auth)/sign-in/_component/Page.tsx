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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import ProviderAuthButton from "../../_components/ProviderAuthButtons";
import Spinner from "@/components/custom/Spinner";
const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { values, errors, touched, isValid, isSubmitting, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SignInSchema,
      onSubmit: async (values) => {
        // Nếu dùng axios thì ko update đc session => Chỉ update đc session khi session !== null
        try {
          const login = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          login?.error ? toast.error(login?.error) : router.replace("/");
        } catch (err) {
          console.log("Error: ", err);
        }
      },
    });

  // Trong case: đăng nhập bằng next-provider(google, github) nhưng thất bại (có thể do bị khoá account) thì clear searchParams
  // tránh gây bug khi đăng nhập account khác bị lỗi
  if (searchParams.get("error")) {
    return redirect("/sign-in");
  }

  return (
    <>
      <Box pb={1}>
        <Box component={"form"} width={"100%"} onSubmit={handleSubmit}>
          <Typography variant="h3" textAlign={"center"}>
            Sign in
          </Typography>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            placeholder="example11@gmail.com"
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
            variant="contained"
            disabled={!isValid || isSubmitting}
            type="submit"
            sx={{ mt: 1, mb: 1 }}
          >
            Sign in
          </Button>
        </Box>

        {/* Next-Auth Provider */}
        <ProviderAuthButton />

        {/* Forgot passwrod */}
        <Box mt={1.5} mb={1} width={"100%"} textAlign={"center"}>
          <Link href={"/forgot-password"} prefetch={false}>
            Forgot password ?
          </Link>
        </Box>

        {/* Sign-up */}
        <Button
          variant="outlined"
          color="info"
          fullWidth
          LinkComponent={Link}
          href="/sign-up"
          sx={{
            textAlign: "center",
            display: "block",
            width: "100%",
          }}
        >
          Sign up
        </Button>
      </Box>

      {isSubmitting && <Spinner />}
    </>
  );
};

export default SignIn;
