import { Grid, Paper } from "@mui/material";
import React from "react";
import ListLessons from "./_components/ListLessons";
import DetailLesson from "./_components/DetailLesson";

const DetailLessons = ({ params }: { params: { idLesson: string } }) => {
  return (
    <Grid container spacing={1}>
      <Grid item md={8.5} xs={12}>
        <DetailLesson idLesson={params.idLesson} />
      </Grid>
      <Grid item md={3.5} xs={12}>
        <Paper elevation={3}>
          <ListLessons />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DetailLessons;
