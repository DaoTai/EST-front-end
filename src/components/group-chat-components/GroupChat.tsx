"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { getDistanceTimeToNow } from "@/utils/functions";
import Image from "next/image";

type IProps = {
  groupChat: IGroupChat;
  isActive?: boolean;
};

const GroupChatBanner = ({ groupChat, isActive = false }: IProps) => {
  const { data: session } = useSession();
  const ownerLatestChat = session?._id === groupChat.latestChat?.sender._id;

  const [seen, setSeen] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setSeen(groupChat.latestReadBy.includes(session._id as any));
    }
  }, [session, groupChat]);

  return (
    <Paper
      elevation={2}
      component={Link}
      href={"/group-chat/" + groupChat._id}
      className={isActive ? "bg-gradient" : !seen ? "unseen" : ""}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexWrap: "wrap",
        p: 0.5,
        pl: 1,
        pr: 1,
        justifyContent: "space-between",
        gap: 1,
        border: 0.5,
        overflow: "hidden",
        borderColor: "divider",
        background: (theme) => (isActive ? theme.palette.gradient.main : "initial"),
        "&:hover": {
          bgcolor: "action.hover",
        },

        "&.unseen": {
          background: (theme) => theme.palette.divider,
        },
      }}
    >
      {/* Avatar members */}
      <AvatarGroup
        max={2}
        sx={{
          img: {
            width: 32,
            height: 32,
            borderRadius: 99,
          },
          ".MuiAvatar-root": {
            width: 32,
            height: 32,
            fontSize: 14,
          },
        }}
      >
        <Tooltip arrow placement="top" title="Host">
          {groupChat.host.avatar.uri ? (
            <Image src={groupChat.host.avatar.uri} alt="avatar" width={42} height={42} />
          ) : (
            <Avatar src={groupChat.host.avatar.uri} alt="avatar" />
          )}
        </Tooltip>
        {groupChat.members
          .filter((mem) => mem._id !== groupChat.host._id)
          .map((mem) => (
            <Avatar key={mem._id} sx={{ width: 42, height: 42 }} src={mem.avatar.uri} />
          ))}
      </AvatarGroup>

      {/* Name, latest msg, latest reader */}
      <Box flex={"2 1 0"} display={"flex"} flexDirection={"column"} overflow={"hidden"}>
        <Typography
          gutterBottom
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          variant="body1"
          fontWeight={500}
          lineHeight={1.6}
          sx={{
            borderRadius: 12,
            bgcolor: "rgba(255,255,255,0.3)",
            border: 1,
            borderColor: "divider",
            width: "fit-content",
            pl: 1.5,
            pr: 1.5,
          }}
        >
          {groupChat.name}
        </Typography>

        {/* Latest message */}
        <Stack alignItems={"baseline"}>
          {groupChat.latestChat && (
            <Typography variant="body2" component={"span"} fontWeight={600}>
              {ownerLatestChat ? "You" : groupChat.latestChat?.sender.username}
            </Typography>
          )}
          {groupChat.latestChat?.attachments && groupChat.latestChat?.attachments.length > 0 ? (
            <Typography
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              variant="body2"
              sx={{ color: isActive ? "inherit" : grey[500] }}
            >
              {groupChat.latestChat?.attachments.length + "attachment"}
            </Typography>
          ) : (
            <Typography
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              variant={groupChat.latestChat?.message ? "body2" : "caption"}
              sx={{
                color: isActive ? "inherit" : "text.primary",
                ":is(span)": {
                  color: (theme) => theme.palette.text.secondary,
                },
              }}
            >
              {groupChat.latestChat?.message
                ? groupChat.latestChat?.message
                : "No chat or deleted message"}
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Time distance */}
      <Stack justifyContent={"space-between"} alignItems={"end"}>
        <Typography variant="subtitle2" fontWeight={400}>
          {groupChat.latestChat
            ? getDistanceTimeToNow(groupChat.latestChat.updatedAt)
            : getDistanceTimeToNow(groupChat.updatedAt)}
        </Typography>
        <Typography variant="subtitle2" fontWeight={400}>
          {seen && <CheckCircleIcon fontSize="small" color="success" />}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default memo(GroupChatBanner);
