import MainLayout from "@/components/common/MainLayout";
import React from "react";
import Main from "./_component/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EST Edu | Predict jobs",
  description: "Predict suitable jobs in EST Edu",
};

const PredictJobs = () => {
  return (
    <MainLayout>
      <Main />
    </MainLayout>
  );
};

export default PredictJobs;
