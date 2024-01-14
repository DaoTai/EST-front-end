"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { memo, useState } from "react";

type IProps = {
  title: string;
  content: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

const MyDialog = ({ title, content, loading = false, onClose, onSubmit }: IProps) => {
  const [pending, setPending] = useState(false);
  const handleSubmit = async () => {
    setPending(true);
    await onSubmit();
    setPending(false);
    onClose();
  };
  return (
    <Dialog
      open
      keepMounted
      fullWidth
      scroll="paper"
      sx={{
        zIndex: (theme) => theme.zIndex.snackbar,
        textTransform: "capitalize",
        ".MuiDialog-container": {
          alignItems: "start",
        },
      }}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ color: (theme) => theme.palette.text.primary, borderColor: "currentcolor" }}
          disabled={loading || pending}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          disabled={loading || pending}
          color="info"
          variant="contained"
          onClick={handleSubmit}
          sx={{ pr: 2, pl: 2 }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(MyDialog);
