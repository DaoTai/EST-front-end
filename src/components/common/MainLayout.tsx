"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

type IProps = { children: React.ReactNode };

const MainLayout = ({ children }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Header />
      <Stack flexDirection={"row"} sx={{ pt: "80px" }}>
        <Navbar />
        <Box
          sx={{
            paddingBottom: isMobile ? "42px" : 0,
            flexGrow: 2,
            overflowX: "hidden",
          }}
          width={"100%"}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
