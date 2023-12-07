"use client";
import React, { Dispatch, SetStateAction, memo } from "react";

import Stack from "@mui/material/Stack";
import ChoiceQuestion from "./ChoiceQuestion";
import MultilChoiceQuestion from "./MultilChoiceQuestion";
import { IMyAnswer } from "@/types/IAnswer";

type IProps = {
  listQuestions: IQuestion[];
  myAnswers: IMyAnswer[];
  setMyAnswers: Dispatch<
    SetStateAction<
      {
        idQuestion: string;
        answers: string[];
      }[]
    >
  >;
};

const ListQuestions: React.FC<IProps> = ({ listQuestions, myAnswers, setMyAnswers }) => {
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

  return (
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
  );
};

export default memo(ListQuestions);
