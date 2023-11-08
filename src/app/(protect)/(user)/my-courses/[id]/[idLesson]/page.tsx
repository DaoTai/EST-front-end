import DetailLesson from "./_components/DetailLesson";

const DetailLessons = ({ params }: { params: { idLesson: string } }) => {
  return <DetailLesson idLesson={params.idLesson} />;
};

export default DetailLessons;
