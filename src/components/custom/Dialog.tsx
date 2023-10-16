import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  title: string;
  content: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function MyDialog({ title, content, onClose, onSubmit }: Props) {
  return (
    <Dialog open keepMounted fullWidth scroll="paper" onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Disagree
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
