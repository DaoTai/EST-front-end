"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { convertObjectToFormData } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher } from "swr";

import Spinner from "@/components/custom/Spinner";
import VideoPlayer from "@/components/custom/VideoPlayer";
import FormLesson from "@/components/lesson-components/FormLesson";
import { IFormLesson } from "@/types/ILesson";
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

  // Edit lesson
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

  if (!data) {
    return (
      <Container>
        {isLoading ? <Spinner /> : <Typography variant="body1">Not found lesson</Typography>}
      </Container>
    );
  }

  return (
    <Box pt={0} p={2}>
      <Grid container spacing={2}>
        {data?.video && (
          <Grid item lg={6} md={12} xs={12}>
            <VideoPlayer uri={data?.video?.uri} thumbnail={data.course?.thumbnail?.uri} />
            {/* Comments */}
          </Grid>
        )}

        {/* Form lesson */}
        <Grid item lg={data?.video ? 6 : 12} md={12} xs={12}>
          <FormLesson type="edit" lesson={data} onSubmit={handleEditLesson} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lesson;
