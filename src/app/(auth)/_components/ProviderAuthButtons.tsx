"use client";
import githubIcon from "@/assets/icons/github-icon.svg";
import googleIcon from "@/assets/icons/google-icon.svg";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { signIn } from "next-auth/react";

const ProviderAuthButton = () => {
  return (
    <Stack gap={1} mt={1} width={"100%"}>
      <Divider />
      <Button
        fullWidth
        variant="white"
        startIcon={<Image src={googleIcon} alt="google-icon" width={32} height={32} />}
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
        sx={{ border: 1, borderColor: "divider" }}
      >
        Continue with Google
      </Button>
      <Button
        fullWidth
        variant="white"
        startIcon={<Image src={githubIcon} alt="github-icon" width={32} height={32} />}
        onClick={() =>
          signIn("github", {
            callbackUrl: "/",
          })
        }
        sx={{ border: 1, borderColor: "divider" }}
      >
        Continue with Github
      </Button>
      <Divider />
    </Stack>
  );
};

export default ProviderAuthButton;
