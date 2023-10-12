import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getServerSession } from "next-auth";
import Link from "next/link";
import Banner from "@/components/course-components/Banner";
import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
const getListCourses = async (): Promise<ICourse[] | undefined> => {
  const session = await getServerSession(options);
  const res = await fetch(SERVER_URI + "/courses", {
    headers: {
      Authorization: "Bearer " + session?.accessToken,
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
        <Box
          component={Link}
          href="/teacher/course/create"
          className="btn-link"
          sx={{
            color: "text.primary",
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
      </Box>
      <Stack>
        {listCourses?.map((course) => (
          <Banner key={course._id} course={course} />
        ))}
      </Stack>
    </Container>
  );
};

export default Teacher;
