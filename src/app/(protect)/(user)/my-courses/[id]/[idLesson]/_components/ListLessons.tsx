"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR, { Fetcher } from "swr";

type IRecapLesson = {
  _id: string;
  name: string;
};

type IMyLessons = {
  passedLessons: IRecapLesson[];
  nextLessons: IRecapLesson[];
};

const LessonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  borderRadius: 4,
  borderBottom: 1,
  cursor: "pointer",
  transition: "all linear 0.2s",
  ":is(:hover, &.active)": {
    background: theme.palette.gradient.main,
    color: "#fff !important",
  },
}));

const fetcher: Fetcher<IMyLessons, string> = (url: string) => fetch(url).then((res) => res.json());

const ListLessons = () => {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useSWR(
    "/api/user/my-lessons?idRegisteredCourse=" + params.id,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <Typography variant="body1">Loading ...</Typography>;
  }
  return (
    <Stack p={1} gap={1}>
      <Typography variant="h6" gutterBottom>
        Content about course
      </Typography>
      {/* Passed lessons */}
      {data?.passedLessons.map((lesson) => (
        <Link key={lesson._id} href={"/my-courses/" + params.id + "/" + lesson._id}>
          <LessonWrapper className={params.idLesson === lesson._id ? "active" : ""}>
            <Typography variant="subtitle1">{lesson.name}</Typography>
            <CheckCircleIcon color="success" />
          </LessonWrapper>
        </Link>
      ))}

      {/* Next lessons */}
      {data?.nextLessons.map((lesson) => (
        <LessonWrapper
          key={lesson._id}
          className={params.idLesson === lesson._id ? "active" : ""}
          onClick={() => router.push(`/my-courses/${params.id}/${lesson._id}`)}
        >
          <Typography variant="subtitle1">{lesson.name}</Typography>
        </LessonWrapper>
      ))}
    </Stack>
  );
};

export default ListLessons;
