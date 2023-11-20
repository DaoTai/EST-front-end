import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import Link from "next/link";
import { Suspense } from "react";

import Banner from "@/components/course-components/Banner";
import PreviewLesson from "@/components/lesson-components/PreviewLesson";
import { SERVER_URI } from "@/utils/constants/common";
import RegisterButton from "./_components/RegisterButton";
import Intro from "@/components/profile-components/Intro";

const DetailCourse = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(SERVER_URI + "/search/courses/" + params.slug);
  if (res.ok) {
    const detail: ICourse = await res.json();
    return (
      <>
        <Grid container spacing={1} pt={1}>
          {/* About teacher */}
          <Grid item lg={3.5} md={4} sm={12}>
            <Paper elevation={3} sx={{ p: 1 }}>
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Avatar
                  src={detail.createdBy.avatar.uri}
                  alt="avatar"
                  sx={{ width: 120, height: 120 }}
                />
                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <Typography variant="body1" fontWeight={500}>
                    {detail.createdBy.username}
                  </Typography>
                  <Tooltip arrow title="Visit">
                    <Link href={"/profile/" + detail.createdBy._id} style={{ color: "inherit" }}>
                      <IconButton sx={{ border: 1, borderColor: "info.light" }}>
                        <PersonSearchIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Stack>
              </Stack>

              <Suspense fallback={<p>Loading</p>}>
                <Intro user={detail.createdBy} />
              </Suspense>
            </Paper>
          </Grid>

          {/* About course */}
          <Grid item lg={8.5} md={8} sm={12}>
            <Paper elevation={3}>
              {/* Banner */}
              <Banner course={detail} mode="visitor" />

              {/* Button register */}
              <Box p={1}>
                <Suspense fallback={<p>Loadding</p>}>
                  <RegisterButton _id={detail._id} name={detail.name} type={detail.type} />
                </Suspense>
              </Box>

              {/* Introduce */}
              <Box p={1}>
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  Created time: {dayjs(detail.createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: detail.intro }}
                ></Typography>
                <Divider />
                <Typography variant="subtitle1" gutterBottom>
                  <b>{detail.lessons.length}</b> lessons
                </Typography>
                {/* Lessons */}
                <Stack gap={1}>
                  {detail.lessons.map((lesson, i) => (
                    <Stack key={lesson._id} flexDirection={"row"} alignItems={"center"} gap={1}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        borderRadius={99}
                        width={25}
                        height={25}
                        textAlign={"center"}
                        className="bg-gradient"
                      >
                        {i + 1}
                      </Typography>
                      <Box flexGrow={2}>
                        <PreviewLesson lesson={lesson} />
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <Typography variant="h6" textAlign={"center"}>
      Course not found
    </Typography>
  );
};

export default DetailCourse;
