import Container from "@mui/material/Container";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/config/next-auth";
const RootLayout = async ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  const session = await getServerSession(options);

  return (
    <>
      {children}
      {!session?.provider && modal}
    </>
  );
};

export default RootLayout;
