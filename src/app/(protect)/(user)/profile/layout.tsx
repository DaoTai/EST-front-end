import Container from "@mui/material/Container";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container sx={{ pt: 1 }}>{children}</Container>;
};

export default RootLayout;
