import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";

type Props = {
  title: string;
  content: string;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

export default function MyDialog({ title, content, onClose, onSubmit }: Props) {
  return (
    <Dialog
      open
      keepMounted
      fullWidth
      scroll="paper"
      sx={{
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
        <Button variant="outlined" onClick={onClose}>
          Disagree
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            await onSubmit();
            onClose();
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
