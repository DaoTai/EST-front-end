"use client";
import { useColorScheme, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";

export default function Home() {
  const { data: session } = useSession();
  const { mode, setMode } = useColorScheme();

  return (
    <Container>
      <Typography variant="h1">Hello {session?.user?.name}</Typography>
      {session?.user?.image && (
        <Image alt="avatar" src={session?.user.image} width={200} height={200} quality={100} />
      )}
      {session?.user?.image && (
        <Avatar src={session?.user.image} sx={{ width: 300, height: 300 }} />
      )}
      <Button variant="contained" onClick={() => signIn()}>
        Sign in
      </Button>
      <Button variant="contained" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
        Sign out
      </Button>
      <Stack flexDirection={"row"}>
        <Button variant="contained" onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          Change mode
        </Button>
      </Stack>
    </Container>
  );
}
