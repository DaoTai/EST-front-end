import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"));

const Actions = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (session) {
    return (
      <>
        <Badge sx={{ ml: "auto" }}>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
              {session?.avatar ? (
                <Image
                  src={session?.avatar as string}
                  alt="avatar"
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                session?.fullName
              )}
            </Box>
          </Stack>
        </Badge>

        {/* Menu */}
        <Popover
          disableScrollLock
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack gap={1} p={2}>
            {/* Basic info */}
            <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
              <Box>
                {session?.avatar ? (
                  <Image
                    src={session?.avatar as string}
                    alt="avatar"
                    width={54}
                    height={54}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  session?.fullName
                )}
              </Box>
              <Stack>
                <Typography variant="h6">{session?.fullName}</Typography>
                <Typography variant="body2" color="GrayText">
                  @{session?.username}
                </Typography>
              </Stack>
              <ToggleModeTheme />
            </Stack>

            {/* List action */}
            <List
              component="nav"
              sx={{
                ".MuiListItem-root": {
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  color: "text.primary",
                  pl: 0.5,
                  pt: 1.5,
                  pb: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.1)",
                  },
                  borderRadius: 1,
                },
              }}
            >
              <Divider light />

              <ListItem component={Link} href="/profile" divider>
                Profile
              </ListItem>
              <ListItem component={Link} href="/profile" divider>
                Profile
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Sign out" onClick={() => signOut()} />
              </ListItem>
            </List>
          </Stack>
        </Popover>
      </>
    );
  }
  return (
    <Stack flexDirection={"row"} alignItems={"center"} gap={1} ml={"auto"}>
      <ToggleModeTheme />
      <Button variant="contained" onClick={() => signIn()}>
        Sign in
      </Button>
    </Stack>
  );
};

export default Actions;
