import MainLayout from "@/components/common/MainLayout";
import Spinner from "@/components/custom/Spinner";
import { options } from "@/config/next-auth";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);
  if (!session) return redirect("/sign-in");
  if (!session?.roles.includes("admin")) {
    return redirect("/");
  }
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Box p={2}>{children}</Box>
      </Suspense>
    </MainLayout>
  );
};

export default RootLayout;
