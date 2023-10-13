"use client";
import { IFormCourse } from "@/types/ICourse";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import FormCourse from "../../_components/FormCourse";
import { Box, Paper } from "@mui/material";

const getCourseById = async (id: string) => {
  try {
    const res = await fetch("/api/teacher/courses/" + id);
    if (res.ok) return await res.json();

    return undefined;
  } catch (error) {}
};

const EditCourse = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<ICourse>();
  useEffect(() => {
    (async () => {
      const data = await getCourseById(params.id);
      setCourse(data);
    })();
  }, []);

  const handleEdit = async (values: IFormCourse) => {};

  return (
    <Box pr={2} pl={2}>
      {course && <FormCourse type="edit" course={course} onSubmit={handleEdit} />}
    </Box>
  );
};

export default EditCourse;
