import React from "react";
import Header from "@/components/common/Header";
import MainLayout from "@/components/common/MainLayout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default RootLayout;
