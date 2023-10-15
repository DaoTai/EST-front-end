import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Banner from "@/components/course-components/Banner";
import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
import { IconButton, Tooltip } from "@mui/material";

const getListCourses = async (): Promise<ICourse[] | undefined> => {
  const session = await getServerSession(options);
  const res = await fetch(SERVER_URI + "/courses", {
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: {
      tags: ["listCourses"],
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
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
              color: "#fff",
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
              size="medium"
              color="info"
              sx={{ border: 1 }}
            >
              <DeleteSweepIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Stack>
        {listCourses?.map((course) => (
          <Banner key={course._id} course={course} />
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
