import React from "react";
import { Heading, Content } from "../_components";
const DetailProfile = ({ params }: { params: { id: string } }) => {
  return <div>Detail {params.id}</div>;
};

export default DetailProfile;
