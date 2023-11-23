import { getDistanceTimeToNow } from "@/utils/functions";
import { AvatarGroup, Tooltip } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";
import Link from "next/link";
import { memo } from "react";

const GroupChatBanner = ({ groupChat }: { groupChat: IGroupChat }) => {
  return (
    <Paper
      elevation={2}
      component={Link}
      href={"/group-chat/" + groupChat._id}
      sx={{
        display: "flex",
        p: 1,
        justifyContent: "space-between",
        gap: 2,
        border: 0.5,
        borderColor: "divider",
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
      <Box flexGrow={2}>
        <Typography variant="subtitle1">{groupChat.name}</Typography>
        <Typography variant="body1" sx={{ color: grey[500] }}>
          {groupChat.latestChat?.message
            ? groupChat.latestChat.message
            : groupChat.latestChat?.attachments.length > 0
            ? "Sent attachments"
            : "No chat"}
        </Typography>
      </Box>
      <Typography variant="subtitle2" fontWeight={400}>
        {getDistanceTimeToNow(groupChat.updatedAt)}
      </Typography>
    </Paper>
  );
};

export default memo(GroupChatBanner);
