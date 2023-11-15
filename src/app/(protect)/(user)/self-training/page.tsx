"use client";
import NormalHeader from "@/components/common/NormalHeader";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StartIcon from "@mui/icons-material/Start";

import { Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";
import ChoiceQuestion from "./_components/ChoiceQuestion";
import MultilChoiceQuestion from "./_components/MultilChoiceQuestion";

const SelfTraining = () => {
  const [type, setType] = useState<string>("byFavouriteProgrammingLanguages");
  const [isLoading, setLoading] = useState<boolean>(false);

  const [score, setScore] = useState<null | number>(null);
  const [listQuestions, setListQuestions] = useState<IQuestion[]>([]);
  const [myAnswers, setMyAnswers] = useState<{ idQuestion: string; answers: string[] }[]>([]);

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
      setLoading(false);
      setMyAnswers([]);
      score && setScore(null);
    } catch (error) {
      toast.error("Fetch questions failed", {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  //   On change choice question
  const handleChangeChoice = (idQuestion: string, newAnswer: string) => {
    const currentAnswers = [...myAnswers];
    const isAnswered = currentAnswers.some((answer) => answer.idQuestion === idQuestion);
    if (isAnswered) {
      const isDuplicated =
        currentAnswers.find((answer) => answer.idQuestion === idQuestion)?.answers[0] === newAnswer;
      const index = currentAnswers.findIndex((answer) => answer.idQuestion === idQuestion);
      if (isDuplicated) {
        currentAnswers[index] = { idQuestion, answers: [] };
      } else {
        currentAnswers[index] = { idQuestion, answers: [newAnswer] };
      }

      setMyAnswers(currentAnswers);
    } else {
      setMyAnswers([
        ...currentAnswers,
        {
          idQuestion,
          answers: [newAnswer],
        },
      ]);
    }
  };

  // On change multil chocie question
  const handleChangeMultilChoice = (idQuestion: string, newAnswer: string) => {
    const currentAnswers = [...myAnswers];
    const isAnswered = currentAnswers.some((answer) => answer.idQuestion === idQuestion);
    if (isAnswered) {
      const isDuplicated = currentAnswers
        .find((answer) => answer.idQuestion === idQuestion)
        ?.answers.includes(newAnswer);
      const index = currentAnswers.findIndex((answer) => answer.idQuestion === idQuestion);
      if (isDuplicated) {
        currentAnswers[index] = {
          idQuestion,
          answers: currentAnswers[index].answers.filter((answer) => answer !== newAnswer),
        };
      } else {
        currentAnswers[index] = {
          idQuestion,
          answers: [...currentAnswers[index].answers, newAnswer],
        };
      }

      setMyAnswers(currentAnswers);
    } else {
      setMyAnswers([
        ...currentAnswers,
        {
          idQuestion,
          answers: [newAnswer],
        },
      ]);
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
  };

  return (
    <Box>
      <NormalHeader />
      <Box p={1}>
        <Stack gap={3} mb={1} alignItems={"center"}>
          <FormControl margin="dense" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={handleChange}>
              <MenuItem value={"byFavouriteProgrammingLanguages"}>
                Your programming languages
              </MenuItem>
              <MenuItem value={"byCourseCategories"}>Your registered categories</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            disabled={isLoading}
            endIcon={<StartIcon />}
            onClick={fetchQuestions}
          >
            {isLoading ? "Loading" : "Start"}
          </Button>
        </Stack>

        {isLoading && (
          <Typography variant="h6" textAlign={"center"}>
            EST Edu is creating questions for you ...
          </Typography>
        )}

        {/* Score */}
        {score && (
          <Typography variant="body1">
            Score: <b style={{ color: "red" }}>{score}</b> / {listQuestions.length}
          </Typography>
        )}

        {/* List questions */}
        {!score && (
          <Stack mt={2} mb={2} gap={2}>
            {listQuestions.map((question, i) => {
              const myAnswer = myAnswers.find((answer) => answer.idQuestion === question._id);
              if (question.category === "choice") {
                return (
                  <ChoiceQuestion
                    key={i}
                    index={i + 1}
                    myAnswer={myAnswer}
                    question={question}
                    onChange={handleChangeChoice}
                  />
                );
              } else {
                return (
                  <MultilChoiceQuestion
                    key={i}
                    index={i + 1}
                    myAnswer={myAnswer}
                    question={question}
                    onChange={handleChangeMultilChoice}
                  />
                );
              }
            })}
          </Stack>
        )}

        {listQuestions.length > 0 && !score && (
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            {/* Reset button */}
            <Tooltip arrow placement="right-end" title="Reset">
              <IconButton onClick={() => setMyAnswers([])}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              disabled={myAnswers.length !== listQuestions.length}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        )}

        {/* Correct answers */}
        {score !== null && (
          <Stack mt={2} gap={2}>
            {listQuestions.map((question, i) => {
              return (
                <Paper key={i} elevation={4} sx={{ p: 1 }}>
                  <Stack flexDirection={"row"} gap={1} mb={1}>
                    <Typography variant="body1" fontWeight={500}>
                      {i + 1}. {question.content}
                    </Typography>
                    <Chip
                      label={question.category}
                      color={question.category === "choice" ? "info" : "secondary"}
                      size="small"
                    />
                  </Stack>

                  <Stack mb={1} gap={1}>
                    {question.answers?.map((answer, index) => {
                      return (
                        <Box
                          key={index}
                          p={1}
                          sx={{
                            bgcolor: (theme) =>
                              question.correctAnswers?.includes(answer)
                                ? theme.palette.success.light
                                : theme.palette.error.light,
                          }}
                        >
                          {answer}
                        </Box>
                      );
                    })}
                  </Stack>
                  <Typography variant="body1">{question.explaination}</Typography>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SelfTraining;
