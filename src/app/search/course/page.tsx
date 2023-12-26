import React from "react";
import CoursePage from "./_component/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "List courses in EST Edu",
};

const Page = () => {
  return <CoursePage />;
};

export default Page;
