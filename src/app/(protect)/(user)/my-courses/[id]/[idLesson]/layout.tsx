import NormalHeader from "@/components/common/NormalHeader";
import { Grid, Paper } from "@mui/material";
import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  listLessons: React.ReactNode;
};

const RootLayout = ({ children, listLessons }: IProps) => {
  return (
    <>
      <NormalHeader />
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Suspense fallback={<p>Loading detail lesson</p>}>{children}</Suspense>
        </Grid>
        <Grid item md={3} xs={12} maxHeight={"100vh"} sx={{ overflowY: "overlay" }}>
          <Suspense fallback={<p>Loading list lessons</p>}>
            <Paper elevation={3}>{listLessons}</Paper>
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
