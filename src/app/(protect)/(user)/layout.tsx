import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "EST Edu | User",
  description: "User page",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default RootLayout;
