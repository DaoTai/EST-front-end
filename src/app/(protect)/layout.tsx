import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/config/next-auth";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);
  console.log("Sesion user: ", session);

  if (session) {
    return <div>{children}</div>;
  } else {
    redirect("/sign-in");
  }
};

export default RootLayout;
