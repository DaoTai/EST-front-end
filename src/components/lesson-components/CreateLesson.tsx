"use client";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import teacherLessonService from "@/services/teacher/lesson";
import { IFormLesson } from "@/types/ILesson";
import { convertObjectToFormData } from "@/utils/functions";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
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
    const idCourse = params.id as string;
    try {
      const data = await teacherLessonService.create(idCourse, formData);
      setOpen(false);
      mutate(`/api/teacher/lessons/${params.id}?page=${searchParams.get("page")}`);
      toast.success("Create lesson successfully");
    } catch (error) {
      toast.error("Create lesson failed");
    }
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
