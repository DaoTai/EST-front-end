import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box sx={{ pt: "80px" }}>{children}</Box>
    </>
  );
};

export default MainLayout;
