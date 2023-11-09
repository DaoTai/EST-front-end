"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PushPinIcon from "@mui/icons-material/PushPin";

import MyList from "@/components/custom/MyList";
import { getDistanceTimeToNow } from "@/utils/functions";
import { Button, ListItem, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useSession } from "next-auth/react";

const Comment = ({ comment }: { comment: ILessonComment }) => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>(comment.content);

  const handleShowOptions = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const toggleEnableEdit = () => {
    setEnableEdit(!enableEdit);
    setAnchorEl(null);
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <>
      <Stack flexDirection={"row"} gap={2} alignItems={"start"}>
        <Avatar
          component={Link}
          href={"/profile/" + comment.user._id}
          src={comment.user.avatar.uri}
          alt="avatar"
        />
        {/* Main content */}
        {enableEdit ? (
          <Box flexGrow={2}>
            <TextField
              fullWidth
              multiline
              spellCheck={false}
              placeholder="Edit comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Stack
              mt={1}
              gap={2}
              flexDirection={"row"}
              justifyContent={"end"}
              sx={{
                button: {
                  pt: 0.5,
                  pb: 0.5,
                  pr: 2,
                  pl: 2,
                  fontWeight: 400,
                  borderRadius: 12,
                },
              }}
            >
              <Button variant="text" onClick={toggleEnableEdit}>
                Cancel
              </Button>
              <Button variant="contained">Edit</Button>
            </Stack>
          </Box>
        ) : (
          <>
            <Box>
              <Typography
                gutterBottom
                component={Link}
                href={"/profile/" + comment.user._id}
                variant="body1"
                fontWeight={500}
              >
                {comment.user.username}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {comment.content}
              </Typography>
              <Typography variant="subtitle2" gutterBottom color={"GrayText"}>
                {getDistanceTimeToNow(comment.createdAt)}
              </Typography>
            </Box>
            {/* Options */}
            <Box
              component={"span"}
              sx={{
                height: "fit-content",
                cursor: "pointer",
                ":hover": {
                  opacity: 0.8,
                },
              }}
              onClick={handleShowOptions}
            >
              <MoreHorizIcon />
            </Box>
          </>
        )}
      </Stack>

      {/* Options  */}
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleCloseOptions}
      >
        <MyList
          sx={{
            li: {
              pl: 0.5,
              pt: 0.5,
              gap: 2,
            },
          }}
        >
          {comment.user._id === session?._id && (
            <>
              <ListItem>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </ListItem>
              <ListItem onClick={toggleEnableEdit}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </ListItem>
            </>
          )}
        </MyList>
      </Popover>
    </>
  );
};

export default Comment;
