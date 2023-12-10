import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";

type IProps = {
  title: string;
  content: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

const MyDialog = ({ title, content, loading = false, onClose, onSubmit }: IProps) => {
  return (
    <Dialog
      open
      keepMounted
      fullWidth
      scroll="paper"
      sx={{
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
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={loading}
          color="info"
          variant="contained"
          onClick={async () => {
            await onSubmit();
            onClose();
          }}
          sx={{ pr: 2, pl: 2 }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
