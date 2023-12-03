"use client";
import Banner from "@/components/course-components/Banner";
import Spinner from "@/components/custom/Spinner";
import serverAxios from "@/config/axios/server-side";
import teacherCourseService from "@/services/teacher/course";
import { SERVER_URI } from "@/utils/constants/common";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher } from "swr";
const getListCourses = async (): Promise<ICourse[] | undefined> => {
  try {
    const res = await serverAxios.get("/courses");
    return res.data;
  } catch (error) {
    notFound();
  }
};

const fetcher: Fetcher<ICourse[], string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    toast.error("Having issues");
  });

const Teacher = () => {
  const {
    data: listCourses,
    isLoading,
    isValidating,
  } = useSWR("/api/teacher/courses", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const numberPendingCourses = useMemo(() => {
    return (
      listCourses?.reduce((acc, course) => {
        return acc + (course.status === "pending" ? 1 : 0);
      }, 0) ?? 0
    );
  }, [listCourses]);

  if (!listCourses) {
    return (
      <Container sx={{ pt: 1, pb: 4 }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Typography variant="body1" textAlign={"center"}>
            Having issues
          </Typography>
        )}
      </Container>
    );
  }

  if (listCourses)
    return (
      <Container sx={{ pt: 1, pb: 4 }}>
        <Typography gutterBottom variant="h3" className="underline-gradient" margin={"0 auto"}>
          List courses
        </Typography>
        <Box mt={2}>
          <Typography gutterBottom variant="body1">
            Approved courses: <b>{listCourses.length - numberPendingCourses}</b>
          </Typography>
          <Typography gutterBottom variant="body1">
            Pending courses: <b>{numberPendingCourses}</b>
          </Typography>
          {/* Actions */}
          <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Box
              component={Link}
              href="/teacher/course/create"
              className="btn-link"
              sx={{
                color: "#fff !important",
                pl: 2,
                pr: 2,
                borderRadius: 1,
                display: "block",
                bgcolor: "info.main",
                ":hover": {
                  bgcolor: "info.light",
                },
              }}
            >
              Create new course
            </Box>
            <Tooltip arrow title="Trashes" placement="right">
              <IconButton
                component={Link}
                href="/teacher/course/trashes"
                color="error"
                sx={{ color: "error.main", border: 1, borderColor: "error.main" }}
              >
                <DeleteSweepIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Stack mt={2} gap={2}>
          {listCourses?.map((course) => (
            <Link
              key={course._id}
              href={"/teacher/course/" + course._id}
              style={{ textDecoration: "none" }}
            >
              <Banner course={course} mode="manager" />
            </Link>
          ))}
        </Stack>

        {listCourses.length === 0 && (
          <Stack alignItems={"center"}>
            <Typography gutterBottom variant="body1" textAlign={"center"} marginTop={2}>
              You have no course
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              component={Link}
              href="/teacher/course/create"
            >
              Let's create course
            </Typography>
          </Stack>
        )}
      </Container>
    );
};

export default Teacher;
