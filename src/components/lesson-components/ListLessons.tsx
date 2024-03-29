"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher, mutate } from "swr";

import MyDialog from "@/components/custom/Dialog";
import Spinner from "@/components/custom/Spinner";
import dayjs from "dayjs";

type IProps = { idCourse: string; preHrefLesson?: string };

const fetcher: Fetcher<{ listLessons: ILesson[]; maxPage: number }, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const ListLessons = ({ idCourse, preHrefLesson = "/teacher/lessons/" }: IProps) => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const { data, isLoading, error } = useSWR(
    `/api/teacher/lessons/${idCourse}?page=${searchParams.get("page")}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onSuccess(data, key, config) {},
    }
  );

  useEffect(() => {
    if (data) setMaxPage(data.maxPage);
  }, [data]);

  // Handle moving page
  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(path + "?page=" + value);
  };

  // Click icon trash
  const onSelectLesson = (val: ILesson) => {
    setOpenDialog(true);
    setLesson(val);
  };

  // Close dialog
  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  // Delete lesson
  const handleDeleteLesson = useCallback(async () => {
    try {
      await axios.delete("/api/teacher/lessons/detail/" + lesson?._id);
      mutate(`/api/teacher/lessons/${idCourse}?page=${searchParams.get("page")}`);
      toast.success("Delete lesson " + lesson?.name + " successfully");
    } catch (error) {
      toast.error("Delete lesson " + lesson?.name + " failed");
    }
  }, [lesson]);

  if (error)
    return (
      <Typography variant="body1" textAlign={"center"}>
        Error
      </Typography>
    );

  if (!data?.listLessons)
    return isLoading ? (
      <Spinner />
    ) : (
      <Typography variant="body1" textAlign={"center"}>
        No lesson
      </Typography>
    );

  return (
    <>
      <Stack gap={2}>
        {data.listLessons.map((lesson, i) => (
          <Stack
            key={lesson._id}
            borderBottom={1}
            flexDirection={"row"}
            pl={1}
            pr={1}
            alignItems={"center"}
            width={"100%"}
            sx={{ borderColor: "divider" }}
          >
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
              component={Link}
              flexGrow={2}
              pb={1}
              href={preHrefLesson + lesson._id}
            >
              <Box flexGrow={2}>
                <Typography variant="body1" fontWeight={500}>
                  {lesson.name}
                </Typography>
              </Box>
              <Stack flexDirection={"row"} gap={1}>
                {lesson.reports.length > 0 && (
                  <Chip size="small" label={lesson.reports.length + " report"} />
                )}
                <Tooltip title={dayjs(lesson.createdAt).format("DD/MM/YYYY")}>
                  <Chip
                    size="small"
                    label={lesson.isLaunching ? "Launched" : "Unlaunched"}
                    color={lesson.isLaunching ? "success" : "warning"}
                  />
                </Tooltip>
              </Stack>
            </Stack>
            <Tooltip arrow title="Delete lesson">
              <IconButton color="error" sx={{ ml: 1 }} onClick={() => onSelectLesson(lesson)}>
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}
      </Stack>

      {data.listLessons.length > 0 ? (
        <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
          <Pagination
            variant="outlined"
            color="primary"
            page={Number(searchParams?.get("page")) || 1}
            count={maxPage}
            onChange={handlePaginate}
          />
        </Stack>
      ) : (
        <Typography variant="h6" gutterBottom textAlign={"center"}>
          You have no lesson
        </Typography>
      )}
      {/* Loading data */}
      {isLoading && <Spinner />}

      {/* Dialog  */}
      {openDialog && (
        <MyDialog
          title="Delete lesson"
          content={"You want to delete " + lesson?.name + "?"}
          onClose={handleCloseDialog}
          onSubmit={handleDeleteLesson}
        />
      )}
    </>
  );
};

export default ListLessons;
