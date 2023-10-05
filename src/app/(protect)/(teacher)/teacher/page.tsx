import Banner from "@/components/course-components/Banner";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import React from "react";

const Teacher = () => {
  return (
    <Container>
      <Typography gutterBottom variant="h2" className="underline-gradient" margin={"0 auto"}>
        List courses
      </Typography>
      <Box mt={2}>
        <Typography gutterBottom variant="body1">
          Approved courses: <b>12</b>
        </Typography>
        <Typography gutterBottom variant="body1">
          Pending status courses by admin : <b>12</b>
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
        <Banner />
        <Banner />
        <Banner />
      </Stack>
    </Container>
  );
};

export default Teacher;
