"use client";
import { sendNewPasswordToEmail } from "@/services/auth";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const isInvalidEmail = useMemo(() => {
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return !(email.trim().length > 0 && pattern.test(email));
  }, [email]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await sendNewPasswordToEmail(email);
    setSending(false);
    setEmail("");
  };
  return (
    <>
      <Box component={"form"} width={"100%"} onSubmit={handleSubmit}>
        <Typography variant="h2" textAlign={"center"} gutterBottom>
          Forgot password
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          variant="outlined"
          margin="normal"
          error={email.trim().length > 0 && isInvalidEmail}
          helperText={email.trim().length > 0 && isInvalidEmail && "Email is invalid"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isInvalidEmail || sending}
          sx={{ mt: 1, mb: 1 }}
        >
          {sending ? "Sending ..." : "Confirm"}
        </Button>
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="success"
        disabled={sending}
        sx={{
          mt: 1,
          mb: 1,
          padding: 0,
          a: {
            color: "#fff",
            padding: 1.5,
            display: "block",
            width: "100%",
          },
        }}
      >
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
    </>
  );
};

export default ForgotPassword;
