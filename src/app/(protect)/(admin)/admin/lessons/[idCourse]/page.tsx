"use client";

import ListLessons from "@/components/lesson-components/ListLessons";
const ManageLessons = ({ params }: { params: { idCourse: string } }) => {
  return (
    <div>
      <ListLessons idCourse={params.idCourse} preHrefLesson={"/admin/lessons/detail/"} />
    </div>
  );
};

export default ManageLessons;
