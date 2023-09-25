import React from "react";
import { getServerSession } from "next-auth";
import Container from "./_components/Container";
import { redirect } from "next/navigation";
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <Container>{children}</Container>;
};

export default RootLayout;
