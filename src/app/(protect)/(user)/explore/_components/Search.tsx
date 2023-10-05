"use client";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const SearchBar = () => {
  const theme = useTheme();
  const [value, setValue] = useState<string>("");
  const [role, setRole] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  return (
    <Stack flexDirection={"row"} gap={2}>
      <TextField
        fullWidth
        spellCheck={false}
        autoComplete="off"
        placeholder="Search"
        value={value}
        InputProps={{
          endAdornment: (
            <>
              {value && (
                <Stack flexDirection={"row"} alignItems="center" gap={1}>
                  <IconButton onClick={() => setValue("")}>
                    <CloseIcon fontSize="small" color="action" />
                  </IconButton>
                  <IconButton className="bg-gradient" onClick={() => setValue("")}>
                    <SearchIcon color="action" fontSize="medium" />
                  </IconButton>
                </Stack>
              )}
            </>
          ),
        }}
        onChange={(e) => setValue(e.target.value)}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>role</InputLabel>
        <Select value={role} label="role" onChange={handleChange}>
          <MenuItem value={10}>User</MenuItem>
          <MenuItem value={20}>Teacher</MenuItem>
          <MenuItem value={30}>Admin</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SearchBar;
