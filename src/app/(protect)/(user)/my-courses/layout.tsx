import Spinner from "@/components/custom/Spinner";
import React, { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default RootLayout;
