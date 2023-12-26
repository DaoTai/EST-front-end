import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Spinner from "@/components/custom/Spinner";
const Container = dynamic(() => import("./_components/Container"), { ssr: false });

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <Container>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </Container>
  );
};

export default RootLayout;
