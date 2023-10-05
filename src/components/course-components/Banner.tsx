import { Chip, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Banner = () => {
  return (
    <Link href="/teacher/course/123" style={{ textDecoration: "none" }}>
      <Grid
        container
        mt={2}
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
        <Grid
          item
          md={4}
          sx={{
            img: {
              borderRadius: 2,
            },
          }}
        >
          <Image src="/course-thumbnail.jpg" alt="course-thumbnail" width={300} height={150} />
        </Grid>
        <Grid item md={8}>
          <Typography variant="h5" gutterBottom>
            ReactJS Beginner
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Đã tạo cách đây 5 tháng
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status: <b>Pending</b>
          </Typography>

          <Chip label="50 videos" className="bg-gradient" />
        </Grid>
      </Grid>
    </Link>
  );
};

export default Banner;
