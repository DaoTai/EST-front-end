import { getDistanceTimeToNow } from "@/utils/functions";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";
import Link from "next/link";

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
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <Avatar src={groupChat.host.avatar.uri} alt="avatar" sx={{ width: 64, height: 64 }}></Avatar>
      <Box flexGrow={2}>
        <Typography variant="subtitle1">{groupChat.name}</Typography>
        <Typography variant="body1" sx={{ color: grey[500] }}>
          {groupChat.latestChat?.message}
        </Typography>
      </Box>
      <Typography variant="subtitle2" fontWeight={400}>
        {getDistanceTimeToNow(groupChat.updatedAt)}
      </Typography>
    </Paper>
  );
};

export default GroupChatBanner;
