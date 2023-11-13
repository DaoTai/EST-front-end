import Spinner from "@/components/custom/Spinner";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create course",
  description: "Create course",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default Layout;
