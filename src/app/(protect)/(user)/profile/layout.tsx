import MainLayout from "@/components/common/MainLayout";
import Spinner from "@/components/custom/Spinner";
import Box from "@mui/material/Box";
import React, { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <MainLayout>
        <Box p={1}>{children}</Box>
      </MainLayout>
    </Suspense>
  );
};

export default RootLayout;
