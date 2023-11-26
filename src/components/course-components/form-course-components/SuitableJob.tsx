"use client";
import React, { ReactNode, memo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type IProps = {
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
  error: boolean;
  helperText: ReactNode;
};

const SuitableJob = ({ name, value, onChange, onBlur, error, helperText }: IProps) => {
  const [inputValue, setInputValue] = useState("");

  const options = [
    "Front-end Dev",
    "Back-end Dev",
    "Fullstack Dev",
    "Fullstack Mobile",
    "AI Engineering",
  ]; // Danh sách các giá trị

  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={(event, newValue) => {
        onChange(name)(newValue ? newValue : "");
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          name={name}
          label="Suitable job"
          variant="outlined"
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      )}
      freeSolo
      selectOnFocus
      onBlur={() => {
        // Nếu giá trị không có trong danh sách, tạo giá trị mới
        if (!options.includes(inputValue)) {
          onChange(name)(inputValue);
        }
      }}
    />
  );
};

export default memo(SuitableJob);
