import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const About = ({ course }: { course: ICourse }) => {
  return (
    <Paper>
      <Image
        src={course.thumbnail}
        alt="coure-thumbnail"
        width={300}
        height={150}
        style={{
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          width: "100%",
          minHeight: "30vh",
        }}
      />

      <Stack gap={1} p={1}>
        <Typography variant="h3">{course.name}</Typography>
        <Divider />
        <Chip
          label={course.status.toUpperCase()}
          color={course.status === "approved" ? "success" : "warning"}
          size="small"
          sx={{ width: "fit-content" }}
        />
        <Typography variant="body1">
          <b>Members: </b> {course.members.length}
        </Typography>
        <Typography variant="body1">
          <b>Lessons: </b> {course.lessons.length}
        </Typography>
        <Typography variant="body1">
          <b>Object: </b>
          {course.consumer}
        </Typography>
        <Typography variant="body1">
          <b>Category: </b>
          {course.category}
        </Typography>
        <Typography variant="body1">
          <b>Created time:</b> {dayjs(course.createdAt).format("MMMM D, YYYY h:mm A")}
        </Typography>
        <Typography variant="body1">
          <b>Lastest updated time:</b> {dayjs(course.updatedAt).format("MMMM D, YYYY h:mm A")}
        </Typography>
        <Button
          fullWidth
          component={Link}
          href="/teacher/course/123/edit"
          className="btn-link bg-gradient"
          sx={{ color: "#fff" }}
        >
          Edit
        </Button>
      </Stack>
    </Paper>
  );
};

export default About;
