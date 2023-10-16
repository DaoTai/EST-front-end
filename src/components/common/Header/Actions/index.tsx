"use client";
import MyList from "@/components/custom/MyList";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"), {
  ssr: false,
});

const Actions = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElNotify, setAnchorElNotify] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNofity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotify(event.currentTarget);
  };

  const handleCloseNotify = () => {
    setAnchorElNotify(null);
  };

  if (session) {
    return (
      <>
        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <ToggleModeTheme />

          {/* Notifycation */}
          <Box onClick={handleClickNofity} mr={1}>
            <Badge
              badgeContent={99}
              color="info"
              sx={{
                ".MuiBadge-badge": {
                  background: (theme) => theme.palette.gradient.main,
                },
              }}
            >
              <NotificationsIcon
                color="action"
                cursor={"pointer"}
                fontSize="large"
                sx={{
                  transition: "all ease-out 0.3s",
                  ":hover": {
                    color: "text.primary",
                  },
                }}
              />
            </Badge>
          </Box>

          {/* User  */}
          <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
            {session?.avatar ? (
              <Image
                src={session?.avatar?.uri as string}
                alt="avatar"
                width={48}
                height={48}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Typography variant="body1" sx={{ color: "text.primary" }}>
                {session?.fullName}
              </Typography>
            )}
          </Box>
        </Stack>

        {/* ========================= */}
        {/* Notifications */}
        <Popover
          open={!!anchorElNotify}
          anchorEl={anchorElNotify}
          onClose={handleCloseNotify}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Paper
            sx={{
              p: 1,
              minWidth: "20vw",
              bgcolor: "background.paper",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Stack gap={4} flexDirection={"row"} justifyContent={"space-between"}>
              <Typography variant="h5">Notifications</Typography>
              <Chip
                label="Mark all as read"
                variant="outlined"
                color="info"
                onClick={handleClick}
              />
            </Stack>
            <MyList>
              <Divider />
              <ListItem divider>
                <ListItemAvatar>
                  <Avatar>
                    <Image
                      src={session?.avatar?.uri as string}
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
              <ListItem divider component={Link} href="/profile">
                <ListItemAvatar>
                  <Avatar>
                    <Image
                      src={session?.avatar?.uri as string}
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>
              <ListItem divider component={Link} href="/profile">
                <ListItemAvatar>
                  <Avatar>
                    <Image
                      src={session?.avatar?.uri as string}
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
            </MyList>
          </Paper>
        </Popover>

        {/* Menu user */}
        <Popover
          disableScrollLock
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            ".MuiPaper-root": {
              top: "80px !important",
              boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
            },
          }}
        >
          <Stack gap={1}>
            {/* Basic info */}
            <Stack gap={3} p={2} pb={0} flexDirection={"row"} alignItems={"center"}>
              <Box>
                {session?.avatar && (
                  <Image
                    src={session?.avatar?.uri as string}
                    alt="avatar"
                    width={54}
                    height={54}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </Box>
              <Stack>
                <Typography variant="h6">{session?.fullName}</Typography>
                <Typography variant="body2" color="GrayText">
                  @{session?.username}
                </Typography>
              </Stack>
            </Stack>

            {/* List action */}
            <MyList sx={{ pb: 0 }}>
              <Divider light />
              <ListItem component={Link} href="/profile" divider>
                Profile
              </ListItem>
              <ListItem divider>
                <ListItemText primary="Sign out" onClick={() => signOut()} />
              </ListItem>
            </MyList>
          </Stack>
        </Popover>
      </>
    );
  }
  return (
    <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
      <ToggleModeTheme />
      <Button variant="contained" onClick={() => signIn()}>
        Sign in
      </Button>
    </Stack>
  );
};

export default Actions;
