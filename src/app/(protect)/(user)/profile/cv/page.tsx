"use client";
import TextEditor from "@/components/custom/TextEditor";
import { Container, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CreateCV = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");

  return (
    <Container>
      <Divider>
        <Typography variant="h5" gutterBottom>
          CV
        </Typography>
      </Divider>
      <Typography variant="body1" gutterBottom>
        Hi <b>{session?.fullName}</b>, if you want to become teacher of EST Edu, please send text or
        file CV for us.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Good luck!
      </Typography>
      <TextEditor
        value={value}
        onChange={setValue}
        theme="snow"
        placeholder="Introduce about yourself and note message to admin"
      />
    </Container>
  );
};

export default CreateCV;
