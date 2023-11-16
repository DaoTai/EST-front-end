import DetailLesson from "./_components/DetailLesson";

const DetailLessons = ({ params }: { params: { idLesson: string; id: string } }) => {
  return <DetailLesson idLesson={params.idLesson} idCourse={params.id} />;
};

export default DetailLessons;
