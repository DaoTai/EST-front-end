import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import Image from "next/image";
import { memo } from "react";

type Props = {
  course: ICourse;
  mode?: "manager" | "visitor" | "mine";
};

const Banner = ({ course, mode = "visitor" }: Props) => {
  return (
    <Grid
      container
      spacing={1}
      flexDirection={"row"}
      flexWrap={"wrap"}
      border={1}
      borderColor={"divider"}
      overflow={"hidden"}
      sx={{
        color: "text.primary",
        bgcolor: "rgba(255,255,255,0.1)",
        img: {
          width: "100%",
          transition: "all linear 0.2s",
          borderRadius: 2,
        },

        ":hover": {
          "#course__time .MuiChip-root": {
            transform: "scale(1) ",
          },
        },
      }}
    >
      <Grid item lg={3} md={3} xs={12} position={"relative"}>
        <Image
          alt="thumbnail-course"
          src={
            course?.thumbnail ? (course?.thumbnail?.uri as string) : "/default-fallback-image.png"
          }
          width={200}
          height={200}
        />
        <Box
          id="course__time"
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          position={"absolute"}
          top="50%"
          left={"50%"}
          sx={{
            transform: "translate(-50%,-50%) ",
            ".MuiChip-root": {
              transform: "scale(0)",
              transition: "0.3s linear all",
            },
          }}
        >
          <Chip
            className="bg-gradient"
            label={"Created at: " + dayjs(course.createdAt).format("DD/MM/YYYY")}
          />
          <Chip
            className="bg-gradient"
            label={"Updated at: " + dayjs(course.updatedAt).format("DD/MM/YYYY")}
          />
        </Box>
      </Grid>

      {/* Content  */}
      <Grid item lg={9} md={9} xs={12}>
        <Box p={1}>
          <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1} alignItems={"center"}>
            <Typography variant="h6" fontWeight={600}>
              {course.name}
            </Typography>
            <Box display={"flex"} flexWrap={"wrap"} gap={1}>
              <Chip
                label={course.type}
                size="small"
                color={course.type === "public" ? "success" : "info"}
                style={{ textTransform: "capitalize" }}
              />

              {mode === "manager" && (
                <>
                  <Chip
                    label={course.status}
                    color={course.status === "approved" ? "success" : "warning"}
                    size="small"
                  />
                  <Typography variant="subtitle2">
                    {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
                  </Typography>
                </>
              )}
            </Box>
          </Stack>

          <Stack gap={1} mt={1} mb={1} alignItems={"start"}>
            <Tooltip title="Suitable job">
              <Chip label={course.suitableJob} size="small" className="bg-gradient" />
            </Tooltip>
            <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1}>
              {course.programmingLanguages.map((lang, i) => (
                <Chip key={i} label={lang} size="small" color="info" />
              ))}
            </Stack>
          </Stack>

          {mode === "visitor" && (
            <Typography variant="subtitle2">Teacher: {course.createdBy.username}</Typography>
          )}
          <Typography variant="subtitle2" textTransform={"capitalize"}>
            Level: {course.level}
          </Typography>

          {mode === "visitor" && course.type === "private" && (
            <>
              <Typography variant="subtitle2">
                Open time: {dayjs(course.openDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="subtitle2">
                Close time: {dayjs(course.closeDate).format("DD/MM/YYYY")}
              </Typography>
            </>
          )}

          {/* Rating */}
          {course?.averageRating && (
            <>
              <Typography
                variant="body1"
                fontWeight={600}
                textTransform={"lowercase"}
                sx={{ color: "warning.dark" }}
              >
                {course?.averageRating} stars
              </Typography>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                textTransform={"lowercase"}
                gap={1}
              >
                <Rating readOnly value={course?.averageRating} precision={0.5} />
                <Typography variant="subtitle2" fontWeight={400}>
                  {`(${course?.totalRating} rates)`}
                </Typography>
              </Stack>
            </>
          )}

          <Stack mt={1} spacing={1} direction="row" textTransform={"lowercase"}>
            <Chip
              label={((course?.totalLessons || course?.lessons?.length) ?? 0) + " lesson"}
              className="bg-gradient"
              size="small"
            />
            {course?.members && (
              <Chip
                label={
                  course?.members?.length + " member" + (course?.members?.length > 1 ? "s" : "")
                }
                className="bg-gradient"
                size="small"
              />
            )}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(Banner);
