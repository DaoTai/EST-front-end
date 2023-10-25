"use client";
import Grid from "@mui/material/Grid";
import { Theme, useColorScheme } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"));
const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        height: "100vh",
        overflow: "auto",
        background: theme.palette.backgroundGradient.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        a: {
          textDecoration: "none",
          fontSize: 17,
          padding: 1,
          color: "info.main",
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
        p={1}
        pl={2}
        pr={2}
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
          },
        }}
      >
        <ToggleModeTheme
          sx={{ position: "absolute", top: 8, right: 8, transform: "translate(-8px, 0px)" }}
        />
        {children}
      </Grid>
    </Grid>
  );
};

export default LayoutAuth;
