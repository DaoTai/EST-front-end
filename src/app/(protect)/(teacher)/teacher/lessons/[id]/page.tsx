"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { convertObjectToFormData, fetcherLessons, showErrorToast } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate as mutateSWR } from "swr";

import BoxComments from "@/components/comment-components/BoxComment";
import Spinner from "@/components/custom/Spinner";
import VideoPlayer from "@/components/custom/VideoPlayer";
import FormLesson from "@/components/lesson-components/FormLesson";
import { IFormLesson } from "@/types/ILesson";
import dayjs from "dayjs";
import teacherLessonService from "@/services/teacher/lesson";
import { Helmet } from "react-helmet";

const Lesson = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    "/api/teacher/lessons/detail/" + params.id,
    fetcherLessons,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  // Edit lesson
  const handleEditLesson = useCallback(async (value: IFormLesson & { file?: File }) => {
    const formData = convertObjectToFormData(value);
    setLoading(true);
    try {
      const data = await teacherLessonService.edit(params.id, formData);
      mutate(data);
      toast.success("Edit lesson successfully");
      mutateSWR(`/api/teacher/lessons/${data.course}?page=1`);
      router.back();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
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
    <>
      <Helmet>
        <title>{data.name}</title>
      </Helmet>
      <Box pt={0} p={2}>
        <Grid container>
          <Grid item md={12} xs={12}>
            {data?.video && (
              <VideoPlayer uri={data?.video?.uri} thumbnail={data.course?.thumbnail?.uri} />
            )}
            {/* Reports */}
            {data && data?.reports?.length > 0 && (
              <Box mt={2}>
                <Accordion sx={{ border: 2, borderColor: "info.main", boxShadow: 0 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Reports</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data?.reports.map((report, i) => (
                      <Stack key={i} flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography variant="subtitle1">
                          {i + 1}. {report.content}
                        </Typography>
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

          {/* Form lesson */}
          <Grid item md={12} xs={12}>
            <FormLesson type="edit" lesson={data} onSubmit={handleEditLesson} />
          </Grid>
        </Grid>
        {loading && <Spinner />}
      </Box>
    </>
  );
};

export default Lesson;
