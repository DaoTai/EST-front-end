import MainLayout from "@/components/common/MainLayout";
import { options } from "@/config/next-auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "EST Edu | User",
  description: "User page",
};
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);
  if (!session) return redirect("/sign-in");
  return <>{children}</>;
};

export default RootLayout;
