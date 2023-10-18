import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Image from "next/image";
const Banner = ({ course }: { course: ICourse }) => {
  return (
    <Grid
      container
      p={1}
      columnSpacing={1}
      borderBottom={1}
      flexDirection={"row"}
      flexWrap={"wrap"}
      sx={{
        cursor: "pointer",
        img: {
          height: "auto",
          maxHeight: "100%",
          maxWidth: "100%",
          transition: "all linear 0.2s",
        },
        ":hover": {
          img: {
            filter: "opacity(0.9)",
          },
        },
      }}
    >
      <Grid item lg={3} md={3}>
        <Image src={course.thumbnail.uri} alt="thumbnail-course" width={350} height={160} />
      </Grid>
      {/* Content  */}
      <Grid item lg={9} md={9}>
        <Typography variant="h6">{course.name}</Typography>
        <Typography variant="body1">Level: {course.level}</Typography>
        <Typography variant="body1">{course.intro}</Typography>
        <Typography variant="subtitle1">Teacher:{course.createdBy.username}</Typography>
        {/* Rating */}
        <Stack flexDirection={"row"} alignItems={"center"} mb={1} gap={0.75}>
          <Typography variant="body2" fontWeight={600}>
            4.8
          </Typography>
          <Rating name="read-only" value={1} readOnly size="small" />
          <Typography variant="body2">(190.5)</Typography>
        </Stack>
        {course.type === "private" ? (
          <>
            <Chip label="Private" size="small" />
            <Typography variant="subtitle2" mt={1}>
              Open time: 24/10/2023
            </Typography>
            <Typography variant="subtitle2">Close time: 24/10/2023</Typography>
          </>
        ) : (
          <Chip label="Public" size="small" />
        )}
      </Grid>
    </Grid>
  );
};

export default Banner;
