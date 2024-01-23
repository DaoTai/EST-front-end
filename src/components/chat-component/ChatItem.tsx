"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { getDistanceTimeToNow } from "@/utils/functions";
import Delete from "@mui/icons-material/Delete";
import { memo, useMemo, useState } from "react";
import MyDialog from "../custom/Dialog";
import MyList from "../custom/MyList";

type IProps = {
  chat: IChat;
  onDelete: (idChat: string) => Promise<void>;
};

const ChatItem: React.FC<IProps> = ({ chat, onDelete }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<null | HTMLElement>(null);

  const isMine = useMemo(() => {
    return chat.sender._id === session?._id;
  }, [session, chat]);

  const handleOpenOptions = (event: React.MouseEvent<HTMLElement>) => {
    setOpenOptions(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setOpenOptions(null);
  };

  const handleToggleConfirm = () => {
    setOpenConfirm(!openConfirm);
    handleCloseOptions();
  };

  // Delete chat
  const handleDelete = async () => {
    setLoading(true);
    await onDelete(chat._id);
    setLoading(false);
    setOpenConfirm(false);

    handleCloseOptions();
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        ml={isMine ? "auto" : "initial"}
        mr={!isMine ? "auto" : "initial"}
        gap={1}
        maxWidth={"80%"}
      >
        <Avatar
          src={chat.sender.avatar.uri}
          srcSet={chat.sender.avatar.uri}
          sx={{ width: 42, height: 42 }}
        />
        <Box
          borderRadius={2}
          p={1}
          overflow={"hidden"}
          sx={{ bgcolor: (theme) => theme.palette.divider }}
        >
          <Typography variant="body1" fontWeight={500} gutterBottom>
            {chat.sender.username}
          </Typography>
          <Typography variant="body1">{chat.message}</Typography>

          {/* SEO */}
          {chat.seo && (
            <Paper elevation={2} sx={{ p: 1, mt: 1, overflow: "hidden" }}>
              <Link href={chat.seo.href} target="_blank" sx={{ display: "block" }}>
                <Typography variant="body1" gutterBottom>
                  {chat.seo.ogTitle}
                </Typography>
                <img
                  src={chat.seo.ogImage.url}
                  loading="lazy"
                  alt="title seo"
                  style={{
                    objectFit: "contain",
                    objectPosition: "left",
                    width: "100%",
                    height: "100%",
                    maxHeight: "30vh",
                  }}
                />
                <Typography variant="body1">{chat.seo.ogDescription}</Typography>
              </Link>
            </Paper>
          )}

          {/* Attachments */}
          {chat.attachments.length > 0 && (
            <Stack
              gap={1}
              mt={0.5}
              flexDirection={"row"}
              alignItems={"center"}
              sx={{
                img: {
                  borderRadius: 2,
                  width: "100%",
                  bgcolor: (theme) => theme.palette.common.white,
                },
              }}
            >
              {chat.attachments.map((attachment, i) => {
                if (attachment.type === "image") {
                  return (
                    <Box key={i} width={"100%"}>
                      <img
                        src={attachment.uri}
                        alt="attachment"
                        width={200}
                        height={200}
                        style={{ width: "100%" }}
                      />
                    </Box>
                  );
                }
              })}
            </Stack>
          )}

          {/* Distance time */}
          <Typography
            variant="caption"
            width={"100%"}
            display={"block"}
            textAlign={"right"}
            fontWeight={400}
            mt={1}
          >
            {getDistanceTimeToNow(chat.createdAt)}
          </Typography>
        </Box>

        {/* Button delete */}
        {isMine && (
          <Box sx={{ cursor: "pointer" }} onClick={handleOpenOptions}>
            <MoreVertIcon />
          </Box>
        )}
      </Stack>

      <Popover
        disableScrollLock
        open={!!openOptions}
        anchorEl={openOptions}
        onClose={handleCloseOptions}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MyList>
          <ListItem sx={{ gap: 1 }} onClick={handleToggleConfirm}>
            <ListItemText>Delete</ListItemText>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
          </ListItem>
        </MyList>
      </Popover>

      {openConfirm && (
        <MyDialog
          title="Chat"
          content="Do you want to delete this chat? "
          loading={loading}
          onClose={handleToggleConfirm}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default memo(ChatItem);
