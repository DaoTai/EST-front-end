"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Pagination from "@mui/material/Pagination";
import React, { memo, useState } from "react";
import useSWR, { Fetcher } from "swr";
import SearchBox from "@/components/common/SearchBox";
import useDebounce from "@/hooks/useDebounce";

type IProps = {
  existUsers: IProfile[] | IMemberGroupChat[];
  onAdd: (user: IProfile | IMemberGroupChat) => void;
};

type IResponse = {
  users: IProfile[];
  maxPage: number;
  total: number;
};

const fetcher: Fetcher<IResponse, string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error");
    }
  });

const AddMembers = ({ existUsers, onAdd }: IProps) => {
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const nameDebounce = useDebounce(name);
  const { data, isLoading, isValidating } = useSWR(
    `/api/user/profile?search=${nameDebounce}&page=${page}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        // console.log("data: ", data);
      },
    }
  );

  if (isLoading) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Loading ...
      </Typography>
    );
  }

  return (
    <Box mt={2} boxShadow={2}>
      {/* Search */}
      <SearchBox value={name} onChange={(val) => setName(val)} onClear={() => setName("")} />
      <Divider />
      {isLoading || isValidating ? (
        <Typography variant="body1" textAlign={"center"}>
          Loading
        </Typography>
      ) : (
        <Box mt={2} pb={2}>
          {data?.users && data?.users.length > 0 ? (
            <>
              {data.users.map((user) => {
                return (
                  <Stack
                    key={user._id}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={1}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Avatar src={user?.avatar?.uri} />
                      <Typography variant="body1" textAlign={"center"}>
                        {user.username}
                      </Typography>
                    </Box>
                    <Button
                      disabled={existUsers.map((user) => user._id).includes(user._id)}
                      variant="outlined"
                      onClick={() => onAdd(user)}
                    >
                      Add member
                    </Button>
                  </Stack>
                );
              })}

              <Stack mt={2} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
                <Pagination
                  variant="outlined"
                  color="primary"
                  page={page}
                  count={data?.maxPage}
                  onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                    setPage(value);
                  }}
                />
              </Stack>
            </>
          ) : (
            <Typography variant="body1" textAlign={"center"}>
              No user
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(AddMembers);
