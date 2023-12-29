import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { memo, useEffect, useMemo, useRef, useState } from "react";

import { initFormQuestion } from "@/utils/initialValues";
import { FormQuestionSchema } from "@/utils/validation/question";
import { Divider } from "@mui/material";

type QuestionProps = {
  type?: "create" | "edit";
  question?: IQuestion;
  onSubmit: (val: Omit<IQuestion, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
};

const FormQuestion = ({ question, onSubmit, type = "create" }: QuestionProps) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initFormQuestion,
    validationSchema: FormQuestionSchema,
    async onSubmit(values, { resetForm }) {
      await onSubmit(values);
      if (type === "create") {
        resetForm();
      }
    },
  });

  const [answer, setAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const answerInputRef = useRef<HTMLInputElement>(null);
  const correctAnswerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (values.category === "code") {
      setFieldValue("correctAnswers", []);
      setFieldValue("answers", []);
    }
  }, [values.category]);

  useEffect(() => {
    if (question) {
      setFieldValue("content", question.content);
      setFieldValue("category", question.category);
      setFieldValue("explaination", question?.explaination);
      question?.correctAnswers && setFieldValue("correctAnswers", question?.correctAnswers);
      question.answers && setFieldValue("answers", question.answers);
    }
  }, [question]);

  // Check category to disable submit
  const isDisabled = useMemo(() => {
    if (
      values.category !== "code" &&
      Array.isArray(values.correctAnswers) &&
      Array.isArray(values.answers)
    ) {
      if (values.answers.length < 2) return true;

      let isInvalid = false;
      const { correctAnswers, answers, category } = values;
      const lengthOfCorrectAnswers = correctAnswers.length;
      const lengthOfValidAnswers = answers.filter((answer) =>
        correctAnswers.includes(answer)
      ).length;
      isInvalid = lengthOfCorrectAnswers !== lengthOfValidAnswers;
      if (isInvalid) return true;
      if (category === "choice") {
        isInvalid = correctAnswers.length !== 1 || answers.length === 0;
      }
      if (category === "multiple-choice") {
        isInvalid = correctAnswers.length < 2 || answers.length < 2;
      }

      return isInvalid;
    }
    return false;
  }, [values.category, values?.correctAnswers, values?.answers]);

  // Add answer
  const handleAddAnswer = () => {
    if (answer.trim()) {
      const isExist = values?.answers?.includes(answer.trim());
      if (!isExist) {
        const prevAnswers = values?.answers || [];
        setFieldValue("answers", [...prevAnswers, answer.trim()]);
        setAnswer("");
        answerInputRef.current?.focus();
      }
    }
  };

  // Delete answer
  const handleDeleteAnswer = (value: string) => {
    if (values?.answers && !values.correctAnswers?.includes(value)) {
      setFieldValue(
        "answers",
        values.answers.filter((answer) => answer !== value)
      );
    }
  };

  // Add correct answer
  const handleAddCorrectAnswer = () => {
    if (correctAnswer.trim()) {
      const prevCorrectAnswers = values?.correctAnswers || [];
      const prevAnswers = values?.answers || [];
      const isExist =
        prevCorrectAnswers.includes(correctAnswer.trim()) ||
        prevAnswers.includes(correctAnswer.trim());
      if (!isExist) {
        setFieldValue("correctAnswers", [...prevCorrectAnswers, correctAnswer.trim()]);
        setFieldValue("answers", [...prevAnswers, correctAnswer.trim()]);
        setCorrectAnswer("");
        correctAnswerInputRef.current?.focus();
      }
    }
  };

  // Delete correct answer
  const handleDeleteCorrectAnswer = (value: string) => {
    if (values?.correctAnswers && values?.answers) {
      setFieldValue(
        "correctAnswers",
        values.correctAnswers.filter((answer) => answer !== value)
      );
      setFieldValue(
        "answers",
        values.answers.filter((answer) => answer !== value)
      );
    }
  };

  return (
    <Container>
      <Divider>
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          Question
        </Typography>
      </Divider>

      {/* Form question */}
      <Grid
        container
        component={"form"}
        spacing={2}
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            multiline
            required
            name="content"
            label="Content"
            value={values.content}
            error={!!(touched.content && errors.content)}
            helperText={touched.content && errors.content}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <FormLabel>Category</FormLabel>
            <RadioGroup row name="category" value={values.category} onChange={handleChange}>
              <FormControlLabel value="code" control={<Radio />} label="Code" />
              <FormControlLabel value="choice" control={<Radio />} label="Choice" />
              <FormControlLabel
                value="multiple-choice"
                control={<Radio />}
                label="Multiple choice"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Correct answers field */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth disabled={values.category === "code"}>
            <FormLabel>Correct answers</FormLabel>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} width={"100%"}>
              <TextField
                fullWidth
                multiline
                spellCheck={false}
                label="Correct answer"
                margin="dense"
                inputRef={correctAnswerInputRef}
                value={correctAnswer}
                disabled={
                  values.category === "code" ||
                  (values.category === "choice" && values.correctAnswers?.length === 1)
                }
                onChange={(e) => {
                  setCorrectAnswer(e.target.value);
                }}
              />

              <IconButton
                className="bg-gradient"
                disabled={
                  values.category === "code" ||
                  (values.category === "choice" && values.correctAnswers?.length === 1)
                }
                sx={{
                  background: (theme) =>
                    values.category === "code" ||
                    (values.category === "choice" && values.correctAnswers?.length === 1)
                      ? theme.palette.action.disabled
                      : theme.palette.gradient.main,
                }}
                onClick={handleAddCorrectAnswer}
              >
                <Add />
              </IconButton>
            </Stack>
            {/* List correct answers */}
            {values?.correctAnswers?.map((correctAns) => (
              <Stack
                key={correctAns}
                flexDirection={"row"}
                alignItems={"center"}
                gap={1}
                width={"100%"}
              >
                <TextField
                  fullWidth
                  multiline
                  size="small"
                  margin="dense"
                  value={correctAns}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteCorrectAnswer(correctAns)}
                >
                  <Delete color="error" />
                </IconButton>
              </Stack>
            ))}
          </FormControl>
        </Grid>

        {/* Answers field */}
        <Grid item md={6} xs={12}>
          <FormControl fullWidth disabled={values.category === "code"}>
            <FormLabel>Answers</FormLabel>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} width={"100%"}>
              <TextField
                fullWidth
                multiline
                spellCheck={false}
                label="Answers"
                margin="dense"
                inputRef={answerInputRef}
                value={answer}
                disabled={values.category === "code"}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
              <IconButton
                className="bg-gradient"
                disabled={values.category === "code"}
                onClick={handleAddAnswer}
              >
                <Add />
              </IconButton>
            </Stack>

            {/* List answers */}
            {values?.answers?.map((answer) => (
              <Stack
                key={answer}
                flexDirection={"row"}
                alignItems={"center"}
                width={"100%"}
                sx={{
                  ".correct": {
                    bgcolor: (theme) => theme.palette.success.main,
                  },
                  ".incorrect": {
                    bgcolor: (theme) => theme.palette.warning.main,
                  },
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  size="small"
                  margin="dense"
                  value={answer}
                  InputProps={{
                    readOnly: true,
                    sx: { color: "#fff" },
                  }}
                  className={values?.correctAnswers?.includes(answer) ? "correct" : "incorrect"}
                />
                <IconButton
                  size="small"
                  disabled={values?.correctAnswers?.includes(answer)}
                  onClick={() => handleDeleteAnswer(answer)}
                >
                  <Delete color={values?.correctAnswers?.includes(answer) ? "disabled" : "error"} />
                </IconButton>
              </Stack>
            ))}
          </FormControl>
        </Grid>

        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            multiline
            label="Explaination"
            name="explaination"
            minRows={4}
            spellCheck={false}
            value={values.explaination}
            error={!!(touched.explaination && errors.explaination)}
            helperText={touched.explaination && errors.explaination}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <Stack>
            <Typography variant="subtitle2" fontWeight={400}>
              * Catgory is <b>code</b>, no answer and won't be created if course is <b>public</b>
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              * Catgory is <b>choice</b>, you only have one correct anwer
            </Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              * Catgory is <b>multiple choice</b>, you must have at least two correct anwers
            </Typography>
          </Stack>
        </Grid>

        <Grid item md={12} xs={12} display={"flex"} justifyContent={"end"}>
          <Button
            // fullWidth
            type="submit"
            variant="contained"
            disabled={isDisabled || isSubmitting}
            endIcon={<SendIcon />}
            sx={{ textTransform: "capitalize", zIndex: 1, pl: 2, pr: 2 }}
          >
            {type}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(FormQuestion);
