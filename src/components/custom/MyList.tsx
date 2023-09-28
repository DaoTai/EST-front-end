import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
const MyList = styled(List)(({ theme }) => ({
  ".MuiListItem-root": {
    cursor: "pointer",
    display: "flex",
    width: "100%",
    color: theme.palette.text.primary,
    pl: 0.5,
    pt: 1.5,
    pb: 1.5,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    borderRadius: 1,
  },
}));

export default MyList;
