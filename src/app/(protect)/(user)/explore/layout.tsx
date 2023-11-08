import MainLayout from "@/components/common/MainLayout";
import { Box } from "@mui/material";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <Box pt={1}>{children}</Box>
    </MainLayout>
  );
};

export default RootLayout;
