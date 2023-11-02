import Spinner from "@/components/custom/Spinner";
import React, { Suspense } from "react";

const RootLayout = ({
  children,
  lessons,
}: {
  children: React.ReactNode;
  lessons: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<Spinner />}>
      {children}
      {lessons}
    </Suspense>
  );
};

export default RootLayout;
