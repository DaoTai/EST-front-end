import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const AboutCourse = ({ course }: { course: ICourse }) => {
  return (
    <Paper>
      <Image
        src={course?.thumbnail ? (course?.thumbnail?.uri as string) : "/default-fallback-image.png"}
        alt="coure-thumbnail"
        width={300}
        height={150}
        style={{
          height: "100%",
          maxHeight: "30vh",
          width: "100%",
        }}
      />

      <Stack gap={0.75} p={1}>
        <Typography variant="h5" fontWeight={500}>
          {course.name}
        </Typography>
        <Chip
          label={course.status.toUpperCase()}
          color={course.status === "approved" ? "success" : "warning"}
          size="small"
          sx={{ width: "fit-content" }}
        />
        <Typography variant="body1">
          <b>Members: </b> {course?.members?.length}
        </Typography>
        <Typography variant="body1">
          <b>Lessons: </b> {course?.totalLessons}
        </Typography>
        <Typography variant="body1" textTransform={"capitalize"}>
          <b>Level: </b>
          {course.level}
        </Typography>
        <Typography variant="body1">
          <b>Suitable job: </b>
          {course.suitableJob}
        </Typography>
        <Typography variant="body1">
          <b>Created time:</b> {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
        </Typography>
        <Typography variant="body1">
          <b>Updated time:</b> {dayjs(course.updatedAt).format("MMMM D, YYYY h:mm A")}
        </Typography>

        <Link
          href={`/teacher/course/${course._id}/edit`}
          className="btn-link bg-gradient"
          style={{ width: "100%", textAlign: "center" }}
        >
          Edit
        </Link>
      </Stack>
    </Paper>
  );
};

export default AboutCourse;
