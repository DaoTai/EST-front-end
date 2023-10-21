import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Backdrop open>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Spinner;
