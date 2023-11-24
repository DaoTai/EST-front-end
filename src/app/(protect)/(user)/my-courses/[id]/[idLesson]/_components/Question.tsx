"use client";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { showErrorToast } from "@/utils/functions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

type Props = {
  question: IQuestion;
  index: number;
  isCompleted: boolean;
  answerRecord?: IAnswerRecord;
};

const Question = ({ question, index, isCompleted, answerRecord }: Props) => {
  const params = useParams();
  const [completed, setCompleted] = useState(isCompleted);
  const [linkCode, setLinkCode] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>();
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    answerRecord?.question.correctAnswers ?? []
  );

  useEffect(() => {
    if (answerRecord) {
      String(answerRecord.score) && setScore(answerRecord.score);
      answerRecord.question.category === "code" && setLinkCode(answerRecord.answers[0]);
    }
  }, [answerRecord]);

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
      case "choice":
        return answers.length === 0;
      case "multiple-choice":
        return answers.length < 2;
      default:
        return false;
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
      const res = await axios.post<IAnswerRecord>("/api/user/questions/" + question._id, {
        userAnswers: question.category === "code" ? [linkCode] : answers,
        idRegisteredCourse: params.id,
      });
      setCompleted(true);
      res.data.question?.correctAnswers && setCorrectAnswers(res.data.question.correctAnswers);
      res.data?.score && setScore(res.data.score);
      // Revalidate list lessons
      mutate("/api/user/my-lessons?idRegisteredCourse=" + params.id);
      toast.success("Answer successfully", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      showErrorToast(error, {
        theme: "colored",
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1} mb={1}>
        <Typography variant="subtitle1">{index + 1}.</Typography>
        <Typography variant="subtitle1">{question.content}</Typography>
        {CategoryChip}
      </Stack>
      {question.expiredTime && (
        <Typography variant="subtitle2" gutterBottom>
          Expired time: {dayjs(question.expiredTime).format("MMM D, YYYY h:mm A")}
        </Typography>
      )}
      {completed && (
        <>
          <Typography variant="body1">
            Your score:
            <Typography
              variant="body1"
              component={"span"}
              fontWeight={600}
              sx={{ color: (theme) => theme.palette.error.light, ml: 1 }}
            >
              {typeof score !== "undefined" ? score : "Pending"}
            </Typography>
          </Typography>
          {answerRecord?.comment && (
            <Typography variant="body1" gutterBottom>
              Message from teacher: {answerRecord?.comment}
            </Typography>
          )}
        </>
      )}

      {question.category === "code" ? (
        <>
          <TextField
            fullWidth
            placeholder={linkCode ? "" : "You have not submit link code"}
            value={linkCode}
            onChange={onChangeAnswerCode}
            disabled={completed && question.category !== "code"}
          />
          <Typography variant="caption">
            Link code is like github public, codesandbox, ...
          </Typography>
          <Stack mt={1} flexDirection={"row"} justifyContent={"end"}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack gap={1}>
            {question.answers?.map((answer, indexAnswer) => {
              return (
                <FormGroup
                  key={indexAnswer}
                  sx={{
                    border: 1,
                    p: "0px 8px",
                    borderRadius: 1,
                    background: (theme) =>
                      answerRecord || correctAnswers.length > 0
                        ? correctAnswers?.includes(answer)
                          ? theme.palette.success.light
                          : theme.palette.error.light
                        : "",
                    borderColor: (theme) =>
                      answerRecord || correctAnswers.length > 0
                        ? correctAnswers?.includes(answer)
                          ? theme.palette.success.light
                          : theme.palette.error.light
                        : theme.palette.divider,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={answer}
                        disabled={completed && question.category !== "code"}
                        checked={
                          question.category === "choice"
                            ? answers[0] === answer
                            : answers.includes(answer)
                        }
                        sx={{ visibility: completed ? "hidden" : "visible" }}
                        onChange={onChangeAnswersChoice}
                      />
                    }
                    label={answer}
                    sx={{
                      justifyContent: "space-between",
                      flexDirection: "row-reverse",
                      margin: 0,
                      ".MuiTypography-root": {
                        color: correctAnswers.length > 0 ? "#fff !important" : "inherit",
                      },
                    }}
                  />
                </FormGroup>
              );
            })}
          </Stack>
          {/* Button submit */}
          {!completed && (
            <Stack mt={1} flexDirection={"row"} justifyContent={"end"}>
              <Button
                variant="contained"
                size="small"
                disabled={disabledButton}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default memo(Question);
