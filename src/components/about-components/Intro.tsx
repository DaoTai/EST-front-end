import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Intro = () => {
  return (
    <Box id="features">
      <Divider>
        <Typography variant="h4" gutterBottom fontWeight={600} letterSpacing={1}>
          Features
        </Typography>
      </Divider>
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <Box>

            <Typography fontWeight={600} textAlign={"center"} variant="h6">
              Admin
            </Typography>
            <Box component={"ul"}>
              <li>Manage accounts</li>
              <li>Manage courses</li>
              <li>Manage lessons</li>
              <li>Manage questions</li>
              <li>Manage CVs</li>
              <li>Statistical with charts</li>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight={600} textAlign={"center"} variant="h6">
              Teacher
            </Typography>
            <Box component={"ul"}>
              <li>Manage courses</li>
              <li>Manage lessons</li>
              <li>Manage questions</li>
              <li>Manage members in course</li>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight={600} textAlign={"center"} variant="h6">
              User
            </Typography>
            <Box component={"ul"}>
              <li>Manage profile, password, CV</li>
              <li>Manage notifications</li>
              <li>Manage private courses, lessons, questions</li>
              <li>Manage comments in lesson</li>
              <li>Manage group chat, message, video call</li>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          md={5}
          xs={12}
          sx={{
            video: {
              width: "100%",
              borderRadius: 2,
            },
          }}
        >
          <video
            src="https://firebasestorage.googleapis.com/v0/b/est-edu.appspot.com/o/videos%2Fdemo-latest.mp4?alt=media&token=f8f66d7b-08f5-4e35-8f84-0adac1a2bccc"
            controls
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Intro;
