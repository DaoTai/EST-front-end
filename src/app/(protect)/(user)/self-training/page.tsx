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
import axios from "axios";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import ListCorrectAnswers from "./_components/ListCorrectAnswers";
import ListQuestions from "./_components/ListQuestions";

const SelfTraining = () => {
  const [type, setType] = useState<string>("byFavouriteProgrammingLanguages");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isStarted, setStarted] = useState<boolean>(false);
  const [score, setScore] = useState<null | number>(null);
  const [listQuestions, setListQuestions] = useState<IQuestion[]>([]);
  const [myAnswers, setMyAnswers] = useState<IMyAnswer[]>([]);

  const containerRef = useRef<HTMLDivElement>();

  //   Change type self-train
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  //   Get questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get<IQuestion[]>("/api/user/self-train?type=" + type);
      setListQuestions(res.data);
      setMyAnswers([]);
      setStarted(true);
      score && setScore(null);
    } catch (error) {
      toast.error("Fetch questions failed", {
        theme: "colored",
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
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
      <Typography gutterBottom variant="h4" fontWeight={500} textAlign={"center"}>
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

              boxShadow: (theme) => `0px 0px 8px ${theme.palette.info.light}`,
              ":hover": {
                boxShadow: (theme) => `0px 0px 12px ${theme.palette.info.dark}`,
              },
            }}
            onClick={fetchQuestions}
          >
            Start
          </Fab>
        </Stack>

        {isLoading && (
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
            Score: <b style={{ color: "red" }}>{score}</b> / {listQuestions.length}
          </Typography>
        )}

        {/* List questions */}
        {!score && (
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
        {listQuestions.length === 0 && isStarted && (
          <Typography variant="body1" textAlign={"center"}>
            No question for you. Let's register any course or submit your favourite programming
            languages
          </Typography>
        )}

        {/* Correct answers */}
        {score !== null && <ListCorrectAnswers listQuestions={listQuestions} />}
      </Box>
    </Box>
  );
};

export default SelfTraining;
