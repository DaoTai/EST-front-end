"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import Image from "next/image";
import React from "react";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #58a9eb, #cce5eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        a: {
          textDecoration: "none",
          fontSize: 17,
          padding: 1,
          color: "#1877f2",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        borderRadius={2}
        ml={1}
        mr={1}
        p={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          height: isMobile ? "100%" : "auto",
          ".MuiTypography-root": {
            fontWeight: 700,
            color: "white",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          },
        }}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={80}
          style={{ filter: "contrast(2)" }}
        />
        {children}
      </Grid>
    </Grid>
  );
};

export default LayoutAuth;
