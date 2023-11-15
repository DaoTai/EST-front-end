import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import type { Metadata } from "next";
import { Suspense } from "react";
import Content from "@/components/cv-components/Content";
import Rules from "@/components/cv-components/Rules";
export const metadata: Metadata = {
  title: "Profile | CV",
  description: "Entroll roles with CV",
};

const CreateCV = () => {
  return (
    <Container>
      <Divider>
        <Typography variant="h4" letterSpacing={2} fontWeight={600} gutterBottom>
          CV
        </Typography>
      </Divider>
      <Suspense fallback="Loading ...">
        <Rules />
      </Suspense>

      <Suspense fallback="Loading...">
        <Content />
      </Suspense>
    </Container>
  );
};

export default CreateCV;
