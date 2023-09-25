import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (session) {
    return <div>{children}</div>;
  } else {
    console.log("You are not authorize");

    redirect("/sign-in");
  }
};

export default RootLayout;
