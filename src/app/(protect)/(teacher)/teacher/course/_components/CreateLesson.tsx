"use client";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { useState } from "react";
import FormLesson from "./FormLesson";

const CreateModal = () => {
  const [open, setOpen] = useState<boolean>(false);
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
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
        </Box>
        <FormLesson />
      </Dialog>
    </>
  );
};

export default CreateModal;
