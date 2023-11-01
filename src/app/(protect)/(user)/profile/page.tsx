import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";
import { getServerSession } from "next-auth";
import { options } from "@/config/next-auth";
import { Intro, Heading, Panel } from "./_components";
import { Paper } from "@mui/material";
import { Suspense } from "react";

const Profile = async () => {
  const session = await getServerSession(options);

  return (
    <>
      <Heading avatar={session?.avatar} username={session?.username} roles={session?.roles} />
      <Panel />
      <Divider />
      {session && (
        <Grid container mt={1} spacing={2}>
          <Grid item md={3}>
            <Paper elevation={2} sx={{ p: 1 }}>
              <Suspense fallback={<p>Loading</p>}>
                <Intro user={session} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Paper>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempore qui alias esse
              vitae aut temporibus error placeat, officiis magni, corrupti vero id expedita soluta
              voluptates, unde blanditiis sapiente numquam?
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
