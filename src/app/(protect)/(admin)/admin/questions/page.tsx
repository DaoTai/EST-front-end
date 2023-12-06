import React from "react";
import type { Metadata } from "next";
import Questions from "./_component/Main";

export const metadata: Metadata = {
  title: "Admin | Questions",
  description: "EST Edu Admin dashboard",
};

const PageQuestions = () => {
  return <Questions />;
};

export default PageQuestions;
