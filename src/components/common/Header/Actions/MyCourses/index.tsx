"use client";

import Stack from "@mui/material/Stack";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";

import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import Link from "next/link";
import MyCourse from "@/components/course-components/MyCourse";

export const fetcherMyCourses: Fetcher<IRegisterCourse[], string> = (url: string) =>
  fetch(url).then((res) => res.json());

const MyCourses = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data: listCourses, isLoading } = useSWR("/api/user/my-courses", fetcherMyCourses, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Mine courses */}
      <Tooltip arrow title="My courses">
        <IconButton size="large" color="primary" onClick={handleClick}>
          <LaptopChromebookIcon fontSize="medium" color="action" />
        </IconButton>
      </Tooltip>

      {/* Popover */}
      <Popover
        disableScrollLock
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {isLoading ? (
          <Typography variant="subtitle1">Loading...</Typography>
        ) : (
          <Stack gap={1} p={1} minWidth={350}>
            {listCourses && listCourses.length > 0 ? (
              listCourses?.map((course) => {
                return (
                  <Link
                    key={course._id}
                    href={
                      "/my-courses/" +
                      (course.passedLessons.length > 0
                        ? course._id + "/" + course.passedLessons[course.passedLessons.length - 1]
                        : course._id)
                    }
                  >
                    <MyCourse data={course} direction="row" />
                    <Divider />
                  </Link>
                );
              })
            ) : (
              <Stack
                alignItems={"center"}
                sx={{
                  a: {
                    color: (theme) => theme.palette.info.dark + "!important",
                  },
                }}
              >
                <Typography variant="body1" textAlign={"center"} gutterBottom>
                  No course
                </Typography>
                <Link href={"/search/course"}>Let's explore</Link>
              </Stack>
            )}
          </Stack>
        )}
      </Popover>
    </>
  );
};

export default MyCourses;