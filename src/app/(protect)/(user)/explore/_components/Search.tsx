"use client";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { ForwardRefRenderFunction, forwardRef, memo, useImperativeHandle, useState } from "react";

type IProps = { totalResult: number; onSearch: (value: string, role: string) => Promise<void> };
type IRef = { value: string; role: string };

const SearchBar: ForwardRefRenderFunction<IRef, IProps> = ({ totalResult, onSearch }, ref) => {
  const [value, setValue] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        value,
        role,
      };
    },
    [value, role]
  );

  return (
    <>
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
                    <IconButton className="bg-gradient" onClick={() => onSearch(value, role)}>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {value.trim() && (
        <Typography variant="subtitle1" gutterBottom marginTop={1}>
          Search results: <b>{totalResult}</b>
        </Typography>
      )}
    </>
  );
};

export default memo(forwardRef(SearchBar));
