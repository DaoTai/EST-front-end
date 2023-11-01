import React from "react";

const DetailCourse = ({ params }: { params: { slug: string } }) => {
  return <div>DetailCourse: {params.slug}</div>;
};

export default DetailCourse;
