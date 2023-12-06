import React, { Suspense } from "react";

type IProps = {
  children: React.ReactNode;
  statistical: React.ReactNode;
};

const RootLayout: React.FC<IProps> = ({ children, statistical }) => {
  return (
    <>
      <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
      <Suspense fallback={<p>Loading chart...</p>}>{statistical}</Suspense>
    </>
  );
};

export default RootLayout;
