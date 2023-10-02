"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AmountInfor, Footer, Slider } from "@/components/about-components";
import MainLayout from "@/components/common/MainLayout";
import Navbar from "@/components/common/Navbar";
import useTheme from "@mui/material/styles/useTheme";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainLayout>
      <Stack flexDirection={"row"} minHeight={"100vh"}>
        {!isMobile && <Navbar />}
        <Stack gap={2} sx={{ flex: "1 1", bgcolor: "white.main" }}>
          <Divider>
            <Typography gutterBottom variant="h1" fontWeight={700} className="underline-gradient">
              EST Edu
            </Typography>
          </Divider>
          <Slider />
          <AmountInfor />
          <Footer />
        </Stack>
      </Stack>
    </MainLayout>
  );
}
