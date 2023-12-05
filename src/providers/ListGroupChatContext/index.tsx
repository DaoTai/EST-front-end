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
  // const [socket, setSocket] = useState<Socket>();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [listGroupChats, setListGroupChats] = useState<IGroupChat[]>([]);
  const joinedGroupsRef = useRef<string[]>([]);
  const socket = useRef<Socket>();
  const name = useDebounce(search);

  const { data, mutate, isValidating, error } = useSWR(
    `/api/user/group-chat?name=${name}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      onSuccess(data, key, config) {
        setListGroupChats(data);
      },
    }
  );

  useEffect(() => {
    if (session) {
      socket.current = io(process.env.SERVER_URL as string);
    }
    // return () => {
    //   if (session) {
    //     socket.current?.disconnect();
    //   }
    // };
  }, [session]);

  useEffect(() => {
    if (session && listGroupChats.length > 0) {
      listGroupChats.forEach((groupChat) => {
        handleJoinGroup({ newGroupId: groupChat._id });
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
      joinedGroupsRef.current.push(newGroupId);
      socket.current?.emit("join group", {
        idGroup: newGroupId,
      });
    }
  };

  // Handle update new chat to list group chat
  const updateLatestMessage = (newChat: IChat) => {
    const prevGroupChats = listGroupChats.length === 0 ? data ?? [] : listGroupChats;

    const update = prevGroupChats.map((groupChat) => {
      if (groupChat._id === newChat.idGroupChat) {
        return {
          ...groupChat,
          latestChat: newChat,
          updatedAt: newChat.updatedAt,
        };
      }
      return groupChat;
    });
    // setListGroupChats(update);
  };

  // Handle update latest reader
  const appendToLatestRead = (idGroupChat: string) => {
    // setListGroupChats((prev) => {
    //   return prev.map((groupChat) => {
    //     if (groupChat._id === idGroupChat) {
    //       console.log("Hi");
    //       groupChat.latestReadBy.push(session!._id as any);
    //     }
    //     return groupChat;
    //   });
    // });
  };

  const value = {
    isLoadingInitial,
    isValidating,
    listGroupChats,
    search,
    revalidate,
    setSearch,
    handleJoinGroup,
    updateLatestMessage,
    socket: socket.current,
    appendToLatestRead,
  };

  if (error) {
    router.back();
  }

  return <ListGroupChatContext.Provider value={value}>{children}</ListGroupChatContext.Provider>;
};

export default ListGroupChatProvider;
