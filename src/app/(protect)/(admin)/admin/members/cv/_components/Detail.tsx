import Intro from "@/components/profile-components/Intro";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Image from "next/image";
import { memo } from "react";

const Detail = ({ cv }: { cv: ICv }) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item lg={4} md={12} sm={12}>
        <Box pr={1}>
          <Image
            src={cv.user.avatar.uri}
            width={250}
            height={250}
            alt="avatar"
            style={{ objectFit: "contain", objectPosition: "left" }}
          />
          <Intro user={cv.user} />
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12}>
        <Typography variant="body1">Fullname: {cv.user.fullName}</Typography>
        <Typography variant="body1">Email: {cv.user.email}</Typography>
        <Typography variant="body2" gutterBottom>
          {dayjs(cv.updatedAt).format("MMMM D, YYYY h:mm A")}
        </Typography>
        <Box p={1} border={2} borderColor={"divider"}>
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: cv.content,
            }}
          ></Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(Detail);
