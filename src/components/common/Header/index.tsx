import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Actions from "./Actions";
import Logo from "./Logo";
import Title from "./Title";
import SearchBar from "./SearchBar";
import { Box, Stack } from "@mui/material";
const Header = () => {
  return (
    <AppBar position="fixed" sx={{ maxHeight: 80 }}>
      <Toolbar sx={{ pt: 1, pb: 1, bgcolor: "white.main", justifyContent: "space-between" }}>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Logo />
          <Title />
        </Stack>
        <SearchBar />

        <Actions />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
