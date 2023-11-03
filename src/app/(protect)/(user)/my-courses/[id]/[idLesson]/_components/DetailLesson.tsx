"use client";
import VideoPlayer from "@/components/custom/VideoPlayer";
import { Box, Typography } from "@mui/material";
import useSWR, { Fetcher } from "swr";

const lessonFetcher: Fetcher<ILesson, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const DetailLesson = ({ idLesson }: { idLesson: string }) => {
  const { data: lesson, isLoading } = useSWR("/api/user/my-lessons/" + idLesson, lessonFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    return <Typography variant="body1">Loading lesson</Typography>;
  }
  console.log(lesson);

  return <Box>{lesson?.video && <VideoPlayer uri={lesson?.video.uri} />}</Box>;
};

export default DetailLesson;
