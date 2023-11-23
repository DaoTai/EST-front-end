"use client";
import { fetcherMyCourses } from "@/components/common/Header/Actions/MyCourses";
import MainLayout from "@/components/common/MainLayout";
import MyCourse from "@/components/course-components/MyCourse";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import useSWR from "swr";
import Spinner from "@/components/custom/Spinner";

const MyCourses = () => {
  const { data: listCourses, isLoading } = useSWR("/api/user/my-courses", fetcherMyCourses, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <MainLayout>
      <Container>
        <Divider>
          <Typography variant="h4" fontWeight={600} gutterBottom marginTop={1}>
            My courses
          </Typography>
        </Divider>
        <Typography variant="body1" gutterBottom>
          You have <b>{listCourses?.length}</b> courses
        </Typography>
        <Grid container spacing={2}>
          {listCourses?.map((registerCourse) => (
            <Grid key={registerCourse._id} item md={4} sm={6} xs={12}>
              <Link href={"/my-courses/" + registerCourse._id}>
                <Paper elevation={5} sx={{ height: "100%", borderRadius: 3 }}>
                  <MyCourse data={registerCourse} />
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default MyCourses;
