import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

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
      sx={{
        color: "text.primary",
        textTransform: "capitalize",
        img: {
          width: "100%",
          transition: "all linear 0.2s",
          borderRadius: 2,
          filter: "contrast(110%)",
        },
      }}
    >
      <Grid item lg={3} md={3} xs={12}>
        <Image alt="thumbnail-course" src={course.thumbnail.uri} width={350} height={230} />
      </Grid>

      {/* Content  */}
      <Grid item lg={9} md={9} xs={12}>
        <Box p={1}>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Typography variant="h6" fontWeight={600}>
              {course.name}
            </Typography>
            <Chip
              label={course.type}
              size="small"
              color={course.type === "public" ? "success" : "info"}
            />
          </Stack>

          <Box display={"flex"} gap={1} mt={1} mb={1}>
            <Chip label={course.suitableJob} size="small" color="info" />
            {course.programmingLanguages.map((lang, i) => (
              <Chip key={i} label={lang} size="small" color="info" />
            ))}
          </Box>

          {mode === "manager" && (
            <>
              <Box>
                <Chip
                  label={course.status}
                  color={course.status === "approved" ? "success" : "warning"}
                  size="small"
                />
              </Box>
              <Typography variant="subtitle1">
                Created time: {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
              </Typography>
            </>
          )}

          {mode === "visitor" && (
            <Typography variant="subtitle1">Teacher: {course.createdBy.username}</Typography>
          )}
          <Typography variant="body1">Level: {course.level}</Typography>

          {mode === "visitor" && course.type === "private" && (
            <>
              <Typography variant="subtitle2" mt={1}>
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
            {}
            <Chip
              label={
                String(course?.totalLessons) + " lesson" ||
                String(course?.lessons?.length) + " lesson"
              }
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
