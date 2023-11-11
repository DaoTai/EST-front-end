"use client";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import Box from "@mui/material/Box";
import Modal, { ModalProps } from "@mui/material/Modal";

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
  pl: 2,
  pr: 2,
  maxHeight: "100vh",
  minWidth: 400,
  overflowY: "overlay",
};

export default function MyModal({ open, onClose, children }: ModalProps) {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={isMedium ? "100vw" : "auto"} height={isMedium ? "100vh" : "auto"}>
        {children}
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 5, right: 10 }}
          onClick={onClose as any}
        >
          <Close fontSize="large" />
        </IconButton>
      </Box>
    </Modal>
  );
}
