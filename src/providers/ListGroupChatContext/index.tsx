"use client";
import useDebounce from "@/hooks/useDebounce";
import { ListGroupChatContext } from "@/hooks/useListGroupChatContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import useSWR from "swr";
import { fetcher } from "./fetcher";

const ListGroupChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [listGroupChats, setListGroupChats] = useState<IGroupChat[]>([]);
  const socket = useRef<Socket>();
  const name = useDebounce(search);

  const { data, mutate, isValidating, error } = useSWR(
    `/api/user/group-chat?name=${name}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      onSuccess(data, key, config) {},
    }
  );

  useEffect(() => {
    data && setListGroupChats(data);
  }, [data]);

  useEffect(() => {
    socket.current = io(process.env.BACK_END_URI as string);

    return () => {
      socket.current?.close();
    };
  }, []);

  useEffect(() => {
    if (session && listGroupChats.length > 0) {
      // Join group chat with socket
      listGroupChats.forEach((groupChat) => {
        handleJoinGroup({ newGroupId: groupChat._id });
      });

      // Listen event new latest message from groups
      socket.current?.on("receive chat", (newChat: IChat) => {
        updateLatestMessage(newChat);
      });
    }
  }, [session, listGroupChats]);

  // Status loading when init data
  const isLoadingInitial = useMemo(() => {
    return !data && !isValidating;
  }, [data, isValidating]);

  // Revalidate list group chat
  const revalidate = () => {
    mutate();
  };

  // Handle join group chat
  const handleJoinGroup = ({ newGroupId }: { newGroupId: string }) => {
    const isJoined = joinedGroups.includes(newGroupId);
    if (!isJoined && socket) {
      setJoinedGroups((prev) => [...prev, newGroupId]);
      socket.current?.emit("join group", {
        idGroup: newGroupId,
      });
    }
  };

  // Handle update new chat to list group chat
  const updateLatestMessage = (newChat: IChat) => {
    const update = [...listGroupChats].map((groupChat) => {
      if (groupChat._id === newChat.idGroupChat) {
        return {
          ...groupChat,
          latestChat: newChat,
          updatedAt: newChat.updatedAt,
          latestReadBy: [newChat.sender._id],
        };
      }
      return groupChat;
    });
    setListGroupChats(update);
  };

  // Handle update latest reader
  // Chỉ khi đang mounting tại group chat thì mới thêm vào
  const appendToLatestRead = (idGroupChat: string) => {
    if (!session) return;
    const idUser = session!._id as any;
    const updateListChats = [...listGroupChats].map((groupChat) => {
      if (idGroupChat === groupChat._id) {
        return {
          ...groupChat,
          latestReadBy: Array.from(new Set([...groupChat.latestReadBy, idUser])),
        };
      }
      return groupChat;
    });
    setListGroupChats(updateListChats);
  };

  const sortedListChats = useMemo(() => {
    return listGroupChats.sort((a, b) => {
      if (a.latestChat && b.latestChat) {
        return (
          new Date(b.latestChat?.createdAt).getTime() - new Date(a.latestChat?.createdAt).getTime()
        );
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [listGroupChats]);

  const value = {
    isLoadingInitial,
    isValidating,
    listGroupChats: sortedListChats,
    search,
    revalidate,
    setSearch,
    handleJoinGroup,
    updateLatestMessage,
    socket: socket.current,
    appendToLatestRead,
    setListGroupChats,
  };

  if (error) {
    console.log("Error: ", error);

    throw new Error("Get list group chats failed!");
  }

  return <ListGroupChatContext.Provider value={value}>{children}</ListGroupChatContext.Provider>;
};

export default ListGroupChatProvider;
