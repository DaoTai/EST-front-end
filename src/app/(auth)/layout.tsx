import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
const Container = dynamic(() => import("./_components/Container"), { ssr: false });

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <Container>{children}</Container>;
};

export default RootLayout;
