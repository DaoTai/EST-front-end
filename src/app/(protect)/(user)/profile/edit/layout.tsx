import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";

const RootLayout = ({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) => {
  return (
    <Container>
      {children}
      {modal}
    </Container>
  );
};

export default RootLayout;
