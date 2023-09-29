import Container from "@mui/material/Container";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default RootLayout;
