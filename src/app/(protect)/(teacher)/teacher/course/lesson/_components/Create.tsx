import AddIcon from "@mui/icons-material/Add";

import Fab from "@mui/material/Fab";

import { Tooltip } from "@mui/material";

const CreateModal = () => {
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
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default CreateModal;
