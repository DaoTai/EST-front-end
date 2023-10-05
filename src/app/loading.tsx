import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop() {
  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
