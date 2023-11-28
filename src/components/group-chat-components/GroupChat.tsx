"use client";
import { getDistanceTimeToNow } from "@/utils/functions";
import { AvatarGroup, Stack, Tooltip } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { memo } from "react";

type IProps = {
  groupChat: IGroupChat;
  isActive?: boolean;
};

const GroupChatBanner = ({ groupChat, isActive = false }: IProps) => {
  // console.log("groupChat: ", groupChat);

  const { data: session } = useSession();
  const ownerLatestChat = session?._id === groupChat.latestChat?.sender._id;
  return (
    <Paper
      elevation={2}
      component={Link}
      href={"/group-chat/" + groupChat._id}
      className={isActive ? "bg-gradient" : ""}
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
      }}
    >
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
        <Stack flexDirection={"row"} gap={0.5}>
          <Typography variant="body1" component={"span"} fontWeight={500}>
            {ownerLatestChat ? "You: " : groupChat.latestChat?.sender.username + ": "}
          </Typography>
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
              variant="body1"
              sx={{ color: isActive ? "inherit" : grey[500] }}
            >
              {groupChat.latestChat?.message || "No chat"}
            </Typography>
          )}
        </Stack>
      </Box>
      <Typography variant="subtitle2" fontWeight={400}>
        {getDistanceTimeToNow(groupChat.updatedAt)}
      </Typography>
    </Paper>
  );
};

export default memo(GroupChatBanner);
