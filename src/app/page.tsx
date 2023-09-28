import Header from "@/components/common/Header";
import MainLayout from "@/components/common/MainLayout";
import Navbar from "@/components/common/Navbar";
import { Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <MainLayout>
      <Stack flexDirection={"row"} minHeight={"100vh"}>
        <Navbar />
        <Paper sx={{ flex: "1 1" }}>
          <Typography variant="h1">EST Edu</Typography>
        </Paper>
      </Stack>
    </MainLayout>
  );
}
