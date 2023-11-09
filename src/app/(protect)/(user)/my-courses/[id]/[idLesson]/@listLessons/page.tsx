import React from "react";
import dynamic from "next/dynamic";

const ListLessons = dynamic(() => import("../_components/ListLessons"), {
  ssr: false,
});

const ListLessonsWrapper = () => {
  return <ListLessons />;
};

export default ListLessonsWrapper;
