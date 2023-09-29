import ComputerIcon from "@mui/icons-material/Computer";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Link from "next/link";

const Navbar = () => {
  return (
    <Stack
      p={1}
      spacing={2}
      boxShadow={2}
      flexShrink={0}
      sx={{
        bgcolor: "white.main",
        ".MuiButtonBase-root": {
          position: "relative",
          transition: "all ease 0.2s",
          borderRadius: 2,
          display: "block",
          color: "text.primary",
          "&:hover": {
            color: "text.primary",
            bgcolor: "rgba(0,0,0,0.1)",
          },
        },
      }}
    >
      <IconButton LinkComponent={Link} href="/">
        <HomeIcon fontSize="large" />
        <Typography variant="subtitle1">About</Typography>
      </IconButton>
      <IconButton LinkComponent={Link} href="/profile">
        <ComputerIcon fontSize="large" />
        <Typography variant="subtitle1">My courses</Typography>
      </IconButton>
      <IconButton LinkComponent={Link} href="/profile">
        <StoreIcon fontSize="large" />
        <Typography variant="subtitle1">Courses</Typography>
      </IconButton>
    </Stack>
  );
};

export default Navbar;
