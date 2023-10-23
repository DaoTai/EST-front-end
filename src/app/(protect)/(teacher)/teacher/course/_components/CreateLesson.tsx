"use client";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import FormLesson from "./FormLesson";
import { toast } from "react-toastify";
import { IFormLesson } from "@/types/ILesson";
import { convertObjectToFormData } from "@/utils/functions";

const CreateModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();

  const handleAddLesson = async (value: IFormLesson) => {
    const formData = convertObjectToFormData(value);

    const res = await fetch("/api/teacher/lessons/" + params.id, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      toast.success("Add lesson successfully");
      setOpen(false);
    }
    {
      toast.error("Add lesson failed");
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
            bottom: 10,
            right: 10,
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <Box mb={2}>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBackIosNewIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Container>
          <FormLesson type="create" onSubmit={handleAddLesson} />
        </Container>
      </Dialog>
    </>
  );
};

export default CreateModal;
