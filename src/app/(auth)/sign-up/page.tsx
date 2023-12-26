import React from "react";
import SignUp from "./_components/Page";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EST Edu | Sign up",
  description: "Sign up EST Edu",
};
const Page = () => {
  return <SignUp />;
};

export default Page;
