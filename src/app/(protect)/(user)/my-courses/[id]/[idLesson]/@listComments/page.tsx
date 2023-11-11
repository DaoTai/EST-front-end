import BoxComments from "@/components/comment-components/BoxComment";
import React from "react";
const WrapperComments = ({ params }: { params: { idLesson: string; id: string } }) => {
  return <BoxComments idLesson={params.idLesson} />;
};

export default WrapperComments;
