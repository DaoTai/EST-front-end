"use client";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { memo } from "react";

type SearchBoxProps = {
  value: string;
  onClear: () => any;
  onChange: (val: string) => void;
  onSearch: () => any;
};

const SearchBox = ({ value, onClear, onChange, onSearch }: SearchBoxProps) => {
  return (
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
                <IconButton onClick={onClear}>
                  <CloseIcon fontSize="small" color="action" />
                </IconButton>
                <IconButton className="bg-gradient" onClick={onSearch}>
                  <SearchIcon color="action" fontSize="medium" />
                </IconButton>
              </Stack>
            )}
          </>
        ),
      }}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={async (e) => e.key === "Enter" && (await onSearch())}
    />
  );
};

export default memo(SearchBox);
