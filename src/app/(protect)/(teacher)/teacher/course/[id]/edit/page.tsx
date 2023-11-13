"use client";
import { IFormCourse } from "@/types/ICourse";
import { convertObjectToFormData } from "@/utils/functions";
import Container from "@mui/material/Container";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormCourse from "@/components/course-components/FormCourse";

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
      const res = await fetch("/api/teacher/courses/" + id);

      if (res.ok) return await res.json();

      return undefined;
    } catch (error) {}
  };

  const handleEdit = useCallback(async (values: IFormCourse) => {
    try {
      const formData = convertObjectToFormData(values);
      await fetch("/api/teacher/courses/" + params.id, {
        method: "PATCH",
        body: formData,
      });

      toast.success("Edited course successfully");
    } catch (error) {
      toast.error("Edit course failed");
    }
  }, []);

  if (course?.deleted) {
    redirect("/");
  }

  return (
    <Container>
      {course && <FormCourse type="edit" course={course} onSubmit={handleEdit} />}
    </Container>
  );
};

export default EditCourse;
