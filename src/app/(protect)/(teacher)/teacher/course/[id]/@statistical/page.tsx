import React from "react";
import AvgScoreChart from "../_components/AvgScoreChart";

const page = ({ params }: { params: { id: string } }) => {
  return <AvgScoreChart id={params.id} />;
};

export default page;
