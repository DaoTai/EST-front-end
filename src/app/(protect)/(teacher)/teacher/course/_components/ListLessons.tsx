"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";
import PreviewLesson from "@/components/course-components/PreviewLesson";
import Spinner from "@/components/custom/Spinner";
import { IconButton, Tooltip } from "@mui/material";
import MyDialog from "@/components/custom/Dialog";
import axios from "axios";
import { toast } from "react-toastify";
const fetcher: Fetcher<{ listLessons: ILesson[]; maxPage: number }, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const ListLessons = () => {
  const params = useParams();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [page, setPage] = useState<number>(1);
  const maxPageRef = useRef<number>(1);
  const { data, isLoading, error } = useSWR(
    `/api/teacher/lessons/${params.id}?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        maxPageRef.current = data.maxPage;
      },
    }
  );

  // Click icon trash
  const onSelectLesson = (val: ILesson) => {
    setOpenDialog(true);
    setLesson(val);
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleDeleteLesson = useCallback(async () => {
    try {
      await axios.delete("/api/teacher/lessons/detail/" + lesson?._id);
      mutate(`/api/teacher/lessons/${params.id}?page=${page}`);
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
          <Stack key={lesson._id} flexDirection={"row"} alignItems={"center"} width={"100%"}>
            <Typography variant="body2" minWidth={20}>
              {i + 1}
            </Typography>
            <Box
              flexGrow={2}
              component={Link}
              href={"/teacher/lessons/" + lesson._id}
              sx={{ textDecoration: "none", color: "text.primary" }}
            >
              <PreviewLesson lesson={lesson} />
            </Box>
            <Tooltip arrow title="Delete lesson">
              <IconButton color="error" sx={{ ml: 1 }} onClick={() => onSelectLesson(lesson)}>
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}
      </Stack>

      <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
        <Pagination
          variant="outlined"
          color="primary"
          page={page}
          count={maxPageRef.current}
          onChange={(e, val) => setPage(val)}
        />
      </Stack>

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
