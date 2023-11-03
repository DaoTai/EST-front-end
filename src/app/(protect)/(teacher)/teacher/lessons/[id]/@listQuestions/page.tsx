"use client";

import MyModal from "@/components/custom/Modal";
import FormQuestion from "@/components/question-components/FormQuestion";
import TableQuestions from "@/components/question-components/TableQuestions";
import HelpIcon from "@mui/icons-material/Help";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListQuestions = ({ params }: { params: { id: string } }) => {
  const [openFormQuestion, setFormQuestion] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [listQuestions, setListQuestion] = useState<IQuestion[]>([]);

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetch("/api/teacher/questions/" + params.id)
        .then((res) => res.json())
        .then((data) => setListQuestion(data));
      setLoading(false);
    }
  }, [params]);

  const onCloseFormQuestion = useCallback(() => {
    setFormQuestion(false);
  }, []);

  const handleCreateQuestion = useCallback(
    async (body: Omit<IQuestion, "_id" | "createdAt" | "updatedAt"> & Partial<IQuestion>) => {
      try {
        if (body.category === "code") {
          delete body?.correctAnswers;
          delete body?.answers;
        }
        console.log("body: ", body);

        const res = await axios.post("/api/teacher/questions/" + params.id, body);
        setListQuestion((prev) => [...prev, res.data]);
        setFormQuestion(false);
        toast.success("Create question successfully");
      } catch (error) {
        toast.error("Create question failed");
      }
    },
    []
  );

  return (
    <>
      <Box pt={2}>
        <Button
          size="small"
          variant="contained"
          color="warning"
          startIcon={<HelpIcon />}
          onClick={() => setFormQuestion(true)}
        >
          Create question
        </Button>
        <TableQuestions questions={listQuestions} setListQuestion={setListQuestion} />
        {loading && (
          <Typography variant="body1" textAlign={"center"}>
            Loading
          </Typography>
        )}
      </Box>

      {/* Modal question */}
      <MyModal open={openFormQuestion} onClose={onCloseFormQuestion}>
        <Box minWidth={"65vw"}>
          <FormQuestion onSubmit={handleCreateQuestion} />
        </Box>
      </MyModal>
    </>
  );
};

export default ListQuestions;
