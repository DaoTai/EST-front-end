import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PreviewVideo = () => {
  return (
    <Stack
      component={Link}
      href="/"
      flexDirection={"row"}
      gap={1}
      p={1}
      sx={{
        bgcolor: "background.paper",
        textDecoration: "none",
        color: "text.primary",
        transition: "all ease-in 0.2s",
        ":hover": {
          bgcolor: "rgba(0,0,0,0.3)",
        },
        img: {
          borderRadius: 1,
        },
      }}
    >
      <Image src="/intro-3.jpg" alt="thumbnail-video" width={200} height={100} />
      <Box>
        <Typography variant="h6">1. Introduce course ReactJS</Typography>
        <Rating value={4} readOnly />
        <Typography variant="subtitle2">Created at: 12/10/2023</Typography>
      </Box>
    </Stack>
  );
};

export default PreviewVideo;
