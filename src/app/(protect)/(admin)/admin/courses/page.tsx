"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import Spinner from "@/components/custom/Spinner";
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
  const [openConfirmApprove, setConfirmApprove] = useState<boolean>(false);
  const [openConfirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [listIdCourse, setListIdCourse] = useState<GridRowId[]>([]);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const nameSearch = useDebounce(name, 1000);

  const { data, isLoading, error, isValidating } = useSWR(
    `/api/admin/courses?page=${page}&status=${status}&name=${nameSearch}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: "name", headerName: "Name", width: 100 },
      {
        field: "status",
        headerName: "Status",
        width: 100,
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
        field: "lessons",
        headerName: "Lessons",
        width: 80,
        renderCell: (params) => {
          return <Typography variant="body1">{params.row.lessons.length}</Typography>;
        },
      },
      {
        field: "reports",
        headerName: "Reports",
        width: 80,
        renderCell: (params) => {
          const course: ICourse = params.row;
          const totalReports = course.lessons.reduce((acc, lesson) => {
            return acc + lesson.reports.length;
          }, 0);

          return <Typography variant="body1">{totalReports}</Typography>;
        },
      },

      {
        field: "createdBy",
        headerName: "Teacher",
        width: 200,
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
              <Tooltip arrow title={course.status === "approved" ? "Approving" : "Pending"}>
                <Switch
                  color="success"
                  checked={course.status === "approved"}
                  onChange={() => handleApproveCourse(course)}
                />
              </Tooltip>
              <Tooltip arrow title="See">
                <IconButton color="info" onClick={() => handleOpenDetail(course)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Delete" onClick={() => handleOpenDelete(course)}>
                <IconButton color="error">
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ];
  }, [data]);

  const handleClearSearch = useCallback(() => {
    setName("");
  }, []);

  const handleOpenDetail = (course: ICourse) => {
    setCourse(course);
    setOpenDetail(true);
  };

  // Handle soft-delete single course
  const handleOpenDelete = async (course: ICourse) => {
    setCourse(course);
    setConfirmDelete(true);
  };

  // Approve single course
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
  const handleApproveCourses = useCallback(async () => {
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
  }, [course]);

  // Filter by status
  const handleFilterStatus = async (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleDeleteCouse = useCallback(async () => {
    try {
      await axios.delete("/api/admin/courses/" + course?._id);
      mutate(`/api/admin/courses?page=${page}&status=${status}&name=${nameSearch}`);
      toast.success("Delete course successfully");
    } catch (error) {
      toast.error("Delete course failed");
    }
  }, [course]);

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
              onClick={() => setConfirmApprove(true)}
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
          <Typography variant="body2" gutterBottom>
            Total courses: {data?.total}
          </Typography>
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
          <Box width={"100vw"} p={2}>
            <FormCourse course={course} type="watch" />
            <Button
              LinkComponent={Link}
              href={"/teacher/course/" + course._id}
              color="info"
              variant="text"
            >
              More
            </Button>
          </Box>
        </MyModal>
      )}

      {/* Dialog confirm approve */}
      {openConfirmApprove && (
        <MyDialog
          title="Approve course"
          content="Do you want to approve these courses?"
          onClose={() => setConfirmApprove(false)}
          onSubmit={handleApproveCourses}
        />
      )}

      {/* Dialog confirm delete forever */}
      {openConfirmDelete && (
        <MyDialog
          title="Delete course"
          content={`Do you want to delete forever course: ${course?.name} by ${course?.createdBy.username}? You will be not able to restore it!`}
          onClose={() => setConfirmDelete(false)}
          onSubmit={handleDeleteCouse}
        />
      )}

      {isValidating && <Spinner />}
    </Box>
  );
};

export default Courses;
