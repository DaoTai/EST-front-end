import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AmountInfor, Slider } from "@/components/about-components";
import Footer from "@/components/common/Footer";
import MainLayout from "@/components/common/MainLayout";
import Divider from "@mui/material/Divider";
import { Suspense } from "react";
import Intro from "@/components/about-components/Intro";

export default function Home() {
  return (
    <MainLayout>
      <Stack flexDirection={"row"} minHeight={"100vh"} pl={1}>
        {/* <Navbar /> */}
        <Stack gap={2} sx={{ flex: "1 1" }}>
          <Divider>
            <Typography gutterBottom variant="h3" fontWeight={700} className="underline-gradient">
              EST Edu
            </Typography>
          </Divider>
          <Slider />
          <Suspense fallback={<p>Loading...</p>}>
            <AmountInfor />
          </Suspense>
          <Suspense fallback={<p>Loading...</p>}>
            <Intro />
          </Suspense>
          <Footer />
        </Stack>
      </Stack>
    </MainLayout>
  );
}
