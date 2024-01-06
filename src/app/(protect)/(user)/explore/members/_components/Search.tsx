"use client";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import { ForwardRefRenderFunction, forwardRef, memo, useImperativeHandle, useState } from "react";
import SearchBox from "@/components/common/SearchBox";

type IProps = { onSearch: (value: string, role: string) => Promise<void> };
type IRef = { value: string; role: string };

const SearchBar: ForwardRefRenderFunction<IRef, IProps> = ({ onSearch }, ref) => {
  const [value, setValue] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleClear = async () => {
    setValue("");
    try {
      await onSearch("", role);
    } catch (error) {}
  };

  const handleSearch = async () => {
    try {
      await onSearch(value, role);
    } catch (error) {}
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
        <SearchBox
          value={value}
          onChange={setValue}
          onClear={handleClear}
          onSearch={handleSearch}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>role</InputLabel>
          <Select
            value={role}
            label="role"
            onChange={handleChange}
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default memo(forwardRef(SearchBar));
