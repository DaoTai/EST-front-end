import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Backdrop open>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loading;
