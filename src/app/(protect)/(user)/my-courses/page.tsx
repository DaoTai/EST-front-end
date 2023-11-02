"use client";
import MyCourse from "@/components/course-components/MyCourse";
import { Container, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";

export const fetcherMyCourses: Fetcher<IRegisterCourse[], string> = (url: string) =>
  fetch(url).then((res) => res.json());

const MyCourses = () => {
  const { data: listCourses, isLoading } = useSWR("/api/user/my-courses", fetcherMyCourses, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    return (
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Loading ...
      </Typography>
    );
  }

  return (
    <Container>
      <Divider>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          My courses
        </Typography>
      </Divider>
      <Typography variant="body1" gutterBottom>
        You have <b>{listCourses?.length}</b> courses
      </Typography>
      <Grid container spacing={2}>
        {listCourses?.map((registerCourse) => (
          <Grid key={registerCourse._id} item lg={3} md={4} sm={6} xs={12}>
            <Link href={"/my-courses/" + registerCourse._id}>
              <MyCourse data={registerCourse} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCourses;
