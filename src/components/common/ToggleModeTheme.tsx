"use client";
import Fab from "@mui/material/Fab";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import React from "react";
import { SxProps, useColorScheme, useTheme } from "@mui/material/styles";

const ToggleModeTheme = ({ sx }: { sx?: SxProps }) => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  return (
    <Fab
      size="small"
      sx={{ ...sx, background: theme.palette.gradient.main }}
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode == "light" ? <LightModeIcon sx={{ color: "#fdba74" }} /> : <DarkModeIcon />}
    </Fab>
  );
};

export default ToggleModeTheme;
