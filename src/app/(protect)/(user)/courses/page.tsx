"use client";
import MyCourse from "@/components/course-components/MyCourse";
import { Container, Divider, Grid, Typography } from "@mui/material";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<IRegisterCourse[], string> = (url: string) =>
  fetch(url).then((res) => res.json());

const MyCourses = () => {
  const { data: listCourses } = useSWR("/api/user/courses", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <Container>
      <Divider>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          My courses
        </Typography>
      </Divider>
      <Typography variant="body1" gutterBottom>
        You have <b>6</b> courses
      </Typography>
      <Grid container spacing={2}>
        {listCourses?.map((course) => (
          <Grid key={course._id} item lg={3} md={4} sm={6} xs={12}>
            <MyCourse data={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCourses;
