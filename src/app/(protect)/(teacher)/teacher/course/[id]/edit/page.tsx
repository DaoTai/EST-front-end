"use client";
import { IFormCourse } from "@/types/ICourse";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import FormCourse from "../../_components/FormCourse";
import { toast } from "react-toastify";
import { convertObjectToFormData } from "@/utils/functions";

const EditCourse = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<ICourse>();
  useEffect(() => {
    (async () => {
      const data = await getCourseById(params.id);
      setCourse(data);
    })();
  }, []);

  // Chưa revalidate
  const getCourseById = async (id: string) => {
    try {
      const res = await fetch("/api/teacher/courses/" + id, {
        next: {
          tags: ["course"],
        },
      });

      if (res.ok) return await res.json();

      return undefined;
    } catch (error) {}
  };

  const handleEdit = async (values: IFormCourse) => {
    try {
      const formData = convertObjectToFormData(values);

      const res = await fetch("/api/teacher/courses/" + params.id, {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      console.log("Data: ", data);

      toast.success("Edited course successfully");
      return data;
    } catch (error) {
      toast.error("Edit course failed");
    }
  };

  return (
    <Container>
      {course && <FormCourse type="edit" course={course} onSubmit={handleEdit} />}
    </Container>
  );
};

export default EditCourse;
