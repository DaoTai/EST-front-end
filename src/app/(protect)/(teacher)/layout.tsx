import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "EST Edu | Teacher",
  description: "Teacher Dashboard",
};


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
