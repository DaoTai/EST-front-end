"use client";
import VideoPlayer from "@/components/custom/VideoPlayer";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LinkIcon from "@mui/icons-material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useMemo, useState } from "react";
import useSWR, { Fetcher } from "swr";
import Question from "./Question";
import ReportBox from "./ReportBox";

const lessonFetcher: Fetcher<{ lesson: ILesson; listAnswerRecords: IAnswerRecord[] }, string> = (
  url: string
) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw Error("Fetch data failed ");
  });

const DetailLesson = ({ idLesson, idCourse }: { idLesson: string; idCourse: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: response, isLoading } = useSWR(
    "/api/user/my-lessons/" + idLesson + "?idRegisterCourse=" + idCourse,
    lessonFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        console.log("data: ", data);
      },
      onError(err, key, config) {
        router.replace("/");
      },
    }
  );
  const [tab, setTab] = useState<"Theory" | "References" | "Report" | "Questions">("Theory");

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

  const handleChangeTab = (
    event: SyntheticEvent,
    newValue: "Theory" | "References" | "Report" | "Questions"
  ) => {
    setTab(newValue);
  };

  const getAnswerRecordByIdQuestion = (idQuestion: string) => {
    return response?.listAnswerRecords.find((record) => record.question._id === idQuestion);
  };

  if (response) {
    return (
      <>
        {response?.lesson?.video && <VideoPlayer uri={response?.lesson?.video.uri} />}
        <Box pr={1} pl={1}>
          <Box mb={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                value="Theory"
                label={"Theory"}
                icon={<LibraryBooksIcon />}
                iconPosition="start"
              />
              <Tab value="References" label="References" icon={<LinkIcon />} iconPosition="start" />
              <Tab value="Questions" label="Questions" icon={<HelpIcon />} iconPosition="start" />
              <Tab value="Report" label="Report" icon={<FlagIcon />} iconPosition="start" />
            </Tabs>
          </Box>
          {/* Theory */}
          {tab === "Theory" && (
            <Box>
              <Typography gutterBottom variant="h6" fontWeight={600}>
                {response?.lesson.name}
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                textAlign={"justify"}
                dangerouslySetInnerHTML={{
                  __html: response?.lesson.theory,
                }}
              ></Typography>
            </Box>
          )}

          {/* References */}
          {tab === "References" && (
            <Stack component={"ul"} gap={2} pl={0}>
              {response?.lesson?.references.length > 0 ? (
                response?.lesson?.references.map((ref, i) => (
                  <Typography
                    key={i}
                    component={"span"}
                    variant="body1"
                    width={"fit-content"}
                    display={"flex"}
                    gap={1}
                  >
                    {i + 1}.
                    <Link href={ref} target="_blank">
                      {ref}
                    </Link>
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" textAlign={"center"}>
                  No reference
                </Typography>
              )}
            </Stack>
          )}

          {tab === "Questions" && (
            <Stack gap={1}>
              {response?.lesson?.questions.length > 0 ? (
                response?.lesson?.questions.map((question, index) => {
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
                })
              ) : (
                <Typography variant="body1" textAlign={"center"}>
                  No question
                </Typography>
              )}
            </Stack>
          )}

          {tab === "Report" && <ReportBox idLesson={response.lesson._id} reports={myReports} />}
        </Box>
      </>
    );
  }
};

export default DetailLesson;
