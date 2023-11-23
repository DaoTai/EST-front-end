import Header from "@/components/common/Header";
import { Grid } from "@mui/material";
import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  about: React.ReactNode;
};

const RootLayout = ({ children, about }: IProps) => {
  return (
    <>
      <Grid container columnSpacing={1}>
        <Grid
          item
          xs={9}
          sx={{
            height: "100vh",
            overflowY: "overlay",
          }}
        >
          <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
        </Grid>
        <Grid item xs={3}>
          <Suspense fallback={<p>Loading ...</p>}>{about}</Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
