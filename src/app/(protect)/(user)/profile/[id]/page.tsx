import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import HeadingProfile from "@/components/profile-components/Heading";
import Intro from "@/components/profile-components/Intro";
import serverAxios from "@/config/axios/server-side";
import dayjs from "dayjs";
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
              <Grid item md={4} xs={12}>
                <Paper sx={{ p: 1 }}>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Intro user={profile} />
                  </Suspense>
                </Paper>
              </Grid>
              <Grid item md={8} xs={12}>
                <Grid container spacing={2}>
                  {listCourses.length > 0 ? (
                    listCourses?.map((register) => (
                      <Grid key={register._id} item sm={6} xs={12} gap={1}>
                        <Paper
                          elevation={4}
                          sx={{
                            pb: 2,
                            borderRadius: 3,
                            height: "100%",
                          }}
                        >
                          <Image
                            src={
                              register?.course?.thumbnail
                                ? (register?.course?.thumbnail?.uri as string)
                                : "/default-fallback-image.png"
                            }
                            alt="thumbnail"
                            width={100}
                            height={200}
                            style={{
                              width: "100%",
                              borderTopLeftRadius: 3,
                              borderTopRightRadius: 3,
                            }}
                          />

                          {/* Texts */}
                          <Stack alignItems={"start"} gap={0.5} pl={1} pr={1}>
                            <Typography variant="h6">{register.course.name}</Typography>
                            <Typography variant="subtitle2">
                              Joined time:
                              {dayjs(register.createdAt).format("DD/MM/YYYY")}
                            </Typography>
                            <Chip
                              size="small"
                              label={register.course.type}
                              color={register.course.type === "private" ? "info" : "success"}
                              sx={{ textTransform: "capitalize" }}
                            />
                            <Stack mt={1} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
                              {register.course.programmingLanguages?.map((lang, i) => (
                                <Chip
                                  key={i}
                                  className="bg-gradient"
                                  size="small"
                                  label={lang}
                                  sx={{ textTransform: "capitalize" }}
                                />
                              ))}
                            </Stack>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1" width={"100%"} textAlign={"center"} gutterBottom>
                      No course
                    </Typography>
                  )}
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
