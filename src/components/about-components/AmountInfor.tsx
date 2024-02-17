import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { BACK_END_URI } from "@/utils/constants/common";

type IResponse = {
  totalUsers: number;
  totalTeachers: number;
  totalCourses: number;
  totalProgrammingLanguages: number;
};

const AmountInfor = async () => {
  const res = await fetch(BACK_END_URI + "/overview-infor");
  if (!res.ok) {
    return <Typography textAlign={"center"}>Having issues</Typography>;
  }
  const data = (await res.json()) as IResponse;

  return (
    <Box>
      <Divider>
        <Typography id="about" variant="h4" fontWeight={600} letterSpacing={1} gutterBottom>
          About
        </Typography>
      </Divider>
      <Grid
        container
        spacing={1}
        sx={{
          ".MuiCardContent-root": {
            position: "relative",
          },
          ".btn": {
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "block",
            padding: "8px 16px",
            borderRadius: 2,
            color: "#fff",
            textDecoration: "none",
            width: "fit-content",
            mt: "auto",
            "&:hover": {
              opacity: 0.8,
            },
          },
        }}
      >
        <Grid item md={6} sm={6} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Box pb={4}>
                <Typography variant="h5" textAlign={'center'} gutterBottom fontWeight={600}>
                  Member
                </Typography>
                <Typography variant="h6">We have {data.totalUsers} members</Typography>
              </Box>
              <Link href="/explore/members" className="btn bg-gradient">
                Watch
              </Link>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Box pb={4}>
                <Typography variant="h5" textAlign={'center'} gutterBottom fontWeight={600}>
                  Teacher
                </Typography>
                <Typography variant="h6">We have {data.totalTeachers} teachers</Typography>
              </Box>
              <Link href="/explore/members" className="btn bg-gradient">
                Watch
              </Link>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Box pb={4}>
                <Typography variant="h5" textAlign={'center'} gutterBottom fontWeight={600}>
                  Course
                </Typography>
                <Typography variant="h6">We have {data.totalCourses} courses</Typography>
              </Box>
              <Link href="/search/course" className="btn bg-gradient">
                Watch
              </Link>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Box pb={4}>
                <Typography variant="h5" textAlign={'center'} gutterBottom fontWeight={600}>
                  Technology
                </Typography>
                <Typography variant="h6">
                  Courses have {data.totalProgrammingLanguages} technologies
                </Typography>
              </Box>
              <Link href="/search/course" className="btn bg-gradient">
                Watch
              </Link>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Box>

  );
};

export default AmountInfor;
