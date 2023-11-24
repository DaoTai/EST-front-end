"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
import { IResponse, ListGroupChatContextProps } from "./interfaces";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const ListGroupChatContext = createContext<ListGroupChatContextProps | undefined>(undefined);

export const useListGroupChatContext = (): ListGroupChatContextProps => {
  const context = useContext(ListGroupChatContext);
  if (!context) {
    throw new Error("useListGroupChatContext must be used within a ListGroupChatProvider");
  }
  return context;
};

const fetcher: Fetcher<IResponse, string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Fetch group chat failed");
    }
  });

const ListGroupChatProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
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
      onSuccess(data, key, config) {},
    }
  );

  // Status loading when init data
  const isLoadingInitial = !data && !isValidating;

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

  // Revalidate data
  const revalidate = () => {
    mutate();
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
  };

  if (error) {
    router.back();
  }

  return <ListGroupChatContext.Provider value={value}>{children}</ListGroupChatContext.Provider>;
};

export default ListGroupChatProvider;
