"use client";
import CheckIcon from "@mui/icons-material/Check";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Dialog, Stack } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import MyDialog from "../custom/Dialog";
import MyModal from "../custom/Modal";
import FormQuestion from "./FormQuestion";
import ListAnswerRecords from "./ListAnswerRecords";

type Props = {
  questions: IQuestion[];
  setListQuestion: Dispatch<SetStateAction<IQuestion[]>>;
  readOnly?: boolean;
};

const TableQuestions = ({ questions = [], setListQuestion, readOnly = false }: Props) => {
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [openListAnswers, setOpenListAnswers] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);

  //  Open detail question
  const onOpenForm = (ques: IQuestion) => {
    setQuestion(ques);
    setOpenForm(true);
  };

  // Close detail question
  const onCloseForm = () => {
    setOpenForm(false);
  };

  //  Open dialog
  const onOpenDialog = (question: IQuestion) => {
    setQuestion(question);
    setOpenDialogConfirm(true);
  };

  // Open list answers for question
  const onOpenListAnswers = (ques: IQuestion) => {
    setOpenListAnswers(true);
    setQuestion(ques);
  };

  // Edit question
  const handleEditQuestion = useCallback(
    async (data: Omit<IQuestion, "_id" | "createdAt" | "updatedAt">) => {
      if (data.category === "code") {
        delete data?.correctAnswers;
        delete data?.answers;
      }
      if (question?._id) {
        try {
          const res = await axios.patch("/api/teacher/questions/detail/" + question?._id, data);
          const newQuestion = res.data;

          setListQuestion((listQuestion) => {
            return [...listQuestion].map((question) => {
              if (question._id === newQuestion?._id) {
                return { ...question, ...newQuestion };
              }
              return question;
            });
          });

          onCloseForm();
          toast.success("Edit question successfully");
        } catch (error) {
          toast.error("Edit question failed");
        }
      }
    },
    [question]
  );

  // Close dialog
  const onCloseDialog = useCallback(() => {
    setOpenDialogConfirm(false);
  }, []);

  // Handle delete question
  const handleDeleteQuestion = useCallback(async () => {
    try {
      await axios.delete("/api/teacher/questions/detail/" + question?._id);
      setListQuestion((prev) => [...prev].filter((ques) => ques._id !== question?._id));
      toast.success("Delete question successfully");
    } catch (error) {
      toast.error("Delete question failed");
    }
  }, [question]);

  if (questions.length === 0) {
    return (
      <Typography variant="body1" margin={"normarl"} textAlign={"center"}>
        No question
      </Typography>
    );
  }

  return (
    <>
      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: "auto", mt: 1, mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Answers</TableCell>
              <TableCell>Correct answers</TableCell>
              {!readOnly && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow
                key={question._id}
                sx={{
                  verticalAlign: "top",

                  "&:last-child td, &:last-child th": { border: 0 },
                  ".cell": {
                    maxWidth: "150px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography variant="inherit" className="cell">
                    {question.content}
                  </Typography>
                </TableCell>
                <TableCell>{question.category}</TableCell>

                <>
                  <TableCell>
                    {question.answers?.map((ans, i) => (
                      <Typography
                        key={i}
                        className="cell"
                        variant="subtitle2"
                        gutterBottom
                        fontWeight={400}
                      >
                        - {ans}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    {question.correctAnswers?.map((ans, i) => (
                      <Stack key={i} flexDirection={"row"} alignItems={"center"} gap={1}>
                        <CheckIcon color="success" />
                        <Typography className="cell" variant="subtitle2" fontWeight={400}>
                          {ans}
                        </Typography>
                      </Stack>
                    ))}
                  </TableCell>
                </>

                {/* Actions */}
                {!readOnly && (
                  <TableCell>
                    <Tooltip arrow title="Answers">
                      <IconButton
                        disabled={question.category !== "code"}
                        onClick={() => onOpenListAnswers(question)}
                      >
                        <ChecklistIcon
                          color={question.category === "code" ? "warning" : "disabled"}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Edit">
                      <IconButton color="info" onClick={() => onOpenForm(question)}>
                        <EditIcon color="info" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Delete">
                      <IconButton color="error" onClick={() => onOpenDialog(question)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal form question */}
      {question && (
        <MyModal open={openForm} onClose={onCloseForm}>
          <Box minWidth={"65vw"}>
            <FormQuestion type="edit" question={question} onSubmit={handleEditQuestion} />
          </Box>
        </MyModal>
      )}

      {/* Dialog */}
      {openDialogConfirm && (
        <MyDialog
          title="Question"
          content="Do you want to delete this question?"
          onClose={onCloseDialog}
          onSubmit={handleDeleteQuestion}
        />
      )}

      {/* Detail list answers */}
      {question && (
        <Dialog open={openListAnswers} fullScreen onClose={() => setOpenListAnswers(false)}>
          <Box>
            <IconButton onClick={() => setOpenListAnswers(false)}>
              <ArrowBackIos />
            </IconButton>
            <ListAnswerRecords question={question} />
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default memo(TableQuestions);
