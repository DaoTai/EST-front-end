"use client";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.appBar }}>
      <CircularProgress color="info" />
    </Backdrop>
  );
};

export default Spinner;
