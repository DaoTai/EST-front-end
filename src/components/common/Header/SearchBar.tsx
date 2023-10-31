"use client";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import styled from "@mui/material/styles/styled";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBox = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "110%",
  left: 0,
  right: 0,
  height: 250,
  boxShadow: theme.shadows[10],
}));

const SearchBar = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [value, setValue] = useState<string>("");
  const [showBox, setShowBox] = useState<boolean>(false);

  return (
    <FormControl sx={{ position: "relative", width: isLargeScreen ? 420 : "unset" }}>
      {isMobile ? (
        <IconButton
          onClick={() => router.push("/search")}
          sx={{ background: theme.palette.gradient.main }}
        >
          <SearchIcon fontSize="medium" sx={{ color: "#fff" }} />
        </IconButton>
      ) : (
        <TextField
          spellCheck={false}
          autoComplete="off"
          placeholder="Search"
          value={value}
          sx={{
            ".MuiInputBase-root": {
              borderRadius: 8,
            },
            input: {
              pt: 1.5,
              pb: 1.5,
            },
          }}
          InputProps={{
            startAdornment: <SearchIcon color="action" fontSize="medium" />,
            endAdornment: (
              <>
                {value && (
                  <IconButton onClick={() => setValue("")}>
                    <CloseIcon fontSize="medium" color="action" />
                  </IconButton>
                )}
              </>
            ),
          }}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setShowBox(true)}
          onBlur={() => setShowBox(false)}
        />
      )}

      {showBox && (
        <Fade in={showBox}>
          <SearchBox>
            {/* List courses */}
            <List
              subheader={
                <ListSubheader>
                  <Divider>
                    <Typography variant="h6" color="text.primary" fontWeight={700}>
                      Courses
                    </Typography>
                  </Divider>
                </ListSubheader>
              }
            >
              <ListItem component={Link} href="/">
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>

            {/* List videos */}
            <List
              subheader={
                <ListSubheader>
                  <Divider>
                    <Typography variant="h6" color="text.primary" fontWeight={700}>
                      Videos
                    </Typography>
                  </Divider>
                </ListSubheader>
              }
            >
              <ListItem component={Link} href="/">
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary="C++" />
              </ListItem>
            </List>
          </SearchBox>
        </Fade>
      )}
    </FormControl>
  );
};

export default SearchBar;
