"use client";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

import SearchBox from "@/components/common/SearchBox";
import Banner from "@/components/course-components/Banner";
import FilterSearch from "@/components/course-components/FilterSearch";
import ListSkeletons from "@/components/course-components/ListSkeletons";
import Spinner from "@/components/custom/Spinner";
import { SERVER_URI } from "@/utils/constants/common";
import { Button, Divider, Drawer } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";

type Response = {
  courses: ICourse[];
  maxPage: number;
  total: number;
};

const fetcher: Fetcher<Response, string> = (url: string) => fetch(url).then((res) => res.json());

const CoursePage = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [openFilter, setOpenFilter] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { data, isLoading, isValidating } = useSWR(
    SERVER_URI + "/search/courses?" + searchParams.toString(),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        console.log(data);

        setChips((prev) => {
          const chips = [...prev, ...data.courses.map((course) => course.category)];
          return Array.from(new Set(chips));
        });
      },
    }
  );

  console.log("data: ", data);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set(name, value);
    return params.toString();
  };

  // Change page
  const onChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
    const newSearchParams = createQueryString("page", String(value));
    router.push(pathName + "?" + newSearchParams);
  };
  // Clear search by name
  const onClear = useCallback(async () => {
    setValue("");
    router.push(pathName);
  }, []);

  // Search by name
  const onSearch = useCallback(async () => {
    router.push(pathName + "?name=" + value);
  }, [value]);

  // Search by category
  const onSearchByCategory = async (category: string) => {
    router.push(pathName + "?category=" + category);
  };

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  if (isLoading) {
    return <ListSkeletons />;
  }

  return (
    <Box p={2}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        {/* Toggler filter */}
        <IconButton onClick={() => setOpenFilter(!openFilter)}>
          <FilterListIcon color={openFilter ? "info" : "action"} />
        </IconButton>
        {/* Search */}
        <SearchBox
          placeholder="Search by name"
          value={value}
          onClear={onClear}
          onChange={setValue}
          onSearch={onSearch}
        />
      </Stack>

      {/* Suggest search by category */}
      <Stack mt={1} mb={1} gap={1} flexDirection={"row"}>
        <Typography variant="subtitle1">Suggest categories: </Typography>
        {chips.map((category, i) => (
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
      <Divider />

      <Stack gap={1} mt={2} flexDirection={"row"} flexWrap={"wrap"}>
        {/* Filter */}
        <Drawer open={openFilter} anchor="left" onClose={onCloseFilter}>
          <FilterSearch onClose={onCloseFilter} />
        </Drawer>

        {/* List course */}
        <Box width={"100%"}>
          {isValidating && <Spinner />}
          {data && (
            <Stack gap={1}>
              <>
                {data.courses.length > 0 ? (
                  data.courses.map((course) => (
                    <Link key={course._id} href={pathName + "/" + course.slug}>
                      <Banner course={course} />
                    </Link>
                  ))
                ) : (
                  <Stack justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Typography variant="body1" textAlign={"center"} gutterBottom>
                      Not found course
                    </Typography>
                    <Button variant="outlined" onClick={onClear}>
                      Back
                    </Button>
                  </Stack>
                )}
              </>
            </Stack>
          )}

          {!data && (
            <Typography variant="body1" textAlign={"center"}>
              No course
            </Typography>
          )}

          {/* Pagination */}
          <Stack flexDirection={"row"} mt={2} justifyContent={"center"}>
            <Pagination
              variant="outlined"
              page={
                Number.isInteger(Number(searchParams.get("page")))
                  ? Number(searchParams.get("page")) || 1
                  : 1
              }
              count={data?.maxPage}
              onChange={onChangePage}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CoursePage;
