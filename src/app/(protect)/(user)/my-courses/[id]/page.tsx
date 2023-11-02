"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import Spinner from "@/components/custom/Spinner";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Fab,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR, { Fetcher } from "swr";

const myCourseFetcher: Fetcher<IRegisterCourse, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const DetailCourse = ({ params }: { params: { id: string } }) => {
  const {
    data: registeredCourse,
    isLoading,
    error,
  } = useSWR("/api/user/my-courses/" + params.id, myCourseFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ p: 1 }}>
      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"start"}
        mb={1}
      >
        <Box>
          <Avatar
            src={registeredCourse?.teacher.avatar.uri}
            sx={{ width: 100, height: 100, mb: 1 }}
          />
          <Link href={"/profile/" + registeredCourse?.teacher._id}>
            <Chip label={registeredCourse?.teacher.username} />
          </Link>
        </Box>

        <Tooltip title="Exit course">
          <Fab size="small" color="error">
            <LogoutIcon />
          </Fab>
        </Tooltip>
      </Stack>
      <Divider />
      <Grid container pt={1} spacing={1}>
        <Grid item md={6} sm={12}>
          <Stack gap={1} alignItems={"start"}>
            <Typography variant="h5">{registeredCourse?.course.name}</Typography>
            <Typography variant="body1">
              Joined time: {dayjs(registeredCourse?.createdAt).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body1">
              Passed lessons: {registeredCourse?.passedLessons.length}
            </Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography variant="body1">Your rating: {registeredCourse?.rating} </Typography>
              <Rating value={registeredCourse?.rating} precision={0.5} />
            </Stack>

            <Stack flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"} gap={1}>
              <Tooltip arrow title="Level" sx={{ textTransform: "capitalize" }}>
                <Box>
                  <Chip label={registeredCourse?.course.level} />
                </Box>
              </Tooltip>
              <Tooltip arrow title="Type" sx={{ textTransform: "capitalize" }}>
                <Box>
                  <Chip label={registeredCourse?.course.type} />
                </Box>
              </Tooltip>
              <Tooltip arrow title="Category">
                <Box>
                  <Chip label={registeredCourse?.course.category} />
                </Box>
              </Tooltip>
              <Chip
                label={registeredCourse?.course.members.length + " members"}
                className="bg-gradient"
              />
              <Chip
                label={registeredCourse?.course.lessons.length + " lessons"}
                className="bg-gradient"
              />
            </Stack>

            {registeredCourse?.latestLesson && (
              <Typography variant="body1">
                Lastest lesson: {registeredCourse?.latestLesson?._id}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item md={6} sm={12}>
          <Image
            src={registeredCourse?.course.thumbnail.uri as string}
            alt="thumbnail"
            width={200}
            height={200}
            style={{ width: "100%" }}
          />
          <Typography variant="body2" textAlign={"justify"}>
            {registeredCourse?.course.intro}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailCourse;
