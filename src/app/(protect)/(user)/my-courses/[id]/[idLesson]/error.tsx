"use client"; // Error components must be Client Components

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Container>
      <Typography variant="h6" textAlign={"center"}>
        Page happened errors: {String(error)}
      </Typography>
      <Button variant="text" onClick={reset}>
        Back
      </Button>
    </Container>
  );
}
