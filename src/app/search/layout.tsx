import React, { Suspense } from "react";
import Header from "@/components/common/Header";
import MainLayout from "@/components/common/MainLayout";
import { Box } from "@mui/material";
import Spinner from "@/components/custom/Spinner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <Box minHeight={"100vh"} sx={{ bgcolor: "white.main" }}>
        <Suspense fallback={<Spinner />}> {children}</Suspense>
      </Box>
    </MainLayout>
  );
};

export default RootLayout;
