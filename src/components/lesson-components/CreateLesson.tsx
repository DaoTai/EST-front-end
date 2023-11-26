"use client";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { IFormLesson } from "@/types/ILesson";
import { convertObjectToFormData } from "@/utils/functions";
import FormLesson from "./FormLesson";

const CreateModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // Handle add lesson
  const handleAddLesson = async (value: IFormLesson) => {
    const formData = convertObjectToFormData(value);

    await fetch("/api/teacher/lessons/" + params.id, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setOpen(false);
        mutate(`/api/teacher/lessons/${params.id}?page=${searchParams.get("page")}`);
        toast.success("Create lesson successfully");
        // Buộc phải dùng method refresh nếu muốn quay lại route /teacher dữ liệu đồng bộ vì sẽ ko
        // sync data bởi SSR
        router.refresh();
      })
      .catch((err) => toast.error("Create lesson failed"));
  };

  return (
    <>
      <Tooltip title="Add lesson" placement="left">
        <Fab
          size="medium"
          className="bg-gradient"
          sx={{
            position: "fixed",
            bottom: !isMobile ? 10 : "80px",
            right: 10,
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        fullScreen
        sx={{ zIndex: theme.zIndex.modal }}
        onClose={() => setOpen(false)}
      >
        <Box>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        <Container sx={{ pb: 2 }}>
          <FormLesson type="create" onSubmit={handleAddLesson} />
        </Container>
      </Dialog>
    </>
  );
};

export default CreateModal;
