"use client";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { memo, useRef } from "react";

type SearchBoxProps = {
  value: string;
  onClear?: () => any;
  onChange: (val: string) => void;
  onSearch?: () => any;
  placeholder?: string;
};

const SearchBox = ({
  placeholder = "Search",
  value,
  onClear,
  onChange,
  onSearch,
}: SearchBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = async () => {
    await onClear?.();
    inputRef.current?.focus();
  };

  return (
    <TextField
      fullWidth
      spellCheck={false}
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      InputProps={{
        endAdornment: (
          <Stack id="controls" flexDirection={"row"} alignItems="center" gap={1}>
            <IconButton onClick={handleClear}>
              <CloseIcon fontSize="small" color="action" />
            </IconButton>
            <IconButton className="bg-gradient" onClick={onSearch}>
              <SearchIcon color="action" fontSize="medium" />
            </IconButton>
          </Stack>
        ),
        inputRef: inputRef,
      }}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={async (e) => e.key === "Enter" && (await onSearch?.())}
    />
  );
};

export default memo(SearchBox);
