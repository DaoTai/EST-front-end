import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "next/link";
const MenuNavigation = () => {
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
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
          ":hover": {
            bgcolor: "rgba(0,0,0,0.1)",
          },
        },
      }}
    >
      <Box component={Link} href="/profile/edit">
        Edit
      </Box>
      <Box component={Link} href="/profile/change-password">
        Password
      </Box>
      <Box component={Link} href="/profile">
        Blog
      </Box>
    </Stack>
  );
};

export default MenuNavigation;
