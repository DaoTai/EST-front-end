"use client";
import MainLayout from "@/components/common/MainLayout";
import Box from "@mui/material/Box";
import React, { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <MainLayout>
        <Box p={1}>{children}</Box>
      </MainLayout>
    </Suspense>
  );
};

export default RootLayout;
