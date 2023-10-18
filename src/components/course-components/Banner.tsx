import { Box, Divider, Stack } from "@mui/material";
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
    <Box>
      <Grid
        container
        pt={1}
        pb={1}
        columnSpacing={1}
        flexDirection={"row"}
        flexWrap={"wrap"}
        sx={{
          color: "text.primary",
          cursor: "pointer",
          textTransform: "capitalize",
          img: {
            width: "100%",
            transition: "all linear 0.2s",
            borderRadius: 2,
            boxShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          },
          ":hover": {
            img: {
              filter: "opacity(0.85)",
            },
          },
        }}
      >
        <Grid item lg={3} md={3}>
          <Image alt="thumbnail-course" src={course.thumbnail.uri} width={350} height={230} />
        </Grid>

        {/* Content  */}
        <Grid item lg={9} md={9}>
          <Typography variant="h6" gutterBottom>
            {course.name}
          </Typography>
          <Chip
            label={course.type}
            size="small"
            color={course.type === "public" ? "success" : "info"}
            sx={{ mb: 1 }}
          />
          {mode === "manager" && (
            <>
              <Box mb={1}>
                <Chip
                  label={course.status}
                  color={course.status === "approved" ? "success" : "warning"}
                  size="small"
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Created time: {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
              </Typography>
            </>
          )}

          {mode === "visitor" && (
            <Typography variant="subtitle1" gutterBottom>
              Teacher: <b style={{ marginLeft: 4 }}>{course.createdBy.username}</b>
            </Typography>
          )}

          <Box mb={1}>
            Level: <Chip label={course.level} size="small" />
          </Box>

          {mode === "visitor" && (
            <>
              <Typography variant="subtitle2" mt={1} gutterBottom>
                Open time: {dayjs(course.openDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Close time: {dayjs(course.closeDate).format("DD/MM/YYYY")}
              </Typography>
            </>
          )}

          {/* Rating */}
          {/* <Stack flexDirection={"row"} alignItems={"center"} mb={1} gap={0.75}>
            <Typography variant="body2" fontWeight={600}>
              4.8
            </Typography>
            <Rating name="read-only" value={1} readOnly size="small" />
            <Typography variant="body2">(190.5)</Typography>
          </Stack> */}

          {mode === "manager" && (
            <Stack mt={1} spacing={1} direction="row" textTransform={"lowercase"}>
              <Chip
                label={course.lessons?.length + " lesson" + (course.lessons.length > 1 ? "s" : "")}
                className="bg-gradient"
                size="small"
              />
              <Chip
                label={course.members?.length + " member" + (course.members.length > 1 ? "s" : "")}
                className="bg-gradient"
                size="small"
              />
            </Stack>
          )}
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default memo(Banner);
