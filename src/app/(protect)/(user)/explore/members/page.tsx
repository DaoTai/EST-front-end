"use client";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import CardMember from "./_components/CardMember";
import Search from "./_components/Search";
import { Container } from "@mui/material";

type ISearchProfileResult = {
  users: IProfile[];
  maxPage: number;
  total: number;
};

const ExplorePage = () => {
  const { data: session } = useSession();

  const [listMember, setListMember] = useState<IProfile[]>([]);
  const [page, setPage] = useState<number>(1);
  const maxPageRef = useRef<number>(1);
  const totalResult = useRef<number>(0);
  const SearchBarRef = useRef<{ value: string; role: string }>({ value: "", role: "" });

  // Serching member
  const handleSearch = async (value?: string, role?: string, currentPage: number = 1) => {
    const query = new URLSearchParams({
      search: value?.trim() || "",
      role: role || "",
      page: String(currentPage),
    });

    try {
      const res = await fetch("/api/user/profile?" + query);
      const data: ISearchProfileResult = await res.json();
      setListMember(data?.users ?? []);
      maxPageRef.current = data?.maxPage as number;
      totalResult.current = data?.total as number;
    } catch (error) {
      toast.error("Get infor failed");
    }
  };

  // Changing page
  const handleChange = async (event: React.ChangeEvent<unknown>, valuePage: number) => {
    setPage(valuePage);
    const { value, role } = SearchBarRef.current;
    await handleSearch(value, role, valuePage);
  };

  // Props for Search Component
  const onSearch = useCallback(async (value: string, role: string) => {
    setPage(1);
    await handleSearch(value, role);
  }, []);

  useEffect(() => {
    session && handleSearch();
  }, [session]);

  return (
    <Container>
      <Search ref={SearchBarRef} totalResult={totalResult.current} onSearch={onSearch} />

      {/* List member */}
      <Grid container mt={1} spacing={2}>
        {listMember.map((member, i) => (
          <Grid key={i} item lg={3} md={6} sm={6} xs={12}>
            <CardMember data={member} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Stack mt={4} flexDirection={"row"} justifyContent={"center"}>
        <Pagination
          count={maxPageRef.current}
          page={page}
          variant="outlined"
          color="primary"
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
};

export default ExplorePage;
