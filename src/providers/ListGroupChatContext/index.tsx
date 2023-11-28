"use client";
import useDebounce from "@/hooks/useDebounce";
import { ListGroupChatContext } from "@/hooks/useListGroupChatContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "./fetcher";

const ListGroupChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const joinedGroupsRef = useRef<string[]>([]);

  const name = useDebounce(search);
  const { data, size, setSize, mutate, isValidating, error } = useSWRInfinite(
    (page: number) => {
      return `/api/user/group-chat?page=${+page + 1}&name=${name}`;
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        // console.log("list group chat: ", data);
      },
    }
  );

  useEffect(() => {
    setSocket(io(process.env.SERVER_URL as string));
  }, []);

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

  // Data list group chat
  const listGroupChats: IGroupChat[] = useMemo(() => {
    if (data) {
      const listGroupChats = data.reduce((acc: IGroupChat[], item) => {
        return [...acc, ...item.listGroupChats];
      }, []);
      return listGroupChats;
    }
    return [];
  }, [data]);

  // Revalidate list group chat
  const revalidate = () => {
    mutate();
  };

  // Handle join group chat
  const handleJoinGroup = ({ newGroupId }: { newGroupId: string }) => {
    const isJoined = joinedGroups.includes(newGroupId);

    if (!isJoined && socket) {
      console.log("Join");

      setJoinedGroups((prev) => [...prev, newGroupId]);
      joinedGroupsRef.current.push(newGroupId);
      socket.emit("join group", {
        idGroup: newGroupId,
      });
    }
  };

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
    socket,
  };

  if (error) {
    router.back();
  }

  return <ListGroupChatContext.Provider value={value}>{children}</ListGroupChatContext.Provider>;
};

export default ListGroupChatProvider;
