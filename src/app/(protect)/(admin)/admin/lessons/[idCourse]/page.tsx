import ListLessons from "@/components/lesson-components/ListLessons";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin | Lessons",
  description: "Admin manage lessons",
};

const ManageLessons = ({ params }: { params: { idCourse: string } }) => {
  return (
    <>
      <ListLessons idCourse={params.idCourse} preHrefLesson={"/admin/lessons/detail/"} />
    </>
  );
};

export default ManageLessons;
