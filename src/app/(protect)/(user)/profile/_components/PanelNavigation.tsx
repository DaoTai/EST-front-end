import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/config/next-auth";
const MenuNavigation = async () => {
  const session = await getServerSession(options);
  return (
    <Stack
      flexDirection={"row"}
      mt={2}
      pb={1}
      pt={1}
      sx={{
        a: {
          display: "block",
          p: 2,
          pt: 1,
          pb: 1,
          borderRadius: 1,
          border: 1,
          borderColor: "white.main",
          bgcolor: "rgba(0,0,0,0.1)",
          ":hover": {
            bgcolor: "mainBlue.main",
          },
        },
      }}
    >
      <Box component={Link} href="/profile/edit">
        Edit
      </Box>
      {!session?.provider && (
        <Box component={Link} href="/profile/change-password">
          Password
        </Box>
      )}
      <Box component={Link} href="/profile">
        Blog
      </Box>
    </Stack>
  );
};

export default MenuNavigation;
