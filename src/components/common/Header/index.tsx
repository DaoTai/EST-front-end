import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import Actions from "./Actions";
import Logo from "./Logo";
import Title from "./Title";
import NavBar from "./NavBar";
const Header = () => {
  return (
    <AppBar position="fixed" sx={{ height: 80, p: "unset !important" }}>
      <Toolbar
        sx={{
          height: "100%",
          pt: 1,
          pb: 1,
          bgcolor: "white.main",
          justifyContent: "space-between",
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Logo />
          <Title />
        </Stack>

        <NavBar />

        <Actions />
      </Toolbar>
    </AppBar >
  );
};

export default Header;
