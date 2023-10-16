import { Stack } from "@mui/material";
import React from "react";
import PreviewVideo from "@/components/course-components/PreviewVideo";
const ListVideo = () => {
  return (
    <Stack gap={1} boxShadow={2}>
      <PreviewVideo />
      <PreviewVideo />
      <PreviewVideo />
    </Stack>
  );
};

export default ListVideo;
