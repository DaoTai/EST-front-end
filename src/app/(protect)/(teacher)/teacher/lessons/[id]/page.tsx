"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { convertObjectToFormData, fetcherLessons } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate as mutateSWR } from "swr";

import BoxComments from "@/components/comment-components/BoxComment";
import Spinner from "@/components/custom/Spinner";
import VideoPlayer from "@/components/custom/VideoPlayer";
import FormLesson from "@/components/lesson-components/FormLesson";
import { IFormLesson } from "@/types/ILesson";
import dayjs from "dayjs";

const Lesson = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    "/api/teacher/lessons/detail/" + params.id,
    fetcherLessons,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
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
      .then((value) => {
        mutate(value);
        toast.success("Edit lesson successfully");
        mutateSWR(`/api/teacher/lessons/${value.course}?page=1`);
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
            {/* Reports */}
            {data && data?.reports?.length > 0 && (
              <Box mt={2}>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="subtitle1">Reports</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data?.reports.map((report, i) => (
                      <Stack key={i} flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography variant="subtitle1">{report.content}</Typography>
                        <Typography variant="subtitle2">
                          {dayjs(report.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}

            {/* Comment */}
            <BoxComments idLesson={params.id} />
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
