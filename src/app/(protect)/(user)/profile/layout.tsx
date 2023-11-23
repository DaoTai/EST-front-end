import MainLayout from "@/components/common/MainLayout";
import Spinner from "@/components/custom/Spinner";
import Box from "@mui/material/Box";
import React, { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Box p={1}>{children}</Box>
      </Suspense>
    </MainLayout>
  );
};

export default RootLayout;
