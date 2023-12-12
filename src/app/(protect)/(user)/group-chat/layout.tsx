import ListGroupChatProvider from "@/providers/ListGroupChatContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
            md={3}
            xs={3}
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <Suspense fallback={<p>Loading ...</p>}>{groupChats}</Suspense>
          </Grid>
          <Grid item md={9} xs={9}>
            <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
          </Grid>
        </Grid>
      </ListGroupChatProvider>
    </Box>
  );
};

export default RootLayout;
