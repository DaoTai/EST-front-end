"use client";
import { getDistanceTimeToNow } from "@/utils/functions";
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
        display: "flex",
        p: 1,
        justifyContent: "space-between",
        gap: 2,
        border: 0.5,
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
      <AvatarGroup max={2}>
        <Tooltip arrow placement="top" title="Host">
          <Avatar src={groupChat.host.avatar.uri} alt="avatar" sx={{ width: 42, height: 42 }} />
        </Tooltip>
        {groupChat.members
          .filter((mem) => mem._id !== groupChat.host._id)
          .map((mem) => (
            <Avatar key={mem._id} sx={{ width: 42, height: 42 }} src={mem.avatar.uri} />
          ))}
      </AvatarGroup>

      {/* Name, latest msg, latest reader */}
      <Box flexGrow={2} display={"block"} overflow={"hidden"}>
        <Typography
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          variant="subtitle1"
          fontWeight={500}
        >
          {groupChat.name}
        </Typography>

        {/* Latest message */}
        <Stack flexDirection={"row"} gap={0.5} alignItems={"baseline"}>
          {groupChat.latestChat && (
            <Typography variant="body1" component={"span"} fontWeight={500}>
              {ownerLatestChat ? "You: " : groupChat.latestChat?.sender.username + ": "}
            </Typography>
          )}
          {groupChat.latestChat?.attachments && groupChat.latestChat?.attachments.length > 0 ? (
            <Typography
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              variant="body1"
              sx={{ color: isActive ? "inherit" : grey[500] }}
            >
              {groupChat.latestChat?.attachments.length + "attachment"}
            </Typography>
          ) : (
            <Typography
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              variant="body2"
              sx={{ color: isActive ? "inherit" : "text.primary" }}
            >
              {groupChat.latestChat?.message
                ? groupChat.latestChat?.message
                : groupChat.latestReadBy.length > 0
                ? "Latest message was deleted"
                : "No chat"}
            </Typography>
          )}
        </Stack>

        {/* Latest read by */}
        {/* {groupChat.latestReadBy.map((member, i) => (
          <Typography variant="subtitle1" key={i}>
            {typeof member === "string" && member}
          </Typography>
        ))} */}
      </Box>

      {/* Time distance */}
      <Stack justifyContent={"space-between"}>
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
