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
      <>
        <Box>{children}</Box>
      </>
    );
  } else {
    redirect("/sign-in");
  }
};

export default RootLayout;
