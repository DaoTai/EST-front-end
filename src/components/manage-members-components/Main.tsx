"use client";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { GridRowSelectionModel } from "@mui/x-data-grid";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher, mutate } from "swr";
import Table from "./Table";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IResponse = {
  listUsers: IProfile[];
  total: number;
  maxPage: number;
};

const fetcher: Fetcher<IResponse, string> = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
  const pathName = usePathname();
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<"user" | "teacher" | "admin">("user");
  const [status, setStatus] = useState<"block" | "normal">("normal");
  const [action, setAction] = useState<"authorize" | "unAuthorize" | "block" | "unBlock">(
    "authorize"
  );
  const [listIds, setListIds] = useState<GridRowSelectionModel>([]);

  const { data, isLoading, isValidating, error } = useSWR(
    `/api/admin/users?page=${page}&role=${role}&status=${status}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  // On change role
  const handleChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as any);
    setPage(1);
  };

  // On change status
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as any);
    setPage(1);
  };

  // On change action
  const handleChangeAction = (event: SelectChangeEvent) => {
    setAction(event.target.value as any);
  };

  // On change page
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Handle action
  const handleAction = async () => {
    try {
      await axios.patch("/api/admin/users", {
        listIdUsers: listIds,
        option: action,
      });
      mutate(`/api/admin/users?page=${page}&role=${role}&status=${status}`);
      toast.success("Handle action successfully");
    } catch (error) {
      const { response } = error as AxiosError;
      if (typeof response?.data === "string") {
        toast.error(response?.data);
      } else {
        toast.error("Handle action failed");
      }
    }
  };

  // On select id row table
  const onSelectRow = (newSelectionModel: GridRowSelectionModel) => {
    setListIds(newSelectionModel);
  };

  if (error) {
    return (
      <Box p={2}>
        <Typography variant="body1" textAlign={"center"}>
          Having issues
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {/* Navigate to CVs */}
      <Stack
        flexDirection={"row"}
        mb={2}
        justifyContent={"end"}
        sx={{
          a: {
            textDecoration: "underline !important",
            color: (theme) => theme.palette.info.main + "!important",
          },
        }}
      >
        <Link href={pathName + "/cv"}>Pending CV</Link>
      </Stack>

      {/* Filter */}
      <Stack flexDirection={"row"} gap={2} mb={2}>
        {/* Role */}
        <FormControl fullWidth>
          <InputLabel id="role">Role</InputLabel>
          <Select
            MenuProps={{
              disableScrollLock: true,
            }}
            labelId="role"
            value={role}
            label="Role"
            onChange={handleChangeRole}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"teacher"}>Teacher</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </FormControl>

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            MenuProps={{
              disableScrollLock: true,
            }}
            labelId="status"
            value={status}
            label="Status"
            onChange={handleChangeStatus}
          >
            <MenuItem value={"deleted"}>Blocked</MenuItem>
            <MenuItem value={"normal"}>Normal</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Actions */}
      <Stack flexDirection={"row"} gap={2} flexWrap={"wrap"}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="action">Action</InputLabel>
          <Select
            MenuProps={{
              disableScrollLock: true,
            }}
            labelId="action"
            value={action}
            label="Action"
            onChange={handleChangeAction}
          >
            <MenuItem value={"authorize"}>Authorize to teacher</MenuItem>
            <MenuItem value={"unAuthorize"}>Unauthorize teacher</MenuItem>
            <MenuItem value={"block"}>Block account</MenuItem>
            <MenuItem value={"unBlock"}>Unblock account</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          disabled={listIds.length === 0}
          endIcon={<SendIcon />}
          onClick={handleAction}
        >
          Handle action
        </Button>
      </Stack>

      {(isLoading || isValidating) && (
        <Typography variant="body1" textAlign={"center"}>
          Loading ...
        </Typography>
      )}

      {data && data.listUsers.length > 0 ? (
        <Box mt={2}>
          {/* Table */}
          <Table users={data.listUsers} total={data.total} onSelectRow={onSelectRow} />

          {/* Pagination */}
          <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
            <Pagination
              count={data?.maxPage}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Box>
      ) : (
        <Box p={2}>
          {
            <Typography variant="h6" textAlign={"center"}>
              No members
            </Typography>
          }
        </Box>
      )}
    </Box>
  );
};

export default Main;
