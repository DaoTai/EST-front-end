"use client";
import { IFormCourse } from "@/types/ICourse";
import { convertObjectToFormData } from "@/utils/functions";
import Container from "@mui/material/Container";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormCourse from "../../_components/FormCourse";

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
          tags: ["item"],
        },
      });

      if (res.ok) return await res.json();

      return undefined;
    } catch (error) {}
  };

  const handleEdit = useCallback(async (values: IFormCourse) => {
    console.log("value: ", values);

    try {
      const formData = convertObjectToFormData(values);

      const res = await fetch("/api/teacher/courses/" + params.id, {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();

      toast.success("Edited course successfully");
      return data;
    } catch (error) {
      toast.error("Edit course failed");
    }
  }, []);

  if (course?.deleted) {
    console.log("course: ", course);
    redirect("/");
  }

  return (
    <Container>
      <Link href={"/teacher"}>Back</Link>
      {course && <FormCourse type="edit" course={course} onSubmit={handleEdit} />}
    </Container>
  );
};

export default EditCourse;
