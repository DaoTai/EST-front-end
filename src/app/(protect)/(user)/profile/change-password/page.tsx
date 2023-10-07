import React from "react";
import Layout from "./_components/ChangePassword";
import { getServerSession } from "next-auth";
import { options } from "@/config/next-auth";
import { redirect } from "next/navigation";
const ChangePasswordPage = async () => {
  const session = await getServerSession(options);

  if (session?.provider) redirect("/");
  return <Layout />;
};

export default ChangePasswordPage;
