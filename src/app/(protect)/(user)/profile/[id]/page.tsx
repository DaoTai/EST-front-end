import serverAxios from "@/config/axios";
import { notFound } from "next/navigation";
import { Heading, Intro } from "../_components";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Suspense } from "react";

// Check log back-end to see this page be cached
const getData = async (id: string): Promise<IProfile | undefined> => {
  try {
    const res = await serverAxios.get("/user/profile/" + id);
    return res.data;
  } catch (error) {
    notFound();
  }
};

const DetailProfile = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Heading avatar={data?.avatar} roles={data?.roles} username={data?.username} />
      {data && (
        <Grid container mt={2}>
          <Grid item md={3}>
            <Paper>
              <Suspense fallback={<p>Loading...</p>}>
                <Intro user={data} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item md={9}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quod! Tempore asperiores
            sint blanditiis sunt! Quod placeat fuga est dolorum rerum, recusandae velit natus
            maiores? Sit ipsum a nesciunt ut.
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DetailProfile;
