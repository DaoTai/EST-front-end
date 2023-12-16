"use client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { fetcherMyCourses } from "@/components/common/Header/Actions/MyCourses";
import MyCourse from "@/components/course-components/MyCourse";
import useSWR from "swr";
import Link from "next/link";

const RegisteredCourses = () => {
  const { data: listCourses, isLoading } = useSWR("/api/user/my-courses", fetcherMyCourses, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Loading ...
      </Typography>
    );
  }

  if (listCourses) {
    if (listCourses.length > 0) {
      return (
        <>
          <Grid container spacing={2}>
            {listCourses.map((course) => (
              <Grid item key={course._id} sm={6} xs={12}>
                <Paper
                  component={Link}
                  href={
                    "/my-courses/" +
                    (course.passedLessons.length > 0
                      ? course._id + "/" + course.passedLessons[course.passedLessons.length - 1]
                      : course._id)
                  }
                  elevation={4}
                  sx={{ borderRadius: 2 }}
                >
                  <MyCourse data={course} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      );
    }
    return (
      <Typography variant="body1" textAlign={"center"}>
        No course
      </Typography>
    );
  }
};

export default RegisteredCourses;
