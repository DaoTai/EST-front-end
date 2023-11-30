import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  about: React.ReactNode;
};

const RootLayout = ({ children, about }: IProps) => {
  return (
    <Stack flexDirection={"row"} position={"relative"} component={Paper} elevation={5}>
      <Box
        flex={2}
        sx={{
          height: "100vh",
          overflowY: "overlay",
          pt: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
      </Box>
      <Box position={"absolute"} sx={{ top: 0, right: 0, left: 0, boxShadow: 1, zIndex: 10 }}>
        <Suspense fallback={<p>Loading ...</p>}>{about}</Suspense>
      </Box>
    </Stack>
  );
};

export default RootLayout;
