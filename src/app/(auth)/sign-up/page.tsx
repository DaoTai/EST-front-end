"use client";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [isSendedToEmail, setSendToEmail] = useState<boolean>(false);

  return (
    <>
      <Box component={"form"} width={"100%"}>
        <Typography variant="h2" textAlign={"center"} gutterBottom>
          Đăng ký
        </Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Button variant="outlined" sx={{ ml: "auto", display: "block" }}>
          Gửi mã xác nhận
        </Button>
      </Box>
      <Box mt={1} mb={1} width={"100%"}>
        <Button
          variant="contained"
          color="success"
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
          <Link href={"/sign-in"}> Đăng nhập</Link>
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
