import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <Paper>
      <Image
        src="/intro-1.jpg"
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
        <Typography variant="h3">
          ReactJS
          <Divider />
        </Typography>
        <Typography variant="body1">
          Type: <b>Public</b>
        </Typography>
        <Typography variant="body1">
          Started from <b>24/10/2023</b>
        </Typography>
        <Typography variant="body1">
          Course has <b>300</b> user
        </Typography>
        <Typography variant="body1">
          Object: <b>Beginner</b>
        </Typography>
        <Typography variant="body1">
          Category: <b>Web programming</b>
        </Typography>
        <Box
          component={Link}
          href="/teacher/course/123/edit"
          className="btn-link"
          sx={{ bgcolor: "info.main" }}
        >
          Edit
        </Box>
      </Stack>
    </Paper>
  );
};

export default About;
