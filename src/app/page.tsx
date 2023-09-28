import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Footer, Slider } from "@/components/about-components";
import MainLayout from "@/components/common/MainLayout";
import Navbar from "@/components/common/Navbar";
import { Divider } from "@mui/material";

export default function Home() {
  return (
    <MainLayout>
      <Stack flexDirection={"row"} minHeight={"100vh"}>
        <Navbar />
        <Box sx={{ flex: "1 1", bgcolor: "white.main" }}>
          <Divider>
            <Typography variant="h1" gutterBottom>
              EST Edu
            </Typography>
          </Divider>
          <Slider />
          <Footer />
        </Box>
      </Stack>
    </MainLayout>
  );
}
