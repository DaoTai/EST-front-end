import React from "react";
import SignIn from "./_component/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EST Edu | Sign in ",
  description: "Sign in EST Edu",
};

const Page = () => {
  return <SignIn />;
};

export default Page;
