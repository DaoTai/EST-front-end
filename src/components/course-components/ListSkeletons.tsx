"use client";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const ListSkeletons = () => {
  return Array.from(new Array(3)).map((item, i) => (
    <Grid key={i} component={Paper} container height={250}>
      <Grid item lg={3} md={3}>
        <Skeleton animation="wave" variant="rectangular" width={350} height={230} />
      </Grid>
      <Grid item lg={9} md={9} pl={1}>
        <Skeleton animation="wave" variant="text" width={210} />
        <Skeleton animation="wave" variant="text" width={210} />
        <Skeleton animation="wave" variant="text" width={210} />
        <Skeleton animation="wave" variant="text" width={210} />
      </Grid>
    </Grid>
  ));
};

export default ListSkeletons;
