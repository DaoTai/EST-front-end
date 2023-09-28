"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import globalStyle from "../globalStyle";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyle} />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
