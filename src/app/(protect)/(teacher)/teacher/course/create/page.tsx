"use client";
import { Container } from "@mui/material";
import FormCourse from "../_components/FormCourse";
import { IFormCourse } from "@/types/ICourse";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const handleCreateCourse = async (value: IFormCourse) => {
    const formData = new FormData();
    for (const [key, val] of Object.entries(value)) {
      formData.append(String(key), val);
    }
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
    <Container>
      <FormCourse type="create" onSubmit={handleCreateCourse} />
    </Container>
  );
};

export default CreateCourse;
