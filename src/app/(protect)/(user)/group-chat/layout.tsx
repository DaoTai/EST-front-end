import ListGroupChatProvider from "@/providers/ListGroupChatContext";
import { Box, Grid } from "@mui/material";
import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  groupChats: React.ReactNode;
};

const RootLayout = ({ children, groupChats }: IProps) => {
  return (
    <Box
      sx={{
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <ListGroupChatProvider>
        <Grid container columnSpacing={1}>
          <Grid
            item
            xs={3}
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <Suspense fallback={<p>Loading ...</p>}>{groupChats}</Suspense>
          </Grid>
          <Grid item xs={9}>
            <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
          </Grid>
        </Grid>
      </ListGroupChatProvider>
    </Box>
  );
};

export default RootLayout;
