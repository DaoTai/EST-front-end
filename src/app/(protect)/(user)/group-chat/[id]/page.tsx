"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

import ChatItem from "@/components/chat-component/ChatItem";
import InputBox from "@/components/chat-component/InputBox";
import useListGroupChatContext from "@/hooks/useListGroupChatContext";
import chatService from "@/services/chat";
import { convertObjectToFormData, showErrorToast } from "@/utils/functions";
import About from "@/components/group-chat-components/About";
import { Tooltip } from "@mui/material";
import Image from "next/image";

type IResponse = {
  listChats: IChat[];
  page: number;
  maxPage: number;
};

const GroupChat = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const {
    socket,
    revalidate,
    updateLatestMessage,
    listGroupChats,
    appendToLatestRead,
    setListGroupChats,
  } = useListGroupChatContext();

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
          appendToLatestRead(params.id);
          // call api update latest reader
          await axios.patch(`/api/user/group-chat/${params.id}/seen`);
        }
      });
      socket?.on("delete chat", (idChat: string) => {
        setListChats((prev) => [...prev].filter((chat) => chat._id !== idChat));
        updateListGroupChats(idChat);
      });
    }
  }, [session]);

  // Update list group chats when delete
  const updateListGroupChats = (idChat: string) => {
    setListGroupChats((prev) => {
      let newListGroupChats = [...prev];
      return newListGroupChats.map((groupChat) => {
        if (groupChat.latestChat?._id === idChat) {
          return {
            ...groupChat,
            latestChat: undefined,
          };
        }
        return groupChat;
      });
    });
  };

  // List latest reader
  const listLatestReaders = useMemo<IMemberGroupChat[]>(() => {
    const groupChat = listGroupChats.find((groupChat) => groupChat._id === params.id);
    if (groupChat) {
      return groupChat.members.filter(
        (member) =>
          groupChat.latestReadBy.includes(member._id as any) && member._id !== session?._id
      );
    }
    return [];
  }, [params.id, listGroupChats, session]);

  // Exist in blocked members
  const isBlocked = useMemo(() => {
    if (session && listGroupChats) {
      const idUser = session!._id;
      const inforGroup = listGroupChats.find((groupChat) => groupChat._id === params.id);
      return inforGroup?.blockedMembers.some((block) => block._id === idUser);
    }
    return false;
  }, [listGroupChats, params, session]);

  // Delete chat
  const handleDeleteChat = useCallback(
    async (idChat: string) => {
      try {
        await chatService.deleteChat(idChat);
        setListChats((prev) => [...prev].filter((chat) => chat._id !== idChat));
        updateListGroupChats(idChat);
        socket?.emit("delete chat", { idGroup: params.id, idChat });
        toast.success("Delete chat success");
      } catch (error) {
        showErrorToast(error);
      }
    },
    [listGroupChats]
  );

  // Scroll latest new chat
  const scrollLatestChat = () => {
    if (frameChatRef.current) {
      frameChatRef.current.scrollTop = frameChatRef.current.scrollHeight;
    }
  };

  // On focus frame chat
  const onFocusFrameChat = () => {
    appendToLatestRead(params.id);
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
      .catch((err) => showErrorToast(err));
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
      showErrorToast(error);
    }
  };

  // Fetch more data
  const fetchMoreData = () => {
    hasMore && fetchListChats();
  };

  return (
    <Stack
      flexDirection={"row"}
      position={"relative"}
      component={Paper}
      elevation={2}
      onFocus={onFocusFrameChat}
    >
      {/* About */}
      <Box position={"absolute"} sx={{ top: 0, right: 0, left: 0, boxShadow: 1, zIndex: 10 }}>
        <About />
      </Box>

      {/* Frame chat */}
      <Box
        flex={2}
        sx={{
          height: "100vh",
          overflowY: "overlay",
          pt: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            style={{ display: "flex", flexDirection: "column-reverse", gap: 8, height: "100%" }}
            inverse={true}
            scrollableTarget="scrollableDiv"
          >
            {listChats.map((chat, index) => {
              return <ChatItem key={chat._id} chat={chat} onDelete={handleDeleteChat} />;
            })}
          </InfiniteScroll>
        </Stack>

        {/*  List latest readers */}
        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"end"} gap={1} p={1}>
          {listLatestReaders.map((member) => {
            return (
              <Tooltip key={member._id} title={member.username}>
                <Image
                  src={member.avatar.uri}
                  alt="avatar"
                  width={20}
                  height={20}
                  style={{ borderRadius: 99 }}
                />
              </Tooltip>
            );
          })}
        </Stack>
        {/* Box input new chat */}
        {isBlocked ? (
          <Typography gutterBottom variant="body1" fontWeight={600} textAlign={"center"}>
            You are blocked by host
          </Typography>
        ) : (
          <InputBox onSend={handleSendNewChat} />
        )}
      </Box>
    </Stack>
  );
};

export default GroupChat;
