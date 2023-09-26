import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Container from "./_components/Container";
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <Container>{children}</Container>;
};

export default RootLayout;
