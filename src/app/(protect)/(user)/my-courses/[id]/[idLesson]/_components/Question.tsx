"use client";
import { Button, Chip, Stack, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import dayjs from "dayjs";
import { memo, useMemo, useState } from "react";

type Props = {
  question: IQuestion;
  index: number;
  isCompleted: boolean;
  answerRecord?: IAnswerRecord;
};

const Question = ({ question, index, isCompleted, answerRecord }: Props) => {
  console.log(isCompleted);

  const [linkCode, setLinkCode] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);

  const CategoryChip = useMemo(() => {
    switch (question.category) {
      case "code":
        return <Chip label={question.category} color="secondary" size="small" />;
      case "choice":
        return <Chip label={question.category} color="warning" size="small" />;
      case "multiple-choice":
        return <Chip label={question.category} color="info" size="small" />;
      default:
        return <Chip label={question.category} color="default" size="small" />;
    }
  }, [question]);

  const disabledButton = useMemo(() => {
    switch (question.category) {
      case "code":
        return !linkCode.trim();
      case "choice":
        return answers.length === 0;
      case "multiple-choice":
        return answers.length < 2;
      default:
        return true;
    }
  }, [question, linkCode, answers]);

  const onChangeAnswerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkCode(event.target.value.trim());
  };

  const onChangeAnswersChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isExistedValue = answers.includes(value);
    if (isExistedValue) {
      setAnswers((prev) => prev.filter((answer) => answer !== value));
    } else {
      if (question.category === "choice") {
        answers.length === 0 && setAnswers([value]);
      } else {
        setAnswers([...answers, value]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1} mb={1}>
        <Typography variant="subtitle1">{index + 1}.</Typography>
        <Typography variant="subtitle1">{question.content}</Typography>
        {CategoryChip}
      </Stack>
      {isCompleted && (
        <>
          <Typography variant="body1">
            Your score:
            <Typography
              variant="body1"
              component={"span"}
              fontWeight={600}
              sx={{ color: (theme) => theme.palette.error.light, ml: 1 }}
            >
              {answerRecord?.score}
            </Typography>
          </Typography>
        </>
      )}
      {question.expiredTime && (
        <Typography variant="subtitle2">
          Expired time: {dayjs(question.expiredTime).format("MMM D, YYYY h:mm A")}
        </Typography>
      )}
      {question.category === "code" ? (
        <TextField
          fullWidth
          label="Answer"
          placeholder="Answer"
          value={linkCode}
          onChange={onChangeAnswerCode}
          disabled={isCompleted}
        />
      ) : (
        <Stack gap={1}>
          {question.answers?.map((answer, indexAnswer) => {
            return (
              <FormGroup key={indexAnswer} sx={{ border: 1, pl: 1, pr: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={answer}
                      disabled={isCompleted}
                      checked={
                        question.category === "choice"
                          ? answers[0] === answer
                          : answers.includes(answer)
                      }
                      onChange={onChangeAnswersChoice}
                    />
                  }
                  label={answer}
                  sx={{
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                    margin: 0,
                  }}
                />
              </FormGroup>
            );
          })}
        </Stack>
      )}
      <Stack mt={1} flexDirection={"row"} justifyContent={"end"}>
        <Button variant="contained" size="small" disabled={isCompleted || disabledButton}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default memo(Question);
