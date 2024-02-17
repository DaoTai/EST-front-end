"use client";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import Stack from "@mui/material/Stack";
import Link from "next/link";


const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return <></>
  }

  return (
    <Stack flex={'2 1 auto'} gap={4} flexDirection={'row'} alignItems={'center'} ml={4} sx={{
      color: 'text.primary', a: {
        p: 1,
        fontWeight: 500,
        letterSpacing: 1,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 3,
          borderRadius: 2,
          background: "linear-gradient(to right, #58a9eb, #aa99ff)",
          transform: "scale(0)",
          transition: 'inherit'
        },
        ":hover": {
          opacity: 0.9,
          "&:before": {
            transform: "scale(1)",
          }
        }
      },
    }}>
      <Link href={'#about'}>About</Link>
      <Link href={'#features'}>Features</Link>
      <Link href={'#contact'}>Contact</Link>
    </Stack>
  );
};

export default NavBar;
