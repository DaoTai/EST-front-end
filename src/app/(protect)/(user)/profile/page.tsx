import Divider from "@mui/material/Divider";

import { options } from "@/config/next-auth";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { Heading, Intro, Panel } from "./_components";

import RegisteredCourses from "./_components/RegisteredCourses";

const Profile = async () => {
  const session = await getServerSession(options);

  return (
    <>
      <Heading avatar={session?.avatar} username={session?.username} roles={session?.roles} />
      <Panel />
      <Divider />
      {session && (
        <Grid container mt={1} spacing={2}>
          <Grid item md={3} xs={12}>
            <Paper elevation={2} sx={{ p: 1 }}>
              <Suspense fallback={<p>Loading</p>}>
                <Intro user={session} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item md={9} xs={12}>
            <RegisteredCourses />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
