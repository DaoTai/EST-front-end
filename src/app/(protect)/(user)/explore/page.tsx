"use client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useCallback, useEffect, useRef, useState } from "react";
import CardMember from "./_components/CardMember";
import Search from "./_components/Search";
import useAuthAxios from "@/hooks/useAuthAxios";
import { searchProfile } from "@/services/user/profile";
const ExplorePage = () => {
  const axios = useAuthAxios();

  const [listMember, setListMember] = useState<IProfile[]>([]);
  const [page, setPage] = useState<number>(1);
  const maxPageRef = useRef<number>(1);
  const totalResult = useRef<number>(0);
  const SearchBarRef = useRef<{ value: string; role: string }>({ value: "", role: "" });

  // Serching member
  const handleSearch = async (value?: string, role?: string, currentPage: number = 1) => {
    const data = await searchProfile(axios, {
      search: value?.trim(),
      role,
      page: currentPage,
    });

    setListMember(data?.users ?? []);
    maxPageRef.current = data?.maxPage as number;
    totalResult.current = data?.total as number;
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
    handleSearch();
  }, []);

  return (
    <Container sx={{ pt: 1 }}>
      <Search ref={SearchBarRef} totalResult={totalResult.current} onSearch={onSearch} />

      {/* List member */}
      <Grid container sx={{ mt: 2 }} spacing={2}>
        {listMember.map((member, i) => (
          <Grid key={i} item md={3} sm={6} xs={12}>
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
