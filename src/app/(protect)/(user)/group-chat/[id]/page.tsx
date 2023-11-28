"use client";

import Stack from "@mui/material/Stack";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import InputBox from "@/components/chat-component/InputBox";
import { convertObjectToFormData } from "@/utils/functions";
import ChatItem from "@/components/chat-component/ChatItem";
import { Box, Typography } from "@mui/material";
type IResponse = {
  listChats: IChat[];
  page: number;
  maxPage: number;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [listChats, setListChats] = useState<IChat[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(1);
  const frameChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchListChats();
  }, [params]);

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

  // Send new chat
  const handleSendNewChat = useCallback(
    async (payload: IFormChat) => {
      try {
        if (payload.message?.trim()) {
          const formData = convertObjectToFormData(payload);
          const res = await axios.post("/api/user/chat/" + params.id, formData);
          const newChat = res.data;
          setListChats((prev) => [newChat, ...prev]);
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
    <Stack pt={2} height={"100%"}>
      <Stack
        ref={frameChatRef}
        id="scrollableDiv"
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
    </Stack>
  );
};

export default Page;
