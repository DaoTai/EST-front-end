import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import Banner from "@/components/course-components/Banner";
import serverAxios from "@/config/axios";
import { Divider } from "@mui/material";
const getListCourses = async (): Promise<ICourse[] | undefined> => {
  try {
    const res = await serverAxios.get("/courses");
    return res.data;
  } catch (error) {
    notFound();
  }
};

const Teacher = async () => {
  const listCourses = (await getListCourses()) ?? [];

  const numberPendingCourses =
    listCourses?.reduce((acc, course) => {
      return acc + (course.status === "pending" ? 1 : 0);
    }, 0) ?? 0;

  return (
    <Container sx={{ pt: 1, pb: 4 }}>
      <Typography gutterBottom variant="h3" className="underline-gradient" margin={"0 auto"}>
        List courses
      </Typography>
      <Box mt={2}>
        <Typography gutterBottom variant="body1">
          Approved courses: <b>{listCourses.length - numberPendingCourses}</b>
        </Typography>
        <Typography gutterBottom variant="body1">
          Pending courses: <b>{numberPendingCourses}</b>
        </Typography>
        {/* Actions */}
        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            component={Link}
            href="/teacher/course/create"
            className="btn-link"
            sx={{
              color: "#fff !important",
              pl: 2,
              pr: 2,
              borderRadius: 1,
              display: "block",
              bgcolor: "info.main",
              ":hover": {
                bgcolor: "info.light",
              },
            }}
          >
            Create new course
          </Box>
          <Tooltip arrow title="Trashes" placement="right">
            <IconButton
              component={Link}
              href="/teacher/course/trashes"
              color="error"
              sx={{ color: "error.main", border: 1, borderColor: "error.main" }}
            >
              <DeleteSweepIcon color="error" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Stack mt={1} gap={1}>
        {listCourses?.map((course) => (
          <Link
            key={course._id}
            href={"/teacher/course/" + course._id}
            style={{ textDecoration: "none" }}
          >
            <Banner course={course} mode="manager" />
            <Divider />
          </Link>
        ))}
      </Stack>

      {listCourses.length === 0 && (
        <Stack alignItems={"center"}>
          <Typography gutterBottom variant="body1" textAlign={"center"} marginTop={2}>
            You have no course
          </Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            component={Link}
            href="/teacher/course/create"
          >
            Let's create course
          </Typography>
        </Stack>
      )}
    </Container>
  );
};

export default Teacher;
