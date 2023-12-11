"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

import ChatItem from "@/components/chat-component/ChatItem";
import InputBox from "@/components/chat-component/InputBox";
import useListGroupChatContext from "@/hooks/useListGroupChatContext";
import chatService from "@/services/chat";
import { convertObjectToFormData, showErrorToast } from "@/utils/functions";

type IResponse = {
  listChats: IChat[];
  page: number;
  maxPage: number;
};

const GroupChat = ({ params }: { params: { id: string } }) => {
  const { socket, revalidate, updateLatestMessage, listGroupChats, appendToLatestRead } =
    useListGroupChatContext();

  const { data: session } = useSession();
  const [listChats, setListChats] = useState<IChat[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(1);
  const frameChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchListChats();
  }, [params]);

  useEffect(() => {
    if (session) {
      socket?.on("receive chat", async (newChat: IChat) => {
        if (newChat.idGroupChat === params.id && newChat.sender._id !== session?._id) {
          handleAddNewChat(newChat);
          // call api update latest reader
          await axios.patch(`/api/user/group-chat/${params.id}/seen`);
        }
      });
      appendToLatestRead(params.id);
    }
  }, [session, listGroupChats]);

  const scrollLatestChat = () => {
    if (frameChatRef.current) {
      frameChatRef.current.scrollTop = frameChatRef.current.scrollHeight;
    }
  };

  // Fetch list chat
  const fetchListChats = () => {
    const idGroupChat = params.id;
    const uri = `/api/user/chat/${idGroupChat}?page=${page}`;
    axios
      .get(uri)
      .then((res) => {
        const { listChats: newData, maxPage, page: currentPage } = res.data as IResponse;
        // Lấy ra các unique chat
        //  Trường hợp xảy ra trùng chat khi đoạn chat mới tạo trùng với đoạn chat được scroll mới nhất
        const newListChats = [...listChats, ...newData].reduce((acc: IChat[], chat) => {
          const exist = acc.find((item) => item._id === chat._id);
          if (!exist) {
            acc.push(chat);
          }
          return acc;
        }, []);

        setListChats(newListChats);
        // Nếu là trang cuối cùng hoặc không có đoạn chat nào
        if (maxPage === currentPage || newData.length === 0) {
          setHasMore(false);
        } else {
          setPage(currentPage + 1);
        }
      })
      .catch((err) => console.log("error: ", err));
  };

  // Add new chat
  const handleAddNewChat = (newChat: IChat) => {
    setListChats((prev) => {
      const listChatIds = prev.map((chat) => chat._id);
      const isExist = listChatIds.includes(newChat._id);

      return isExist ? prev : [newChat, ...prev];
    });
    updateLatestMessage(newChat);
  };

  // Send new chat
  const handleSendNewChat = async (payload: IFormChat) => {
    const idGroup = params.id;
    try {
      if (payload.message?.trim() || payload.images) {
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
  };

  // Fetch more data
  const fetchMoreData = () => {
    hasMore && fetchListChats();
  };

  // Delete chat
  const handleDeleteChat = useCallback(
    async (idChat: string) => {
      try {
        await chatService.deleteChat(idChat);
        setListChats((prev) => [...prev].filter((chat) => chat._id !== idChat));
        // If deleted chat is latest chat will revalidate group chat to update latest message
        const currentGroupChat = listGroupChats.find((groupChat) => groupChat._id === params.id);
        const istLatestChat = currentGroupChat?.latestChat?._id === idChat;

        istLatestChat && revalidate();
        // revalidate();
        toast.success("Delete chat success");
      } catch (error) {
        showErrorToast(error);
      }
    },
    [listGroupChats]
  );

  return (
    <>
      <Stack
        ref={frameChatRef}
        id="scrollableDiv"
        p={1}
        pb={2}
        style={{
          flex: "1 1 auto",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
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
          style={{ display: "flex", flexDirection: "column-reverse", gap: 8, height: "100%" }} //To put endMessage and loader to the top.
          inverse={true}
          scrollableTarget="scrollableDiv"
        >
          {listChats.map((chat, index) => {
            return <ChatItem key={chat._id} chat={chat} onDelete={handleDeleteChat} />;
          })}
        </InfiniteScroll>
      </Stack>
      {/* Box input new chat */}
      <InputBox onSend={handleSendNewChat} />
    </>
  );
};

export default GroupChat;
