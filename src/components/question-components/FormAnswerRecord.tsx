"use client";
import { Button, FormLabel, Stack, TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

type IProps = {
  idAnswerRecord: string;
  idQuestion: string;
};

const FormAnswerRecord = ({ idAnswerRecord, idQuestion }: IProps) => {
  const [score, setScore] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    // Validate
    if (!score || score < 0 || score > 10) {
      toast.warn("Score is range of 0-10");
      return;
    }

    // Submit
    try {
      setLoading(true);
      setComment("");
      await axios.patch("/api/teacher/answer-records/detail/" + idAnswerRecord, {
        score,
        comment: comment.trim(),
      });
      mutate("/api/teacher/answer-records/" + idQuestion);
    } catch (error) {
      toast.error("Failed");
    }
    setLoading(false);
  };

  return (
    <Stack gap={1}>
      <Stack
        flexDirection={"row"}
        gap={1}
        sx={{
          input: {
            p: 0.5,
            width: 50,
            border: "none",
            outline: "none",
          },
        }}
      >
        <FormLabel>Score: </FormLabel>
        <input
          type="number"
          min={0}
          max={10}
          value={score || 0}
          onChange={(e) => setScore(+e.target.value)}
        />
      </Stack>
      <Box>
        <TextareaAutosize
          spellCheck={false}
          minRows={2}
          placeholder="Comment"
          style={{ width: "100%", fontSize: "inherit" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Button
        disabled={loading || !score || score < 0 || score > 10}
        size="small"
        variant="contained"
        onClick={handleSubmit}
      >
        {loading ? "Submitting" : "Submit"}
      </Button>
    </Stack>
  );
};

export default FormAnswerRecord;
