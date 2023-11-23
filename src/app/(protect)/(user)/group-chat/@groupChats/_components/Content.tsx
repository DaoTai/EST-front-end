"use client";
import SearchBox from "@/components/common/SearchBox";
import GroupChat from "@/components/group-chat-components/GroupChat";
import NewGroup from "@/components/group-chat-components/NewGroupIcon";
import useDebounce from "@/hooks/useDebounce";
import { Chip, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";
import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
type IResponse = {
  listGroupChats: IGroupChat[];
  total: number;
  maxPage: number;
};

const fetcher: Fetcher<IResponse, string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Fetch group failed");
    }
  });

const GroupChats = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const name = useDebounce(search);

  const { data, size, setSize, mutate, isValidating, isLoading, error } = useSWRInfinite(
    (page: number) => {
      return `/api/user/group-chat?page=${+page + 1}&name=${name}`;
    },
    fetcher,
    {
      revalidateOnMount: false,
      revalidateIfStale: true,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  const maxPage = useMemo(() => {
    if (data) {
      return data[0].maxPage;
    }
    return 0;
  }, [data]);

  const listGroupChats: IGroupChat[] = useMemo(() => {
    if (data) {
      const listGroupChats = data.reduce((acc: IGroupChat[], item) => {
        return [...acc, ...item.listGroupChats];
      }, []);
      return listGroupChats;
    }
    return [];
  }, [data]);

  if (error) {
    router.back();
  }

  return (
    <Box
      p={1}
      sx={{
        input: {
          padding: 2,
        },

        ".MuiInputBase-root": {
          borderRadius: 4,
        },
      }}
    >
      {/* Search & Actions */}
      <Stack
        gap={2}
        mb={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SearchBox
          placeholder="Search name group chat"
          value={search}
          onChange={(val) => setSearch(val)}
          onClear={() => setSearch("")}
        />
        <NewGroup mutate={mutate} />
      </Stack>

      {/* List group */}
      <>
        {isLoading ? (
          <Typography variant="body1" textAlign={"center"}>
            Loading ...
          </Typography>
        ) : (
          <Stack gap={1} mt={2}>
            {listGroupChats.length > 0 ? (
              listGroupChats.map((groupChat) => {
                return <GroupChat key={groupChat._id} groupChat={groupChat} />;
              })
            ) : (
              <Typography variant="body1" textAlign={"center"}>
                No group chat
              </Typography>
            )}
          </Stack>
        )}
      </>

      {size < maxPage && (
        <Stack mt={2} mb={1} flexDirection={"row"} justifyContent={"center"}>
          <Chip
            variant="outlined"
            clickable
            disabled={isValidating}
            label="More"
            sx={{ width: "100%" }}
            onClick={() => setSize(size + 1)}
          />
        </Stack>
      )}
    </Box>
  );
};

export default GroupChats;
