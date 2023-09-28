import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Footer, Slider, AmountInfor } from "@/components/about-components";
import MainLayout from "@/components/common/MainLayout";
import Navbar from "@/components/common/Navbar";
import { Divider } from "@mui/material";

export default function Home() {
  return (
    <MainLayout>
      <Stack flexDirection={"row"} minHeight={"100vh"}>
        <Navbar />
        <Stack gap={2} sx={{ flex: "1 1", bgcolor: "white.main" }}>
          <Divider>
            <Typography gutterBottom variant="h1" fontWeight={700} className="text-gradient">
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
