"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Header />
      <Stack flexDirection={"row"} sx={{ pt: "80px" }}>
        <Navbar />
        <Box
          sx={{
            paddingBottom: isMobile ? "73px" : 0,
            flexGrow: 2,
          }}
          minHeight={"100vh"}
          width={"100%"}
          overflow={"hidden"}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
