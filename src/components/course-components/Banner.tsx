import { Chip, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import "dayjs/plugin/relativeTime";

const Banner = ({ course }: { course: ICourse }) => {
  return (
    <Link href={"/teacher/course/" + course._id} style={{ textDecoration: "none" }}>
      <Grid
        container
        mt={2}
        pb={1}
        spacing={1}
        alignItems={"center"}
        borderRadius={2}
        border={1}
        sx={{
          color: "text.primary",
          transition: "all ease 0.2s",
          ":hover": {
            bgcolor: "rgba(22,24,35,.05)",
          },
        }}
      >
        {/* Thumbnail */}
        <Grid
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          sx={{
            img: {
              borderRadius: 2,
              width: "100%",
            },
          }}
        >
          <Image src={course.thumbnail} alt="course-thumbnail" width={250} height={200} />
        </Grid>
        {/* Information */}
        <Grid item lg={8} md={8} sm={12} xs={12} textTransform={"capitalize"}>
          <Typography variant="h5" gutterBottom>
            {course.name}
          </Typography>
          <Typography variant="subtitle1">
            Status:
            <Chip
              label={course.status.toUpperCase()}
              color={course.status === "approved" ? "success" : "warning"}
              size="small"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="subtitle1">Type: {course.type}</Typography>
          <Typography variant="subtitle1">Category: {course.category}</Typography>
          <Typography variant="subtitle1">Consumer: {course.consumer}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Created time: {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
          </Typography>
          <Stack direction="row" spacing={1} textTransform={"lowercase"}>
            <Chip
              label={course.lessons.length + " lesson" + (course.lessons.length > 1 ? "s" : "")}
              className="bg-gradient"
              size="small"
            />
            <Chip
              label={course.members.length + " member" + (course.members.length > 1 ? "s" : "")}
              className="bg-gradient"
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </Link>
  );
};

export default Banner;
