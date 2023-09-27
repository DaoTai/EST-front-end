"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Actions from "./Actions";
import Logo from "./Logo";
const Header = () => {
  return (
    <AppBar position="fixed" sx={{ mb: 12 }}>
      <Toolbar sx={{ pt: 1, pb: 1 }}>
        <Logo />
        <Actions />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
