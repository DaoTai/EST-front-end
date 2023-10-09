import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack justifyContent="center" alignItems={"center"}>
      <Typography variant="h2" textAlign="center" className="underline-gradient" gutterBottom>
        User not found
      </Typography>
      <Link href="/" className="btn-link bg-gradient">
        Return Home
      </Link>
    </Stack>
  );
}
