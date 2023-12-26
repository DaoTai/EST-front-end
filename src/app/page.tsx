import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AmountInfor, Slider } from "@/components/about-components";
import Footer from "@/components/common/Footer";
import MainLayout from "@/components/common/MainLayout";
import Divider from "@mui/material/Divider";

export default function Home() {
  return (
    <MainLayout>
      <Stack flexDirection={"row"} minHeight={"100vh"}>
        {/* <Navbar /> */}
        <Stack gap={2} sx={{ flex: "1 1", bgcolor: "white.main" }}>
          <Divider>
            <Typography gutterBottom variant="h2" fontWeight={700} className="underline-gradient">
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
