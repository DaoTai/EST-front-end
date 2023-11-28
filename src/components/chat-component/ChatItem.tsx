"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { getDistanceTimeToNow } from "@/utils/functions";

const ChatItem = ({ chat }: { chat: IChat }) => {
  const { data: session } = useSession();

  const isMine = chat.sender._id === session?._id;
  return (
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
    </Stack>
  );
};

export default ChatItem;
