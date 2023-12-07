import React, { memo } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type IProps = {
  listQuestions: IQuestion[];
};

const ListCorrectAnswer: React.FC<IProps> = ({ listQuestions }) => {
  return (
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
  );
};

export default memo(ListCorrectAnswer);
