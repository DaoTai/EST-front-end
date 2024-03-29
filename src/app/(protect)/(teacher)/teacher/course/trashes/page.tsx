"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import MyDialog from "@/components/custom/Dialog";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import FormCourse from "@/components/course-components/FormCourse";
import Spinner from "@/components/custom/Spinner";
import { Divider } from "@mui/material";
import { showErrorToast } from "@/utils/functions";

type IRow = ICourse & { id: string; order: number };

const TrashedCourses = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rows, setRows] = useState<IRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<IRow | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const columns: GridColDef[] = useMemo(() => {
    if (!isMobile)
      return [
        { field: "order", headerName: "Order", width: 10 },
        {
          field: "name",
          headerName: "Name",
          width: 150,
          flex: 1,
        },
        {
          field: "type",
          headerName: "Type",
          width: 150,
          flex: 1,
          renderCell: (params) => {
            return (
              <Chip
                size="small"
                color={params.value === "public" ? "success" : "info"}
                label={params.value}
                sx={{ textTransform: "capitalize" }}
              />
            );
          },
        },
        {
          field: "status",
          headerName: "Status",
          width: 110,
          flex: 1,
          renderCell: (params) => {
            return (
              <Chip
                size="small"
                color={params.value === "pending" ? "warning" : "info"}
                label={params.value}
                sx={{ textTransform: "capitalize" }}
              />
            );
          },
        },
        {
          field: "createdAt",
          headerName: "Created Time",
          width: 110,
          flex: 1,
        },
        {
          field: "deletedAt",
          headerName: "Deleted Time",
          width: 110,
          flex: 1,
        },
        {
          field: "actions",
          headerName: "Action",
          description: "Actions",
          sortable: false,
          flex: 2,
          renderCell: (params) => {
            return (
              <Stack flexDirection={"row"} flexWrap={"nowrap"} gap={1}>
                <Tooltip title="Infor">
                  <IconButton color="info" onClick={() => onOpenDetail(params.row)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Restore">
                  <IconButton color="success" onClick={() => handleRestore(String(params.id))}>
                    <RestoreFromTrashIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete forever" onClick={() => onOpenDialogConfirm(params.row)}>
                  <IconButton color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        },
      ];
    else {
      return [
        { field: "order", headerName: "Order", width: 10 },
        {
          field: "name",
          headerName: "Name",
          width: 150,
          flex: 1,
        },
        {
          field: "actions",
          headerName: "Action",
          description: "Actions",
          sortable: false,
          flex: 2,
          renderCell: (params) => {
            return (
              <Stack flexDirection={"row"} flexWrap={"nowrap"} gap={1}>
                <Tooltip title="Infor">
                  <IconButton color="info" onClick={() => onOpenDetail(params.row)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Restore">
                  <IconButton color="success" onClick={() => handleRestore(String(params.id))}>
                    <RestoreFromTrashIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete forever" onClick={() => onOpenDialogConfirm(params.row)}>
                  <IconButton color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        },
      ];
    }
  }, [isMobile]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/teacher/trashes/course");
      if (res.ok) {
        const data: ICourse[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const listCourses = data?.map((course, index) => ({
            ...course,
            order: index + 1,
            id: course._id,
            createdAt: dayjs(course.createdAt).format("MMMM D, YYYY"),
            deletedAt: dayjs(course.deletedAt).format("MMMM D, YYYY h:mm A"),
          }));

          setRows(listCourses);
        }
      }
      setLoading(false);
    })();
  }, []);

  const onOpenDialogConfirm = (course: IRow) => {
    setOpenDialogConfirm(true);
    setSelectedRow(course);
  };

  const onOpenDetail = (course: IRow) => {
    setOpenDetail(true);
    setSelectedRow(course);
  };

  const onCloseDetail = () => {
    setOpenDetail(false);
    setSelectedRow(null);
  };

  // Restore
  const handleRestore = async (id: string) => {
    try {
      const params = new URLSearchParams({ id });
      setLoading(true);
      await axios.patch("/api/teacher/trashes/course?" + params);
      toast.success("Restore course succesfully!");
      setRows((prev) => {
        return prev.filter((course) => course.id !== id);
      });
      setOpenDialogConfirm(false);
      setLoading(false);
      router.refresh();
    } catch (error) {
      showErrorToast(error);
    }
  };

  // Destroy / Force delete forever
  const handleDestroy = async () => {
    try {
      const params = new URLSearchParams({ id: selectedRow!.id });
      await axios.delete("/api/teacher/trashes/course?" + params);
      toast.success("Delete course succesfully!");
      setOpenDialogConfirm(false);
      setRows((prev) => {
        return prev.filter((course) => course.id !== selectedRow!.id);
      });
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (!isLoading && rows.length === 0) {
    return (
      <Box pt={1} pl={2} pr={2}>
        <Divider>
          <Typography
            variant="h4"
            textAlign={"center"}
            ml={"auto"}
            mr={"auto"}
            display={"block"}
            fontWeight={500}
            gutterBottom
          >
            Trash courses
          </Typography>
        </Divider>
        <Stack alignItems={"center"}>
          <Typography variant="body1" gutterBottom>
            No trash course
          </Typography>
          <Button variant="text" onClick={() => router.back()}>
            Back
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box pt={1} pl={2} pr={2}>
      <Divider>
        <Typography
          variant="h4"
          textAlign={"center"}
          ml={"auto"}
          mr={"auto"}
          display={"block"}
          gutterBottom
          fontWeight={500}
        >
          Trash courses
        </Typography>
      </Divider>
      {rows.length > 0 && (
        <Box>
          <DataGrid
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            checkboxSelection={false}
            loading={isLoading}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
          />
        </Box>
      )}
      {/* Dialog confirm delete */}
      {openDialogConfirm && (
        <MyDialog
          title="Delete course"
          content={"Do you want to delete course " + selectedRow?.name + " forever ?"}
          onClose={() => setOpenDialogConfirm(false)}
          onSubmit={handleDestroy}
        />
      )}

      {/* Dialog detail */}
      {openDetail && selectedRow && (
        <Dialog open fullScreen keepMounted onClose={onCloseDetail}>
          <Stack flexDirection={"row"}>
            <IconButton onClick={onCloseDetail}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
          </Stack>
          <Box pl={2} pr={2}>
            <FormCourse course={selectedRow} action="watch" />
          </Box>
        </Dialog>
      )}

      {isLoading && <Spinner />}
    </Box>
  );
};
export default TrashedCourses;
