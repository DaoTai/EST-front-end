"use client";
import { IFormCourse } from "@/types/ICourse";
import { convertObjectToFormData } from "@/utils/functions";
import Container from "@mui/material/Container";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormCourse from "@/components/course-components/FormCourse";
import useSWR, { Fetcher } from "swr";
import { Helmet } from "react-helmet";

const fetcher: Fetcher<ICourse, string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    toast.error("Having issues");
  });

const EditCourse = ({ params }: { params: { id: string } }) => {
  const { data: course, mutate } = useSWR("/api/teacher/courses/" + params.id, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleEdit = useCallback(async (values: IFormCourse) => {
    try {
      const formData = convertObjectToFormData(values);
      await fetch("/api/teacher/courses/" + params.id, {
        method: "PATCH",
        body: formData,
      });
      mutate();
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
      {course && <FormCourse action="edit" course={course} onSubmit={handleEdit} />}
    </Container>
  );
};

export default EditCourse;
