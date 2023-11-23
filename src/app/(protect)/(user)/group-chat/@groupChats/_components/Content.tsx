"use client";
import SearchBox from "@/components/common/SearchBox";
import GroupChat from "@/components/group-chat-components/GroupChat";
import useDebounce from "@/hooks/useDebounce";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";
import useSWR, { Fetcher } from "swr";
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
      onSuccess(data, key, config) {
        console.log("data: ", data);
      },
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
        <Tooltip title="Create group">
          <IconButton>
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
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
          <Chip clickable disabled={isValidating} label="More" onClick={() => setSize(size + 1)} />
        </Stack>
      )}
    </Box>
  );
};

export default GroupChats;
