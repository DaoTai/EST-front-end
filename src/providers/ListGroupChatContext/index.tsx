"use client";
import useDebounce from "@/hooks/useDebounce";
import { ListGroupChatContext } from "@/hooks/useListGroupChatContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "./fetcher";
import { useSession } from "next-auth/react";

const ListGroupChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket>();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [listGroupChats, setListGroupChats] = useState<IGroupChat[]>([]);
  const joinedGroupsRef = useRef<string[]>([]);

  const name = useDebounce(search);
  const { data, size, setSize, mutate, isValidating, error } = useSWRInfinite(
    (page: number) => {
      return `/api/user/group-chat?page=${+page + 1}&name=${name}`;
    },
    fetcher,
    {
      revalidateOnFocus: false,
      onSuccess(data, key, config) {
        // console.log("list group chat: ", data);
      },
    }
  );

  useEffect(() => {
    if (session) {
      setSocket(io(process.env.SERVER_URL as string));
    }
  }, [session]);

  useEffect(() => {
    setListGroupChats(() => {
      if (data) {
        const listGroupChats = data.reduce((acc: IGroupChat[], item) => {
          return [...acc, ...item.listGroupChats];
        }, []);
        return listGroupChats;
      }
      return [];
    });
  }, [data]);

  // Status loading when init data
  const isLoadingInitial = useMemo(() => {
    return !data && !isValidating;
  }, [data, isValidating]);

  // Max page
  const maxPage = useMemo(() => {
    if (data) {
      return data[0].maxPage;
    }
    return 0;
  }, [data]);

  // Revalidate list group chat
  const revalidate = () => {
    mutate();
  };

  // Handle join group chat
  const handleJoinGroup = ({ newGroupId }: { newGroupId: string }) => {
    const isJoined = joinedGroups.includes(newGroupId);
    if (!isJoined && socket) {
      setJoinedGroups((prev) => [...prev, newGroupId]);
      joinedGroupsRef.current.push(newGroupId);
      socket.emit("join group", {
        idGroup: newGroupId,
      });
    }
  };

  // Handle update new chat to list group chat
  const updateLatestMessage = ({ idGroup, newChat }: { idGroup: string; newChat: IChat }) => {
    const update = [...listGroupChats].map((groupChat) => {
      if (groupChat._id === idGroup) {
        return {
          ...groupChat,
          latestChat: newChat,
        };
      }
      return groupChat;
    });
    setListGroupChats(update);
  };

  // useEffect(() => {
  //   console.log("listGroupChats: ", listGroupChats);
  // }, [listGroupChats]);

  const value = {
    isLoadingInitial,
    isValidating,
    listGroupChats,
    maxPage,
    size,
    search,
    revalidate,
    setSize,
    setSearch,
    handleJoinGroup,
    updateLatestMessage,
    socket,
  };

  if (error) {
    router.back();
  }

  return <ListGroupChatContext.Provider value={value}>{children}</ListGroupChatContext.Provider>;
};

export default ListGroupChatProvider;
