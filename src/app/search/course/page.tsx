"use client";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import serverAxios from "@/config/axios";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import SearchBox from "@/components/common/SearchBox";
import Banner from "@/components/course-components/Banner";
import FilterSearch from "@/components/course-components/FilterSearch";
import ListSkeletons from "@/components/course-components/ListSkeletons";
import { SERVER_URI } from "@/utils/constants/common";
type Response = {
  courses: ICourse[];
  maxPage: number;
  total: number;
};

const CoursePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [listCourses, setListCoures] = useState<ICourse[]>([]);
  const [page, setPage] = useState<number>(1);

  const suggestChips = useRef<string[]>([]);
  const maxPageRef = useRef<number>(1);
  const currentPageRef = useRef<number>(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    (async () => await handleSearch())();
  }, []);

  const handleSearch = async (page: number = 1) => {
    try {
      setLoading(true);
      const res = await axios.get<Response>(
        SERVER_URI + "/search/courses?name=" + value.trim() + "&page=" + page
      );
      setListCoures(res.data.courses);
      maxPageRef.current = res.data.maxPage;
      suggestChips.current = Array.from(new Set(res.data.courses.map((course) => course.category)));
      setLoading(false);
    } catch (error) {
      toast.error("Error");
    }
  };

  const onClear = useCallback(async () => {
    setValue("");
    await handleSearch();
  }, []);

  const onSearch = useCallback(async () => {
    await handleSearch();
  }, [value]);

  const onSearchByCategory = async (category: string) => {
    value.trim() && setValue("");
    setLoading(true);
    const res = await serverAxios.get<Response>("/search/courses?category=" + category);
    setListCoures(res.data.courses);
    setLoading(false);
  };

  const onChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== page) {
      setPage(value);
      await handleSearch(value);
    }
  };

  return (
    <Box p={2}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        {/* Toggler filter */}
        <IconButton onClick={() => setOpenFilter(!openFilter)}>
          <FilterListIcon color={openFilter ? "info" : "action"} />
        </IconButton>
        {/* Search */}
        <SearchBox
          placeholder="Search name"
          value={value}
          onClear={onClear}
          onChange={setValue}
          onSearch={onSearch}
        />
      </Stack>

      {/* Suggest search by category */}
      <Stack mt={2} flexDirection={"row"} justifyContent={"center"} alignItems={"end"} gap={1}>
        {suggestChips.current.map((category, i) => (
          <Chip
            clickable
            key={i}
            label={category}
            className="bg-gradient"
            size="small"
            onClick={() => onSearchByCategory(category)}
          />
        ))}
      </Stack>

      <Stack gap={1} mt={2} flexDirection={"row"} flexWrap={"wrap"}>
        {/* Filter */}
        {openFilter && <FilterSearch />}

        {/* List course */}
        <Box sx={{ flex: "2 1 auto" }}>
          <Stack gap={1}>
            {!loading && listCourses.map((course) => <Banner key={course._id} course={course} />)}
            {!loading && listCourses?.length === 0 && (
              <Typography variant="body1" textAlign={"center"}>
                Not found course
              </Typography>
            )}
            {loading && <ListSkeletons />}
          </Stack>

          {/* Pagination */}
          <Stack flexDirection={"row"} mt={2} justifyContent={"center"}>
            <Pagination
              variant="outlined"
              page={page}
              count={maxPageRef.current}
              onChange={onChangePage}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CoursePage;
