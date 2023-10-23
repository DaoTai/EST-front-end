import { Grid, Typography } from "@mui/material";

import serverAxios from "@/config/axios";
import { redirect } from "next/navigation";
import About from "../_components/About";
import CreateLesson from "../_components/CreateLesson";
import ListLessons from "../_components/ListLessons";

const getCourseById = async (id: string): Promise<ICourse | undefined> => {
  const res = await serverAxios.get("/courses/" + id);
  return res.data;
};

const DetailCourse = async ({ params }: { params: { id: string } }) => {
  const course = await getCourseById(params.id);

  if (course) {
    if (course.deleted) redirect("/");
    return (
      <>
        <Grid container p={1} spacing={1}>
          <Grid item md={3} xs={12}>
            <About course={course} />
          </Grid>
          <Grid item md={9} xs={12}>
            <ListLessons />
          </Grid>
        </Grid>
        <CreateLesson />
      </>
    );
  }
  return (
    <Typography variant="h3" textAlign={"center"}>
      Loading
    </Typography>
  );
};

export default DetailCourse;
