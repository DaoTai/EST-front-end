import Spinner from "@/components/custom/Spinner";
import React, { Suspense } from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin | Courses",
  description: "Admin manage courses",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default Layout;
