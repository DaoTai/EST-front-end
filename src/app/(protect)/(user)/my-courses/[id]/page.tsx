"use client";

import ForwardIcon from "@mui/icons-material/Forward";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher, mutate } from "swr";
import MyDialog from "@/components/custom/Dialog";
import Spinner from "@/components/custom/Spinner";
const myCourseFetcher: Fetcher<IRegisterCourse, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const DetailCourse = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data: registeredCourse, isLoading } = useSWR(
    "/api/user/my-courses/" + params.id,
    myCourseFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Rate course
  const handleRating = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
    if (value) {
      axios
        .patch("/api/user/my-courses/" + registeredCourse?.course._id, {
          rating: value,
        })
        .then(() => {
          mutate("/api/user/my-courses/" + params.id);
          toast.success("Rating successfully", { position: "top-right" });
        })
        .catch((error: AxiosError) => {
          toast.error("Rating failed" + `. ${error.response?.data}`, { position: "top-right" });
        });
    }
  };

  // Handle cancel course
  const handleCancel = async () => {
    try {
      await axios.delete("/api/user/my-courses/" + registeredCourse?.course._id);
      mutate("/api/user/my-courses");
      toast.success("Cancel course successfully");
      setTimeout(() => {
        router.replace("/my-courses");
      }, 1500);
      setOpenDialog(false);
    } catch (error) {
      toast.warning("Cancel course failed");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ p: 1 }}>
      {/* About teacher */}

      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"start"}
        mb={1}
      >
        <Box>
          <Avatar
            src={registeredCourse?.teacher.avatar.uri}
            sx={{ width: 100, height: 100, mb: 1 }}
          />
          <Link href={"/profile/" + registeredCourse?.teacher._id}>
            <Chip label={registeredCourse?.teacher.username} />
          </Link>
        </Box>

        <Tooltip title="Exit course">
          <Fab size="small" color="error" onClick={() => setOpenDialog(true)}>
            <LogoutIcon />
          </Fab>
        </Tooltip>
      </Stack>
      <Divider />

      <Grid container pt={1} spacing={1}>
        <Grid item md={6} sm={12}>
          <Stack gap={1} alignItems={"start"}>
            <Typography variant="h5">{registeredCourse?.course.name}</Typography>
            <Typography variant="body1">
              Joined time: {dayjs(registeredCourse?.createdAt).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body1">
              Passed lessons: {registeredCourse?.passedLessons.length}
            </Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography variant="body1">Your rating: {registeredCourse?.rating} </Typography>
              <Rating
                value={registeredCourse?.rating}
                max={5}
                precision={0.5}
                onChange={handleRating}
              />
            </Stack>

            <Stack flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"} gap={1}>
              <Tooltip arrow title="Level" sx={{ textTransform: "capitalize" }}>
                <Box>
                  <Chip label={registeredCourse?.course.level} />
                </Box>
              </Tooltip>
              <Tooltip arrow title="Type" sx={{ textTransform: "capitalize" }}>
                <Box>
                  <Chip label={registeredCourse?.course.type} />
                </Box>
              </Tooltip>
              <Tooltip arrow title="Category">
                <Box>
                  <Chip label={registeredCourse?.course.category} />
                </Box>
              </Tooltip>
              <Chip
                label={registeredCourse?.course.members.length + " members"}
                className="bg-gradient"
              />
              <Chip
                label={registeredCourse?.course.lessons.length + " lessons"}
                className="bg-gradient"
              />
            </Stack>

            {/* About lesson */}
            <Typography variant="body1">
              Lastest lesson:
              {registeredCourse?.latestLesson?._id ? (
                <Link href={"/123"}>{registeredCourse?.latestLesson.name}</Link>
              ) : (
                " No lesson"
              )}
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              href={pathName + "/" + registeredCourse?.course.lessons[0]}
              endIcon={<ForwardIcon />}
            >
              Learn
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6} sm={12}>
          <Image
            unoptimized
            src={registeredCourse?.course.thumbnail.uri as string}
            alt="thumbnail"
            width={200}
            height={200}
            style={{ borderRadius: 12, maxWidth: "100%" }}
          />
          <Typography variant="body2" textAlign={"justify"}>
            {registeredCourse?.course.intro}
          </Typography>
        </Grid>
      </Grid>

      {/* Dialog confirm */}
      {openDialog && (
        <MyDialog
          title="Course"
          content={
            "Do you want to cancel course: " +
            registeredCourse?.course.name +
            ". Your data about course will be deleted! You should think again."
          }
          onClose={() => setOpenDialog(false)}
          onSubmit={handleCancel}
        />
      )}
    </Box>
  );
};

export default DetailCourse;
