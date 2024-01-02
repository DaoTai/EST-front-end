import ListGroupChatProvider from "@/providers/ListGroupChatContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { Suspense } from "react";
import { Metadata } from "next";

type IProps = {
  children: React.ReactNode;
  groupChats: React.ReactNode;
};

export const metadata: Metadata = {
  title: "EST Edu | Group chat",
  description: "Group chat in EST Edu",
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
            xs={4}
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <Suspense fallback={<p>Loading ...</p>}>{groupChats}</Suspense>
          </Grid>
          <Grid item md={9} xs={8}>
            <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
          </Grid>
        </Grid>
      </ListGroupChatProvider>
    </Box>
  );
};

export default RootLayout;
