import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin | Dashboard",
  description: "EST Edu Admin dashboard",
};

type IProps = {
  children: React.ReactNode;
  languages: React.ReactNode;
  registerByLanguages: React.ReactNode;
};

const RootLayout: React.FC<IProps> = ({ children, languages, registerByLanguages }) => {
  return (
    <>
      <Divider>
        <Typography variant="h4" fontWeight={500} gutterBottom textAlign={"center"}>
          Course
        </Typography>
      </Divider>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {languages}
        </Grid>
        <Grid item md={6} xs={12}>
          {registerByLanguages}
        </Grid>
        <Grid item md={12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
