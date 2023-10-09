import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";
import { getServerSession } from "next-auth";
import { options } from "@/config/next-auth";
import { Intro, Heading, Panel } from "./_components";

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
            <div>
              <Intro user={session} />
            </div>
          </Grid>
          <Grid item md={9}>
            Haha
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
