"use client";
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
import Spinner from "@/components/custom/Spinner";
import Intro from "@/components/profile-components/Intro";
import clientSideAxios from "@/config/axios/client-side";
import useSWR, { Fetcher } from "swr";
import RegisterButton from "./RegisterButton";
import Image from "next/image";

const fetcher: Fetcher<ICourse, string> = (url: string) => {
  return clientSideAxios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error("Error fetch course");
    });
};

const DetailCourse = ({ slug }: { slug: string }) => {
  const {
    data: detail,
    isLoading,
    error,
  } = useSWR("/search/courses/" + slug, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (error) {
    return (
      <Typography variant="h6" textAlign={"center"}>
        Not found course
      </Typography>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (detail) {
    return (
      <>
        <Grid container columnSpacing={1} pt={1}>
          {/* About teacher */}
          <Grid item md={4} sm={12} component={Paper} p={1} mb={1}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={1}>
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
              <Box p={1}>
                <Intro user={detail.createdBy} />
              </Box>
            </Suspense>
          </Grid>

          {/* About course */}
          <Grid item md={8} sm={12}>
            <Paper elevation={3} sx={{ pt: 0, p: 1, overflow: "hidden" }}>
              {/* Banner */}
              <Suspense fallback="Loading...">
                <Banner course={detail} mode="visitor" />
              </Suspense>

              {/* Button register */}
              <Box mt={1}>
                <Suspense fallback={<p>Loadding</p>}>
                  <RegisterButton _id={detail._id} name={detail.name} type={detail.type} />
                </Suspense>
              </Box>

              {/* Introduce */}
              <Box mt={1} mb={1}>
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  Created time: {dayjs(detail.createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: detail.intro }}
                  p={1}
                  border={1}
                  borderRadius={2}
                  gutterBottom
                ></Typography>
                {detail?.roadmap && (
                  <>
                    <Typography variant="body1" fontWeight={500} gutterBottom>
                      Roadmap:
                    </Typography>
                    <Image
                      unoptimized
                      src={detail.roadmap.uri}
                      alt="roadmap"
                      width={280}
                      height={250}
                      style={{
                        borderRadius: 4,
                        width: "100%",
                        objectFit: "contain",
                        objectPosition: "left center",
                      }}
                    />
                  </>
                )}

                <Divider />
              </Box>

              {/* Lessons */}
              <Stack
                gap={1}
                p={1}
                borderRadius={2}
                sx={{
                  minHeight: "50vh",
                  backgroundImage: `url(${detail?.thumbnail?.uri}),  linear-gradient(to bottom right,
                  rgba(0, 0, 0, 0.8), 
                  rgba(0, 0, 0, 0.45)
                ) `,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {detail.lessons?.map((lesson, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 1.5,
                      border: 1,
                      bgcolor: "rgba(0,0,0,0.5)",
                      textShadow: "1px 1px 4px #000",
                      color: (theme) => theme.palette.white.light,
                    }}
                  >
                    {lesson.name}
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default DetailCourse;
