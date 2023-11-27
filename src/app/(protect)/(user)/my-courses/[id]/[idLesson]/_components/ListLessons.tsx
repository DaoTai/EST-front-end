"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  transition: "all linear 0.2s",
  ":hover:not(&.disabled)": {
    background: theme.palette.action.focus,
    cursor: "pointer",
  },
  ":is(&.active):not(&.disabled)": {
    background: theme.palette.gradient.main,
    color: "#fff !important",
  },
  "&.disabled": {
    background: theme.palette.action.disabled,
    color: theme.palette.action.disabled,
    cursor: "not-allowed",
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
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  return (
    <Stack p={1} gap={1}>
      <Divider>
        <Typography variant="h5" textAlign={"center"} gutterBottom>
          Lessons
        </Typography>
      </Divider>
      {/* Passed lessons */}
      {data?.passedLessons?.map((lesson) => (
        <Link key={lesson._id} href={"/my-courses/" + params.id + "/" + lesson._id}>
          <LessonWrapper className={params.idLesson === lesson._id ? "active" : ""}>
            <Typography variant="subtitle1">{lesson.name}</Typography>
            <CheckCircleIcon color="success" />
          </LessonWrapper>
        </Link>
      ))}

      {/* Next lessons */}
      {data?.nextLessons?.map((lesson, index) =>
        index === 0 ? (
          <LessonWrapper
            key={lesson._id}
            className={params.idLesson === lesson._id ? "active" : ""}
            onClick={() => router.push(`/my-courses/${params.id}/${lesson._id}`)}
          >
            <Typography variant="subtitle1">{lesson.name}</Typography>
          </LessonWrapper>
        ) : (
          <LessonWrapper
            key={lesson._id}
            className={params.idLesson === lesson._id ? "active" : "disabled"}

            // onClick={() => router.push(`/my-courses/${params.id}/${lesson._id}`)}
          >
            <Typography variant="subtitle1">{lesson.name}</Typography>
          </LessonWrapper>
        )
      )}

      {/* Loading */}
      {isLoading && (
        <Skeleton>
          <LessonWrapper>
            <Typography variant="subtitle1" />
          </LessonWrapper>
        </Skeleton>
      )}
    </Stack>
  );
};

export default ListLessons;
