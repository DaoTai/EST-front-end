import ComputerIcon from "@mui/icons-material/Computer";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import StoreIcon from "@mui/icons-material/Store";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";

const Navbar = () => {
  return (
    <Stack
      p={2}
      spacing={2}
      boxShadow={2}
      flexShrink={0}
      sx={{
        bgcolor: "white.main",
        ".MuiButtonBase-root": {
          position: "relative",
          transition: "all ease 0.2s",
          borderRadius: 2,
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          color: "text.primary",
          "&:hover": {
            color: "text.primary",
            bgcolor: "rgba(0,0,0,0.1)",
          },
        },
      }}
    >
      {/* <IconButton LinkComponent={Link} href="/">
        <HomeIcon fontSize="large" />
        <Typography variant="subtitle1">About</Typography>
      </IconButton> */}
      <IconButton LinkComponent={Link} href="/teacher">
        <ModelTrainingIcon fontSize="large" />
        <Typography variant="subtitle1">Teacher</Typography>
      </IconButton>
      <IconButton LinkComponent={Link} href="/profile">
        <SchoolIcon fontSize="large" />
        <Typography variant="subtitle1">Mine</Typography>
      </IconButton>
      <IconButton LinkComponent={Link} href="/profile">
        <StoreIcon fontSize="large" />
        <Typography variant="subtitle1">Courses</Typography>
      </IconButton>
      <IconButton LinkComponent={Link} href="/explore">
        <GroupsIcon fontSize="large" />
        <Typography variant="subtitle1">Members</Typography>
      </IconButton>
    </Stack>
  );
};

export default Navbar;
