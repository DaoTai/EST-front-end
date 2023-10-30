"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

import SearchBox from "@/components/common/SearchBox";
import FormCourse from "@/components/course-components/FormCourse";
import MyDialog from "@/components/custom/Dialog";
import MyModal from "@/components/custom/Modal";
import useDebounce from "@/hooks/useDebounce";

type Response = {
  courses: ICourse[];
  maxPage: number;
  total: number;
};

const fetcher: Fetcher<Response, string> = (url: string) => fetch(url).then((res) => res.json());

const Courses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openConfirm, setConfirm] = useState<boolean>(false);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [listIdCourse, setListIdCourse] = useState<GridRowId[]>([]);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const nameSearch = useDebounce(name, 1000);
  const { data, isLoading, error } = useSWR(
    `/api/admin/courses?page=${page}&status=${status}&name=${nameSearch}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const columns: GridColDef[] = useMemo(() => {
    if (isMobile) {
      return [
        { field: "name", headerName: "Name", width: 100 },

        {
          field: "createdBy",
          headerName: "Created by",
          width: 100,
          renderCell: (params) => {
            const course: ICourse = params.row;
            return (
              <Typography
                component={Link}
                href={"/profile/" + course.createdBy._id}
                variant="caption"
              >
                {course.createdBy.username}
              </Typography>
            );
          },
        },
        {
          field: "Actions",
          headerName: "Actions",
          filterable: false,
          sortable: false,
          flex: 1,
          renderCell: (params) => {
            const course: ICourse = params.row;
            return (
              <Box display={"flex"} gap={1}>
                <Tooltip arrow title={course.status === "approved" ? "approving" : "pending"}>
                  <Switch
                    color="success"
                    checked={course.status === "approved"}
                    onChange={() => handleApproveCourse(course)}
                  />
                </Tooltip>
                <IconButton color="info" onClick={() => handleOpenDetail(course)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          },
        },
      ];
    }

    return [
      { field: "name", headerName: "Name", width: 150, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        flex: 1,
        renderCell: (params) => {
          return (
            <Chip
              color={params.value === "pending" ? "warning" : "success"}
              label={params.value}
              size="small"
            />
          );
        },
      },
      {
        field: "type",
        headerName: "Type",
        width: 100,
        flex: 1,
        renderCell: (params) => {
          return (
            <Chip
              color={params.value === "public" ? "success" : "info"}
              label={params.value}
              size="small"
            />
          );
        },
      },

      { field: "category", headerName: "Category", width: 150, flex: 1 },
      {
        field: "createdBy",
        headerName: "Created by",
        width: 150,
        flex: 1,
        renderCell: (params) => {
          const course: ICourse = params.row;
          return (
            <Box
              component={Link}
              href={"/profile/" + course.createdBy._id}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Avatar src={course.createdBy.avatar.uri} />
              <Typography variant="caption">{course.createdBy.username}</Typography>
            </Box>
          );
        },
      },
      {
        field: "Actions",
        headerName: "Actions",
        filterable: false,
        sortable: false,
        flex: 1,
        renderCell: (params) => {
          const course: ICourse = params.row;
          return (
            <Box display={"flex"} gap={2}>
              <Tooltip arrow title={course.status === "approved" ? "approving" : "pending"}>
                <Switch
                  color="success"
                  checked={course.status === "approved"}
                  onChange={() => handleApproveCourse(course)}
                />
              </Tooltip>
              <IconButton color="info" onClick={() => handleOpenDetail(course)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        },
      },
    ];
  }, [data, isMobile]);

  const handleClearSearch = useCallback(() => {
    setName("");
  }, []);

  const handleOpenDetail = (course: ICourse) => {
    setCourse(course);
    setOpenDetail(true);
  };

  const handleApproveCourse = async (course: ICourse) => {
    try {
      await axios.patch("/api/admin/courses/" + course?._id);
      mutate(`/api/admin/courses?page=${page}&status=${status}&name=${nameSearch}`);
      toast.success("Edit course successfully");
    } catch (error) {
      toast.error("Edit course failed");
    }
  };

  // Approve list courses
  const handleApproveCourses = async () => {
    try {
      await axios.patch("/api/admin/courses", {
        listIds: listIdCourse,
      });
      mutate(`/api/admin/courses?page=${page}&status=${status}&name=${nameSearch}`);
      setListIdCourse([]);
      toast.success("Edit courses successfully");
    } catch (error) {
      toast.error("Edit courses failed");
    }
  };

  // Filter by status
  const handleFilterStatus = async (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    setPage(1);
  };

  return (
    <Box>
      <Typography gutterBottom variant="h3" textAlign={"center"}>
        Courses
      </Typography>

      <>
        {/* Filter */}
        <Grid container mb={2} spacing={1} alignItems={"center"}>
          <Grid item md={2} xs={12} order={isMobile ? 3 : 1}>
            <Button
              fullWidth
              variant="outlined"
              disabled={listIdCourse.length === 0}
              onClick={() => setConfirm(true)}
            >
              Approve all
            </Button>
          </Grid>
          <Grid item md={8} xs={12} order={2}>
            <SearchBox
              placeholder="Search name course"
              value={name}
              onChange={setName}
              onClear={handleClearSearch}
            />
          </Grid>
          <Grid item md={2} xs={12} order={isMobile ? 1 : 3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={handleFilterStatus}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value={""}>
                  <em>All</em>
                </MenuItem>
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"approved"}>Approved</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Table */}

        <Box width={"100%"} overflow={"auto"}>
          <DataGrid
            autoHeight
            checkboxSelection
            disableRowSelectionOnClick
            hideFooter
            getRowId={(row) => row._id}
            loading={isLoading}
            rows={data?.courses ?? []}
            columns={columns}
            rowCount={data?.total}
            onRowSelectionModelChange={(newSelectionModel) => setListIdCourse(newSelectionModel)}
          />
        </Box>
        {/* Controls */}
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

      {/* When error fetching data */}
      {error && (
        <Typography gutterBottom variant="h4" textAlign={"center"}>
          Having errors
        </Typography>
      )}

      {/* Open modal detail course */}
      {course && (
        <MyModal open={openDetail} onClose={() => setOpenDetail(false)}>
          <FormCourse course={course} type="watch" />
        </MyModal>
      )}

      {/* Dialog confirm approve */}
      {openConfirm && (
        <MyDialog
          title="Approve course"
          content="Do you want approve these courses?"
          onClose={() => setConfirm(false)}
          onSubmit={handleApproveCourses}
        />
      )}
    </Box>
  );
};

export default Courses;
