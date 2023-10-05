import Container from "@mui/material/Container";
import React from "react";
import FormCourse from "../../_components/FormCourse";

const EditCourse = ({ params }: { params: { id: string } }) => {
  return (
    <Container>
      <FormCourse type="edit" />
    </Container>
  );
};

export default EditCourse;
