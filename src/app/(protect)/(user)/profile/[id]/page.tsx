import HeadingProfile from "@/components/profile-components/Heading";
import Intro from "@/components/profile-components/Intro";
import serverAxios from "@/config/axios/server-side";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ListCreatedCourses from "./_components/ListCreatedCourses";
import ListRegisterCourses from "./_components/ListRegisterCourses";
// Check log back-end to see this page be cached
const getData = async (
  id: string
): Promise<{ profile: IProfile | null; listCourses: IRegisterCourse[] }> => {
  try {
    const res = await serverAxios.get("/user/profile/" + id);
    return res.data;
  } catch (error) {
    notFound();
  }
};

// If user is teacher
const getCreatedCourses = async (userId: string): Promise<ICourse[]> => {
  try {
    const res = await serverAxios.get("/user/profile/" + userId + "/created-courses");
    return res.data;
  } catch (error) {
    return [];
  }
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await getData(params.id);
  const profile = data.profile;
  const image = profile?.avatar.uri;

  return {
    title: profile?.username,
    description: profile?.bio,
    openGraph: {
      images: image ? [image] : [],
    },
  };
}

const DetailProfile = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  if (!data?.profile || !data?.listCourses) {
    notFound();
  } else {
    const { profile, listCourses } = data;
    let listCreatedCourses: ICourse[] = [];
    if (profile.roles.includes("teacher")) {
      listCreatedCourses = await getCreatedCourses(params.id);
    }
    return (
      <>
        {profile && (
          <>
            <HeadingProfile
              avatar={profile.avatar}
              roles={profile.roles}
              username={profile.username}
            />
            <Grid container spacing={2} mt={2}>
              <Grid item md={4} xs={12}>
                <Paper sx={{ p: 1 }}>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Intro user={profile} />
                  </Suspense>
                </Paper>
              </Grid>
              <Grid item md={8} xs={12} display={"flex"} flexDirection={"column"} gap={2}>
                {/* List created courses */}
                {profile.roles.includes("teacher") && (
                  <Box>
                    <Typography
                      gutterBottom
                      variant="h4"
                      className="underline-gradient"
                      fontWeight={500}
                      pb={0.5}
                    >
                      Owner courses
                    </Typography>
                    <ListCreatedCourses listCreatedCourses={listCreatedCourses} />
                  </Box>
                )}

                {/* List register courses */}
                <Box>
                  <Typography
                    gutterBottom
                    variant="h4"
                    className="underline-gradient"
                    fontWeight={500}
                    pb={0.5}
                  >
                    Register courses
                  </Typography>
                  <ListRegisterCourses listRegisterCourses={listCourses} />
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
};

export default DetailProfile;
