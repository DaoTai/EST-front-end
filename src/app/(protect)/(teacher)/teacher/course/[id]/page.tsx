import { Grid, Typography } from "@mui/material";
import React from "react";

import { getServerSession } from "next-auth";
import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
import CreateLesson from "../_components/CreateLesson";
import { redirect } from "next/navigation";
import About from "../_components/About";
import ListVideo from "../_components/ListVideo";

const getCourseById = async (id: string): Promise<ICourse | undefined> => {
  const session = await getServerSession(options);
  const res = await fetch(SERVER_URI + "/courses/" + id, {
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }
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
            <ListVideo />
          </Grid>
        </Grid>

        <CreateLesson />
      </>
    );
  }
  return (
    <Typography variant="h3" textAlign={"center"}>
      Course not found
    </Typography>
  );
};

export default DetailCourse;
