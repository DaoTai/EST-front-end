import Header from "@/components/common/Header";
import { Grid } from "@mui/material";
import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  groupChats: React.ReactNode;
};

const RootLayout = ({ children, groupChats }: IProps) => {
  return (
    <>
      <Header />
      <Grid container columnSpacing={1} style={{ marginTop: "80px", maxHeight: "100%" }}>
        <Grid
          item
          xs={3}
          sx={{
            height: "100vh",
            overflowY: "overlay",
          }}
        >
          <Suspense fallback={<p>Loading ...</p>}>{groupChats}</Suspense>
        </Grid>
        <Grid item xs={9}>
          <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;