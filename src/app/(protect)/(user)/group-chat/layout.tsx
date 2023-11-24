import Header from "@/components/common/Header";
import ListGroupChatProvider from "@/providers/ListGroupChatContext";
import { Box, Grid } from "@mui/material";
import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  groupChats: React.ReactNode;
};

const RootLayout = ({ children, groupChats }: IProps) => {
  return (
    <Box height={"100vh"} overflow={"hidden"}>
      <Header />
      <ListGroupChatProvider>
        <Grid container columnSpacing={1} style={{ marginTop: "80px", maxHeight: "100%" }}>
          <Grid
            item
            xs={3}
            sx={{
              height: "90vh",
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
