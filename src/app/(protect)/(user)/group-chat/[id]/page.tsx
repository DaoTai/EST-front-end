"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import InputBox from "@/components/chat-component/InputBox";
import { convertObjectToFormData, getDistanceTimeToNow } from "@/utils/functions";
type IResponse = {
  listChats: IChat[];
  currentPage: number;
  maxPage: number;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [listChats, setListChats] = useState<IChat[]>([]);
  const frameChatRef = useRef<HTMLDivElement>(null);
  const maxPageRef = useRef<number>(1);
  const currentPageRef = useRef<number>(1);

  useEffect(() => {
    fetchListChats();
  }, [params]);

  // Scroll to latest
  useEffect(() => {
    if (frameChatRef.current) {
      frameChatRef.current.scrollTop = frameChatRef.current.scrollHeight;
      frameChatRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [listChats]);

  // Fetch list chat
  const fetchListChats = () => {
    fetch("/api/user/chat/" + params.id + "?page=1")
      .then((res) => res.json())
      .then((data: IResponse) => {
        console.log("list chats: ", data);

        setListChats(data.listChats);
        maxPageRef.current = data.maxPage;
        currentPageRef.current = data.currentPage;
      })
      .catch((err) => console.log("error: ", err));
  };

  // Send new chat
  const handleSendNewChat = useCallback(
    async (newChat: IFormChat) => {
      try {
        if (newChat.message?.trim()) {
          const formData = convertObjectToFormData(newChat);
          const res = await axios.post("/api/user/chat/" + params.id, formData);
          setListChats((prev) => [...prev, res.data]);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    [session]
  );
  return (
    <Stack pt={2} height={"100%"}>
      {/* List chats in group */}
      <Stack ref={frameChatRef} gap={2} pl={1} pr={1} pb={2} flex={1} overflow={"auto"}>
        {listChats.map((chat, index) => {
          const isMine = chat.sender._id === session?._id;
          return (
            <Stack
              // key={chat._id}
              key={index}
              flexDirection={"row"}
              alignItems={"center"}
              gap={2}
              justifyContent={isMine ? "end" : "start"}
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

                {/* Attachments */}
                {chat.attachments.length > 0 && (
                  <Stack
                    gap={1}
                    mt={1}
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    sx={{
                      img: { borderRadius: 2 },
                    }}
                  >
                    {chat.attachments.map((attachment, i) => {
                      if (attachment.type === "image") {
                        return (
                          <Image
                            key={i}
                            src={attachment.uri}
                            alt="attachment"
                            width={100}
                            height={100}
                          />
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
        })}
      </Stack>

      {/* Box input new chat */}
      <InputBox onSend={handleSendNewChat} />
    </Stack>
  );
};

export default Page;
