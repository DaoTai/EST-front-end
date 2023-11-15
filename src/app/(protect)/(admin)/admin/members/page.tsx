import React, { Suspense } from "react";
import Main from "@/components/manage-members-components/Main";
import type { Metadata } from "next";
import Spinner from "@/components/custom/Spinner";
export const metadata: Metadata = {
  title: "Admin | Members",
  description: "Admin manage members",
};

const Members = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
  );
};

export default Members;
