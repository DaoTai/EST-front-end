import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"} className="bg-gradient">
      <Typography variant="h2" gutterBottom textAlign={"center"}>
        Page not found {":("}
      </Typography>
      <Link href="/" className="btn-link">
        {" "}
        Home
      </Link>
    </Stack>
  );
}
