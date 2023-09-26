"use client";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { signOut } from "next-auth/react";
const Header = () => {
  return (
    <Box mb={12}>
      <AppBar position="fixed">
        <Toolbar>
          {" "}
          <Button variant="contained" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
