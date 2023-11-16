import HeadingProfile from "@/components/profile-components/Heading";
import Intro from "@/components/profile-components/Intro";
import serverAxios from "@/config/axios";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

const DetailProfile = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  if (!data?.profile || !data?.listCourses) {
    notFound();
  } else {
    const { profile, listCourses } = data;
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
              <Grid item md={3} xs={12}>
                <Paper sx={{ p: 1 }}>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Intro user={profile} />
                  </Suspense>
                </Paper>
              </Grid>
              <Grid item md={9} xs={12}>
                <Grid container spacing={2}>
                  {listCourses?.map((register) => (
                    <Grid item md={4} key={register._id} gap={1}>
                      <Paper elevation={4} sx={{ pb: 2, borderRadius: 3 }}>
                        <Image
                          unoptimized
                          src={register.course.thumbnail.uri}
                          alt="thumbnail"
                          width={100}
                          height={200}
                          style={{ width: "100%", borderRadius: 8 }}
                        />
                        <Box pl={1} pr={1}>
                          <Typography variant="h6" gutterBottom>
                            {register.course.name}
                          </Typography>
                          <Stack flexDirection={"row"} gap={1}>
                            <Chip
                              size="small"
                              label={register.course.type}
                              color={register.course.type === "private" ? "info" : "success"}
                              sx={{ textTransform: "capitalize" }}
                            />

                            <Chip
                              size="small"
                              className="bg-gradient"
                              label={register.course.category}
                              sx={{ textTransform: "capitalize" }}
                            />
                          </Stack>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
};

export default DetailProfile;
