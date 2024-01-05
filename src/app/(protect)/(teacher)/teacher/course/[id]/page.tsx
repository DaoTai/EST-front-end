"use client";
import About from "@/components/course-components/About";
import CreateLesson from "@/components/lesson-components/CreateLesson";
import ListLessons from "@/components/lesson-components/ListLessons";
import clientSideAxios from "@/config/axios/client-side";
import { showErrorToast } from "@/utils/functions";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AvgScoreChart from "./_components/AvgScoreChart";
import Spinner from "@/components/custom/Spinner";

const DetailCourse = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<ICourse | undefined>();

  useEffect(() => {
    setLoading(true);
    clientSideAxios
      .get("/courses/" + params.id)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => showErrorToast(err))
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  if (loading) return <Spinner />;

  if (course) {
    if (course.deleted) redirect("/");
    return (
      <>
        <Grid container p={1} spacing={1}>
          <Grid item md={4} xs={12}>
            <Suspense fallback="Loading ...">
              <About course={course} />
            </Suspense>
          </Grid>
          <Grid item md={8} xs={12}>
            <Divider>
              <Typography gutterBottom variant="h5">
                Lessons
              </Typography>
            </Divider>
            <Suspense fallback="Loading lessons ...">
              <ListLessons idCourse={params.id} />
            </Suspense>
          </Grid>

          <Grid item xs={12}>
            <Suspense fallback={<p>Loading ...</p>}>
              <AvgScoreChart id={params.id} />
            </Suspense>
          </Grid>
        </Grid>
        {/* Create lesson */}
        <CreateLesson />
      </>
    );
  }

  return (
    <Typography variant="h5" textAlign={"center"} p={2}>
      Course is not found
    </Typography>
  );
};

export default DetailCourse;
