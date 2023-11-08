import MainLayout from "@/components/common/MainLayout";
import Spinner from "@/components/custom/Spinner";
import { options } from "@/config/next-auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "EST Edu | Teacher",
  description: "Teacher Dashboard",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);
  if (!session) return redirect("/sign-in");
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </MainLayout>
  );
};

export default RootLayout;
