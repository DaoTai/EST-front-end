"use client";
import NormalHeader from "@/components/common/NormalHeader";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { IMyAnswer } from "@/types/IAnswer";
import Fab from "@mui/material/Fab";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import ListCorrectAnswers from "./_components/ListCorrectAnswers";
import ListQuestions from "./_components/ListQuestions";

type IResponse = {
  listQuestions: IQuestion[];
  page: number;
  maxPage: number;
};

const SelfTraining = () => {
  const [type, setType] = useState<string>("byFavouriteProgrammingLanguages");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isStarted, setStarted] = useState<boolean>(false);
  const [score, setScore] = useState<null | number>(null);
  const [listQuestions, setListQuestions] = useState<IQuestion[]>([]);
  const [page, setPage] = useState<number>(1);
  const [myAnswers, setMyAnswers] = useState<IMyAnswer[]>([]);

  const containerRef = useRef<HTMLDivElement>();
  const maxPage = useRef<number>(1);

  useEffect(() => {
    isStarted && fetchQuestions();
  }, [page, isStarted, type]);
  //   Change type self-train
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    setPage(1);
  };

  //   Get questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get<IResponse>("/api/user/self-train?type=" + type + "&page=" + page);
      setListQuestions(res.data.listQuestions);
      maxPage.current = res.data.maxPage;
      setMyAnswers([]);
      score && setScore(null);
    } catch (error) {
      toast.error("Fetch questions failed", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    setStarted(true);
    await fetchQuestions();
  };

  // Handle answer all questions
  const handleSubmit = () => {
    let totalMyCorrectAnswers = 0;
    listQuestions.forEach((question) => {
      myAnswers.forEach((myAnswer) => {
        if (question._id === myAnswer.idQuestion) {
          const totalCorrectAnswers = question.correctAnswers?.length;
          const totalMyAnswers = myAnswer.answers.length;
          let count = 0;
          // Chỉ khi số lượng câu trả lời bằng số lượng câu trả lời đúng
          if (totalCorrectAnswers === totalMyAnswers) {
            question.correctAnswers?.forEach((correct) => {
              const isCorrect = myAnswer.answers.includes(correct);
              if (isCorrect) {
                count += 1;
              }
            });
          }
          if (count === totalCorrectAnswers) {
            totalMyCorrectAnswers += 1;
          }
        }
      });
    });
    setScore(totalMyCorrectAnswers);
    handleScrollToTop();
  };

  // Scroll to top
  const handleScrollToTop = () => {
    containerRef.current?.scrollIntoView({
      block: "start",
    });
  };

  return (
    <Box ref={containerRef}>
      <Helmet>
        <title>EST Edu | Training</title>
      </Helmet>
      <NormalHeader />
      <Typography
        gutterBottom
        variant="h4"
        fontWeight={600}
        textAlign={"center"}
        sx={{
          background: (theme) => theme.palette.gradient.main,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Quizzes
      </Typography>
      <Box p={1}>
        {/* Controls */}
        <Stack gap={3} mb={1} alignItems={"center"}>
          <FormControl margin="dense" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Options" onChange={handleChange}>
              <MenuItem value={"byFavouriteProgrammingLanguages"}>
                Your favourite programming languages
              </MenuItem>
              <MenuItem value={"bySuitableJobs"}>Suitable job in registered courses </MenuItem>
            </Select>
          </FormControl>

          <Fab
            disabled={isLoading}
            color="info"
            sx={{
              p: 1,
              boxShadow: `0px 0px 8px #29b6f6`,
              ":hover": {
                boxShadow: `0px 0px 12px #0288d1`,
              },
            }}
            onClick={handleStart}
          >
            Start
          </Fab>
        </Stack>

        {isStarted && isLoading && (
          <>
            <Typography variant="h6" textAlign={"center"}>
              EST Edu is creating questions for you ...
            </Typography>
          </>
        )}

        {/* Score */}
        {score && (
          <Typography
            variant="body1"
            className="bg-gradient"
            width={"fit-content"}
            borderRadius={12}
            p={1}
          >
            Score: <b style={{ color: "green" }}>{score}</b> / {listQuestions.length}
          </Typography>
        )}

        {/* List questions */}
        {isStarted && !score && (
          <ListQuestions
            listQuestions={listQuestions}
            myAnswers={myAnswers}
            setMyAnswers={setMyAnswers}
          />
        )}

        {/* Buttons */}
        {listQuestions.length > 0 && !score && (
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            {/* Reset button & Scroll top button*/}
            <Tooltip arrow placement="right-end" title="Reset">
              <IconButton onClick={() => setMyAnswers([])}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              onClick={handleScrollToTop}
              sx={{ position: "fixed", bottom: "10%", right: 0, border: 1 }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <Button
              variant="contained"
              disabled={myAnswers.length !== listQuestions.length}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        )}

        {/* No question */}
        {!isLoading && listQuestions.length === 0 && isStarted && (
          <Typography variant="body1" textAlign={"center"}>
            No question for you. Let's register any course or submit your favourite programming
            languages
          </Typography>
        )}

        {/* Correct answers */}
        {score !== null && <ListCorrectAnswers listQuestions={listQuestions} />}

        {/* Pagination */}
        {maxPage.current > 1 && (
          <Stack
            mt={2}
            pb={1}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Pagination
              variant="outlined"
              color="primary"
              page={page}
              count={maxPage.current}
              onChange={async (event: React.ChangeEvent<unknown>, value: number) => {
                setPage(value);
                handleScrollToTop();
              }}
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SelfTraining;
