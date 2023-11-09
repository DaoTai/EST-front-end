"use client";
import VideoPlayer from "@/components/custom/VideoPlayer";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR, { Fetcher } from "swr";
import Question from "./Question";
import ReportBox from "./ReportBox";

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

  const myReports = useMemo(() => {
    if (response?.lesson && session?._id) {
      return response?.lesson?.reports.filter((report) => session._id === (report.user as string));
    }
    return null;
  }, [response?.lesson, session]);

  if (isLoading) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Loading lesson
      </Typography>
    );
  }

  const getAnswerRecordByIdQuestion = (idQuestion: string) => {
    return response?.listAnswerRecords.find((record) => record.question._id === idQuestion);
  };

  if (response) {
    return (
      <>
        {response?.lesson?.video && <VideoPlayer uri={response?.lesson?.video.uri} />}
        <Box sx={{ mt: 1 }}>
          {/* Name lesson */}
          <Typography gutterBottom variant="h6" fontWeight={600} marginLeft={1} marginTop={1}>
            {response?.lesson.name}
          </Typography>

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
              <Box p={1}>
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
              </Box>
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

          {/* Report */}
          <ReportBox idLesson={response.lesson._id} reports={myReports} />
        </Box>
      </>
    );
  }
};

export default DetailLesson;
