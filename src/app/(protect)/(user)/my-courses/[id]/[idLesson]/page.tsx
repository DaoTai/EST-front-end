"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, IconButton, Paper, Slide } from "@mui/material";
import React, { useState } from "react";
import ListLessons from "./_components/ListLessons";
import DetailLesson from "./_components/DetailLesson";

const DetailLessons = ({ params }: { params: { idLesson: string } }) => {
  const [toggleList, setToggleList] = useState<boolean>(true);

  return (
    <Grid container spacing={1}>
      <Grid item md={toggleList ? 8.5 : 11.5} xs={12}>
        <DetailLesson idLesson={params.idLesson} />
      </Grid>
      <Grid item md={toggleList ? 3.5 : 0.5} xs={12}>
        <>
          <IconButton onClick={() => setToggleList(!toggleList)}>
            <MenuIcon />
          </IconButton>
          {toggleList && (
            <Paper elevation={3}>
              <ListLessons />
            </Paper>
          )}
        </>
      </Grid>
    </Grid>
  );
};

export default DetailLessons;
