"use client";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const ListSkeletons = () => {
  return Array.from(new Array(3)).map((item, i) => (
    <Grid key={i} component={Paper} container height={250} alignItems={"center"}>
      <Grid item xs={3}>
        <Skeleton animation="wave" variant="rectangular" height={230} width={"100%"} />
      </Grid>
      <Grid item xs={9} pl={1}>
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
      </Grid>
    </Grid>
  ));
};

export default ListSkeletons;
