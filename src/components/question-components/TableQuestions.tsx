"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "axios";
import FormQuestion from "./FormQuestion";
import MyModal from "../custom/Modal";
import MyDialog from "../custom/Dialog";
import { Stack } from "@mui/material";

type Props = {
  questions: IQuestion[];
  setListQuestion: Dispatch<SetStateAction<IQuestion[]>>;
};

const TableQuestions = ({ questions = [], setListQuestion }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);

  const onOpenForm = (ques: IQuestion) => {
    setQuestion(ques);
    setOpenForm(true);
  };

  const onCloseForm = () => {
    setOpenForm(false);
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

  //  Open dialog
  const onOpenDialog = (question: IQuestion) => {
    setQuestion(question);
    setOpenDialogConfirm(true);
  };

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
              {!isMobile && (
                <>
                  <TableCell>Answers</TableCell>
                  <TableCell>Correct answers</TableCell>
                  <TableCell>Expired time</TableCell>
                </>
              )}
              <TableCell>Actions</TableCell>
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
                {!isMobile && (
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
                    <TableCell>
                      {question?.expiredTime
                        ? dayjs(question.expiredTime).format("MM/DD/YYYY h:mm A")
                        : "No date"}
                    </TableCell>
                  </>
                )}
                <TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {questions.length === 0 && (
          <Typography variant="body1" textAlign={"center"}>
            No question
          </Typography>
        )}
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
    </>
  );
};

export default memo(TableQuestions);
