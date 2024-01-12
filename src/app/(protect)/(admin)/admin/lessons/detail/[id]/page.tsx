"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import useSWR from "swr";
import BoxComments from "@/components/comment-components/BoxComment";
import Spinner from "@/components/custom/Spinner";
import VideoPlayer from "@/components/custom/VideoPlayer";
import FormLesson from "@/components/lesson-components/FormLesson";
import { fetcherLessons } from "@/utils/functions";
const DetailLesson = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/teacher/lessons/detail/" + params.id,
    fetcherLessons,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: false,
    }
  );
  if (error) {
    return (
      <Container>
        <Stack alignItems={"center"} pt={4} gap={4}>
          <Typography variant="body1" textAlign={"center"} gutterBottom>
            Not found lesson
          </Typography>
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
    <Grid container spacing={2} mb={1}>
      {data?.video && (
        <Grid item lg={6} md={12} xs={12}>
          <VideoPlayer uri={data?.video?.uri} thumbnail={data.course?.thumbnail?.uri} />
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
                      <Typography variant="subtitle1" textAlign={"justify"}>
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
      )}

      {/* Form lesson */}
      <Grid item lg={data?.video ? 6 : 12} md={12} xs={12}>
        <FormLesson type="watch" lesson={data} />
      </Grid>
    </Grid>
  );
};

export default DetailLesson;
