import { Grid } from "@mui/material";
import React from "react";
import { About, ListVideo } from "./_components";

const DetailCourse = ({ params }: { params: { id: string } }) => {
  return (
    <Grid container p={1} spacing={1}>
      <Grid item md={3} xs={12}>
        <About />
      </Grid>
      <Grid item md={9} xs={12}>
        <ListVideo />
      </Grid>
    </Grid>
  );
};

export default DetailCourse;
