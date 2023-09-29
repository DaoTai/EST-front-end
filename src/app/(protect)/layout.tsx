import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/config/next-auth";
import MainLayout from "@/components/common/MainLayout";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);

  if (session) {
    return (
      <MainLayout>
        <Box bgcolor="white.main" minHeight="100vh">
          {children}
        </Box>
      </MainLayout>
    );
  } else {
    redirect("/sign-in");
  }
};

export default RootLayout;
