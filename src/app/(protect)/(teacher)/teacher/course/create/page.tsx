"use client";
import { IFormCourse } from "@/types/ICourse";
import { convertObjectToFormData } from "@/utils/functions";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import FormCourse from "@/components/course-components/FormCourse";

const CreateCourse = () => {
  const handleCreateCourse = async (value: IFormCourse) => {
    const formData = convertObjectToFormData(value);
    try {
      await fetch("/api/teacher/courses", {
        method: "POST",
        body: formData,
      });
      toast.success("Created new course");
    } catch (error) {
      toast.error("Create course failed");
    }
  };
  return (
    <Container sx={{ pt: 2 }}>
      <FormCourse action="create" onSubmit={handleCreateCourse} />
    </Container>
  );
};

export default CreateCourse;
