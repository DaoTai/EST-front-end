import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
const SignIn = () => {
  return (
    <>
      <Box component={"form"} width={"100%"}>
        <Typography variant="h2" textAlign={"center"} gutterBottom>
          Đăng nhập
        </Typography>

        <TextField
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
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
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1, p: 1.5 }}>
          Đăng nhập
        </Button>
      </Box>
      <Box mt={1} mb={1} width={"100%"} textAlign={"center"}>
        <Link href={"/forget-password"}>Quên mật khẩu ?</Link>
      </Box>
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
        <Link href={"/sign-up"}> Đăng ký</Link>
      </Button>
    </>
  );
};

export default SignIn;
