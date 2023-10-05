import { blue } from "@mui/material/colors";
export default {
  a: {
    color: blue[700],
  },
  img: {
    objectFit: "cover",
    objectPosition: "top",
  },
  ".btn-link": {
    textDecoration: "none",
    display: "block",
    padding: "8px 16px",
    borderRadius: "4px",
    width: "fit-content",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.15)",
    },
  },
  ".bg-gradient": {
    background: "linear-gradient(to right, #58a9eb, #aa99ff)",
  },
  ".underline-gradient": {
    position: "relative",
    width: "fit-content",
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
