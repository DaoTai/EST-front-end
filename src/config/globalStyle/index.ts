import { blue } from "@mui/material/colors";
export default {
  a: {
    color: blue[700],
  },
  ".bg-gradient": {
    background: "linear-gradient(to right, #58a9eb, #aa99ff)",
  },
  ".text-gradient": {
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 3,
      borderRadius: 2,
      background: "linear-gradient(to right, #58a9eb, #aa99ff)",
    },
  },
};
