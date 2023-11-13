"use client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useSWR from "swr";
import { fetcherMyCourses } from "@/components/common/Header/Actions/MyCourses";
import MyCourse from "@/components/course-components/MyCourse";

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
          <Grid container spacing={3}>
            {listCourses.map((course) => (
              <Grid item key={course._id} md={4} xs={6}>
                <Paper elevation={4} sx={{ borderRadius: 4 }}>
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
