import { Chip, Paper, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
interface IProps {
  question: IQuestion;
  index: number;
  onChange: (idQuestion: string, newAnswer: string) => void;
  myAnswer?: { idQuestion: string; answers: string[] };
}
const MultilChoiceQuestion = ({ question, index, myAnswer, onChange }: IProps) => {
  return (
    <Paper key={index} elevation={4} sx={{ p: 1 }}>
      {/* Content & Category */}
      <Stack flexDirection={"row"} gap={1} mb={1}>
        <Typography variant="body1" fontWeight={500}>
          {index}. {question.content}
        </Typography>
        <Chip
          label={question.category}
          color={question.category === "choice" ? "info" : "secondary"}
          size="small"
        />
      </Stack>

      {/* Answers */}
      <Stack gap={1}>
        {question.answers?.map((answer, index) => {
          return (
            <FormGroup key={index} sx={{ pl: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={myAnswer?.answers.includes(answer) || false}
                    onChange={() => {
                      onChange(question._id, answer);
                    }}
                  />
                }
                label={answer}
              />
            </FormGroup>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default MultilChoiceQuestion;
