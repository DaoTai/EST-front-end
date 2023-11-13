"use client";

import TableQuestions from "@/components/question-components/TableQuestions";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

const ListQuestions = ({ params }: { params: { id: string } }) => {
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

  return (
    <>
      <Divider>
        <Typography gutterBottom variant="h5" textAlign={"center"}>
          Questions
        </Typography>
      </Divider>
      <TableQuestions readOnly questions={listQuestions} setListQuestion={setListQuestion} />
      {loading && (
        <Typography variant="body1" textAlign={"center"}>
          Loading
        </Typography>
      )}
    </>
  );
};

export default ListQuestions;
