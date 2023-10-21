"use client";
import { Box, Chip, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormLesson from "../../course/_components/FormLesson";
import VideoPlayer from "@/components/custom/VideoPlayer";
import Spinner from "@/components/custom/Spinner";

const getLesson = async (id: string) => {
  const res = await fetch("/api/teacher/lessons/detail/" + id);
  const data = await res.json();
  return data;
};

const Lesson = ({ params }: { params: { id: string } }) => {
  const [lesson, setLesson] = useState<ILesson>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getLesson(params.id);
      setLesson(data);
      setLoading(false);
    })();
  }, []);

  if (!lesson)
    return (
      <Container>
        {loading ? <Spinner /> : <Typography variant="body1">Not found lesson</Typography>}
      </Container>
    );

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} xs={12}>
          {lesson.video && <VideoPlayer uri={lesson.video?.uri} />}
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
