import React from "react";
import Header from "@/components/common/Header";
import MainLayout from "@/components/common/MainLayout";
import { Box } from "@mui/material";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <Box minHeight={"100vh"} sx={{ bgcolor: "white.main" }}>
        {children}
      </Box>
    </MainLayout>
  );
};

export default RootLayout;
