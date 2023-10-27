import React from "react";

const RootLayout = ({
  children,
  listQuestions,
}: {
  children: React.ReactNode;
  listQuestions: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {listQuestions}
    </>
  );
};

export default RootLayout;
