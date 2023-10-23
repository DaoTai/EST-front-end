"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormLesson from "../../course/_components/FormLesson";
import Spinner from "@/components/custom/Spinner";
import VideoPlayer from "@/components/custom/VideoPlayer";
import { IFormLesson } from "@/types/ILesson";
import { convertObjectToFormData } from "@/utils/functions";
import { useRouter } from "next/navigation";
import useSWR, { Fetcher } from "swr";
import { Button, Stack } from "@mui/material";

const fetcher: Fetcher<ILesson, string> = (url: string) => fetch(url).then((res) => res.json());

const Lesson = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR(
    "/api/teacher/lessons/detail/" + params.id,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: false,
    }
  );

  const handleEditLesson = useCallback(async (value: IFormLesson & { file?: File }) => {
    const formData = convertObjectToFormData(value);
    fetch("/api/teacher/lessons/detail/" + params.id, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        mutate(data);
        toast.success("Edit lesson successfully");
        router.back();
      })
      .catch(() => toast.error("Edit lesson failed"));
  }, []);

  if (error) {
    return (
      <Container>
        <Stack alignItems={"center"} pt={4} gap={4}>
          <Typography variant="body1" textAlign={"center"} gutterBottom>
            Not found lesson
          </Typography>
          <Button variant="outlined" onClick={() => router.back()}>
            Back
          </Button>
        </Stack>
      </Container>
    );
  }

  if (!data)
    return (
      <Container>
        {isLoading ? <Spinner /> : <Typography variant="body1">Not found lesson</Typography>}
      </Container>
    );

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} xs={12}>
          {data?.video && (
            <VideoPlayer uri={data?.video?.uri} thumbnail={data.course.thumbnail.uri} />
          )}
          <Divider />
          {/* Comments */}
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <FormLesson type="edit" lesson={data} onSubmit={handleEditLesson} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lesson;
