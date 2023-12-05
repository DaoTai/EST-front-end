"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { getDistanceTimeToNow } from "@/utils/functions";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { memo, useMemo, useState } from "react";
import MyDialog from "../custom/Dialog";

type IProps = {
  chat: IChat;
  onDelete: (idChat: string) => Promise<void>;
};

const ChatItem: React.FC<IProps> = ({ chat, onDelete }) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    await onDelete(chat._id);
    setOpen(false);
  };

  const isMine = useMemo(() => {
    return chat.sender._id === session?._id;
  }, [session, chat]);

  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
        ml={isMine ? "auto" : "initial"}
        mr={!isMine ? "auto" : "initial"}
        maxWidth={"80%"}
      >
        <Avatar
          src={chat.sender.avatar.uri}
          srcSet={chat.sender.avatar.uri}
          sx={{ width: 42, height: 42 }}
        />
        <Box borderRadius={2} p={1} sx={{ bgcolor: (theme) => theme.palette.divider }}>
          <Typography variant="body1" fontWeight={500} gutterBottom>
            {chat.sender.username}
          </Typography>
          <Typography variant="body1">{chat.message}</Typography>

          {/* SEO */}
          {chat.seo && (
            <Paper elevation={2} sx={{ p: 1, mt: 1 }}>
              <Link href={chat.seo.href} target="_blank" sx={{ display: "block" }}>
                <Typography variant="body1" gutterBottom>
                  {chat.seo.ogTitle}
                </Typography>
                <img
                  src={chat.seo.ogImage.url}
                  alt="title seo"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
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
                      <Image
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
          <IconButton color="error" onClick={() => setOpen(true)}>
            <Delete />
          </IconButton>
        )}
      </Stack>

      {open && (
        <MyDialog
          content="Do you want to delete this chat? "
          onClose={() => setOpen(false)}
          title="Chat"
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default memo(ChatItem);
