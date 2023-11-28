"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { convertObjectToFormData } from "@/utils/functions";
import InputBox from "@/components/chat-component/InputBox";
import ChatItem from "@/components/chat-component/ChatItem";
import useListGroupChatContext from "@/hooks/useListGroupChatContext";
type IResponse = {
  listChats: IChat[];
  page: number;
  maxPage: number;
};

const GroupChat = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const { handleJoinGroup, socket } = useListGroupChatContext();

  const [listChats, setListChats] = useState<IChat[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(1);
  const frameChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchListChats();
  }, [params]);

  useEffect(() => {
    session && handleJoinGroup({ newGroupId: params.id });
  }, [session]);

  useEffect(() => {
    socket?.on("receive chat", (newChat: IChat) => {
      handleAddNewChat(newChat);
    });
    return () => {
      socket?.emit("leave group", params.id);
    };
  }, [socket]);

  const scrollLatestChat = () => {
    if (frameChatRef.current) {
      frameChatRef.current.scrollTop = frameChatRef.current.scrollHeight;
    }
  };

  // Fetch list chat
  const fetchListChats = () => {
    const idGroupChat = params.id;
    const uri = `/api/user/chat/${idGroupChat}?page=${page}`;
    fetch(uri)
      .then((res) => res.json())
      .then((data: IResponse) => {
        const { listChats, maxPage, page: currentPage } = data;
        setListChats((prev) => [...prev, ...listChats]);

        listChats.length === 0 && setHasMore(false);
        // Nếu là trang cuối cùng
        if (maxPage === currentPage) {
          setHasMore(false);
        } else {
          setPage(currentPage + 1);
        }
      })
      .catch((err) => console.log("error: ", err));
  };

  // Add new chat
  const handleAddNewChat = (newChat: IChat) => {
    setListChats((prev) => [newChat, ...prev]);
  };

  // Send new chat
  const handleSendNewChat = useCallback(
    async (payload: IFormChat) => {
      const idGroup = params.id;
      try {
        if (payload.message?.trim()) {
          const formData = convertObjectToFormData(payload);
          const res = await axios.post("/api/user/chat/" + idGroup, formData);
          const newChat = res.data;
          handleAddNewChat(newChat);

          // Emit event to socket
          socket?.emit("send chat", {
            idGroup,
            chat: newChat,
          });
          scrollLatestChat();
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    [session]
  );

  const fetchMoreData = () => {
    fetchListChats();
  };

  return (
    <Box height={"100%"}>
      <Stack
        ref={frameChatRef}
        id="scrollableDiv"
        p={1}
        pb={2}
        style={{
          flex: "1 1 auto",
          height: "100%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <InfiniteScroll
          dataLength={listChats.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Typography variant="subtitle2" textAlign={"center"}>
              Loading...
            </Typography>
          }
          endMessage={
            <Typography variant="subtitle2" textAlign={"center"} fontWeight={600}>
              Yay! You have seen it all
            </Typography>
          }
          style={{ display: "flex", flexDirection: "column-reverse", gap: 8 }} //To put endMessage and loader to the top.
          inverse={true} //
          scrollableTarget="scrollableDiv"
        >
          {listChats.map((chat, index) => {
            return <ChatItem key={index} chat={chat} />;
          })}
        </InfiniteScroll>
      </Stack>

      {/* Box input new chat */}
      <InputBox onSend={handleSendNewChat} />
    </Box>
  );
};

export default GroupChat;
