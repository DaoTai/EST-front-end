"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import MyList from "@/components/custom/MyList";
import { getDistanceTimeToNow } from "@/utils/functions";
import { Button, ListItem, ListItemIcon, ListItemText, TextField, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { KeyedMutator } from "swr";
import { IResponseFetchComments } from "./ListComments";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface IProps {
  idLesson: string;
  comment: ILessonComment;
  mutate: KeyedMutator<IResponseFetchComments[]>;
}
const Comment = ({ idLesson, comment, mutate }: IProps) => {
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

  const handleEdit = async () => {
    const value = content.trim();
    const idComment = comment._id;
    if (value) {
      try {
        await axios.patch(`/api/user/my-lessons/${idLesson}/comments/${idComment}`, {
          content: value,
        });
        mutate();
        toggleEnableEdit();
      } catch (error) {
        toast.error("Edit comment failed");
      }
    }
  };

  const handleDelete = async () => {
    const idComment = comment._id;
    try {
      await axios.delete(`/api/user/my-lessons/${idLesson}/comments/${idComment}`);
      mutate();
      setAnchorEl(null);
    } catch (error) {
      toast.error("Delete comment failed");
    }
  };

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
                  padding: "4px 16px",
                  fontWeight: 400,
                  borderRadius: 12,
                  fontSize: (theme) => theme.typography.fontSize,
                },
              }}
            >
              <Button variant="text" onClick={toggleEnableEdit}>
                Cancel
              </Button>
              <Button variant="contained" disabled={!content.trim()} onClick={handleEdit}>
                Edit
              </Button>
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
              <Typography gutterBottom variant="body1" component={"pre"}>
                {comment.content}
              </Typography>
              <Typography gutterBottom variant="subtitle2" color={"GrayText"}>
                {comment.createdAt === comment.updatedAt ? (
                  getDistanceTimeToNow(comment.createdAt)
                ) : (
                  <Tooltip
                    arrow
                    placement="right-end"
                    title={"Updated at " + dayjs(comment.updatedAt).format("MMM D, YYYY h:mm A")}
                  >
                    <span>{getDistanceTimeToNow(comment.createdAt)}</span>
                  </Tooltip>
                )}
              </Typography>
            </Box>
            {/* Options */}
            {comment.user._id === session?._id && (
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
            )}
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
          <>
            <ListItem onClick={handleDelete}>
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
        </MyList>
      </Popover>
    </>
  );
};

export default Comment;
