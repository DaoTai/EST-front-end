"use client";
import { Box, Chip, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormLesson from "../../course/_components/FormLesson";
import VideoPlayer from "@/components/custom/VideoPlayer";

const getLesson = async (id: string) => {
  const res = await fetch("/api/teacher/lessons/detail/" + id);
  const data = await res.json();
  return data;
};

const Lesson = ({ params }: { params: { id: string } }) => {
  const [lesson, setLesson] = useState<ILesson>();
  useEffect(() => {
    (async () => {
      const data = await getLesson(params.id);
      setLesson(data);
      console.log(data);
    })();
  }, []);

  if (!lesson)
    return (
      <Container>
        <Typography variant="body1">Not found lesson</Typography>
      </Container>
    );

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} xs={12}>
          <VideoPlayer uri={lesson.video.uri} />
          <Divider />
          {/* Comments */}
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <FormLesson type="edit" lesson={lesson} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lesson;
