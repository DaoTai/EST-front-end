import MainLayout from "@/components/common/MainLayout";
import { options } from "@/config/next-auth";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);

  if (session) {
    return (
      <MainLayout>
        <Box bgcolor="white.main" minHeight="100vh" p={1}>
          {children}
        </Box>
      </MainLayout>
    );
  } else {
    redirect("/sign-in");
  }
};

export default RootLayout;
