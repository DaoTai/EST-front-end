"use client";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HelpIcon from "@mui/icons-material/Help";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagIcon from "@mui/icons-material/Flag";
import { Box, Divider, IconButton, Link, Paper, Stack, Tooltip } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import useSWR, { Fetcher } from "swr";
import Question from "./Question";
import VideoPlayer from "@/components/custom/VideoPlayer";

const lessonFetcher: Fetcher<{ lesson: ILesson; listAnswerRecords: IAnswerRecord[] }, string> = (
  url: string
) => fetch(url).then((res) => res.json());

const DetailLesson = ({ idLesson }: { idLesson: string }) => {
  const { data: session } = useSession();
  const { data: response, isLoading } = useSWR("/api/user/my-lessons/" + idLesson, lessonFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (response) {
      response.lesson.questions.forEach((question) => {
        console.log("Duplicate: ", getAnswerRecordByIdQuestion(question._id));
      });
    }
  }, [response]);

  const myReport = useMemo(() => {
    if (response?.lesson && session?._id) {
      return response?.lesson?.reports.find((report) => report.user._id === session._id);
    }
    return null;
  }, [response?.lesson, session]);

  if (isLoading) {
    return <Typography variant="body1">Loading lesson</Typography>;
  }

  const getAnswerRecordByIdQuestion = (idQuestion: string) => {
    return response?.listAnswerRecords.find((record) => record.question._id === idQuestion);
  };

  // const myQuestions = useMemo(() => {
  //   if (response) {
  //     response.lesson.questions.forEach((question) => {
  //       console.log("Duplicate: ", getAnswerRecordByIdQuestion(question._id));
  //     });
  //   }
  // }, [response]);

  return (
    <Paper elevation={4}>
      {response?.lesson?.video && <VideoPlayer uri={response?.lesson?.video.uri} />}
      {/* About report */}
      <Stack mt={1} mb={1} flexDirection={"row"} justifyContent={"end"}>
        {myReport && <Typography variant="body1">Your report: {myReport.message} </Typography>}
        <Tooltip arrow title="Report">
          <IconButton size="small">
            <FlagIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* About theory and refs */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            fontWeight={600}
            display={"flex"}
            alignItems={"start"}
            gap={2}
          >
            <LibraryBooksIcon /> Theory & References
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6" gutterBottom>
              Theory
            </Typography>
            <Typography variant="body1" textAlign={"justify"}>
              {response?.lesson?.theory}
            </Typography>
            <Divider />
            <Typography variant="h6">References</Typography>
            <Stack gap={1}>
              {response?.lesson?.references.map((ref, i) => (
                <Typography key={i} href={ref} component={Link} target="_blank" variant="body1">
                  {ref}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* About questions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            fontWeight={600}
            display={"flex"}
            alignItems={"start"}
            gap={2}
          >
            <HelpIcon /> Questions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={1}>
            {response?.lesson?.questions.map((question, index) => {
              const isCompleted = response.listAnswerRecords.some(
                (record) => record.question._id === question._id
              );
              if (isCompleted) {
                const answerRecord = getAnswerRecordByIdQuestion(question._id);
                return (
                  <Paper key={question._id} elevation={3} sx={{ p: 1 }}>
                    <Question
                      index={index}
                      question={question}
                      isCompleted={isCompleted}
                      answerRecord={answerRecord}
                    />
                  </Paper>
                );
              } else {
                return (
                  <Paper key={question._id} elevation={3} sx={{ p: 1 }}>
                    <Question index={index} question={question} isCompleted={isCompleted} />
                  </Paper>
                );
              }
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* About comments */}
      <Accordion>
        <AccordionSummary>
          <Typography
            variant="body1"
            fontWeight={600}
            display={"flex"}
            alignItems={"start"}
            gap={2}
          >
            <CommentIcon /> Comments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>Comments</AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default DetailLesson;
