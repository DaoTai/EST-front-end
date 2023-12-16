import Divider from "@mui/material/Divider";

import { options } from "@/config/next-auth";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

import HeadingProfile from "@/components/profile-components/Heading";
import Intro from "@/components/profile-components/Intro";
import PanelNavigation from "@/components/profile-components/PanelNavigation";
import RegisteredCourses from "@/components/profile-components/RegisteredCourses";

const Profile = async () => {
  const session = await getServerSession(options);

  return (
    <>
      <HeadingProfile
        avatar={session?.avatar}
        username={session?.username}
        roles={session?.roles}
      />
      <PanelNavigation />
      <Divider />
      {session && (
        <Grid container mt={1} spacing={2}>
          <Grid item md={4} xs={12}>
            <Paper elevation={2} sx={{ p: 1 }}>
              <Suspense fallback={<p>Loading</p>}>
                <Intro user={session} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item md={8} xs={12}>
            <RegisteredCourses />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
