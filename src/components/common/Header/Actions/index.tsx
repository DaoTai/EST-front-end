"use client";
import MyList from "@/components/custom/MyList";
import FlareIcon from "@mui/icons-material/Flare";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MenuAction from "./MenuAction";
import MyCourse from "@/components/course-components/MyCourse";
import MyCourses from "./MyCourses";

const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"), {
  ssr: false,
});

const Actions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session, status } = useSession();

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

  if (status === "loading") {
    return (
      <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
        <ToggleModeTheme />
      </Stack>
    );
  }

  if (session) {
    return (
      <>
        <Stack flexDirection={"row"} gap={1.5} alignItems={"center"}>
          {!isMobile && <ToggleModeTheme />}

          {/* Self-training */}
          <Link href="/self-training">
            <IconButton>
              <FlareIcon color="success" />
            </IconButton>
          </Link>

          {/* Mine courses */}
          <MyCourses />

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
          disableScrollLock
          open={!!anchorElNotify}
          anchorEl={anchorElNotify}
          onClose={handleCloseNotify}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
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
            <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Typography variant="h6">Notifications</Typography>
              <Chip
                label="Mark all as read"
                variant="outlined"
                color="info"
                clickable
                size="small"
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
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            ".MuiPaper-root": {
              top: "80px !important",
              boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
            },
          }}
        >
          <MenuAction onClose={handleClose} />
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
