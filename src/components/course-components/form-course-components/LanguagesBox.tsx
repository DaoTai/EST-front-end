"use client";
import { OPTIONS_PROGRAMMING_LANGUAGES } from "@/utils/constants/common";
import Add from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { memo, useState } from "react";
type IProps = {
  programmingLanguages: string[];
  onChange: (programmingLanguages: string[]) => void;
};

const ProgrammingLanguagesBox: React.FC<IProps> = ({ programmingLanguages, onChange }) => {
  const [programmingLang, setProgramingLang] = useState<string>("");

  // Handle add programming lang
  const handleAddProgrammingLangs = () => {
    if (programmingLang.trim() && !programmingLanguages.includes(programmingLang.trim())) {
      onChange([...programmingLanguages, programmingLang.trim()]);
      setProgramingLang("");
    }
  };

  // Handle delete programming lang
  const handleDeleteProgrammingLangs = (deletedLang: string) => {
    const updateLangs = programmingLanguages.filter((lang) => lang !== deletedLang);
    onChange(updateLangs);
  };

  return (
    <>
      <Stack flexDirection={"row"} flexWrap={"nowrap"} alignItems={"center"} gap={1}>
        <Autocomplete
          freeSolo
          selectOnFocus
          fullWidth
          placeholder="Add used programming languages/technologies"
          options={OPTIONS_PROGRAMMING_LANGUAGES}
          value={programmingLang}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            setProgramingLang(newValue ? newValue : "");
          }}
          inputValue={programmingLang}
          onInputChange={(event, newInputValue) => {
            setProgramingLang(newInputValue);
          }}
          onBlur={() => {
            // Nếu giá trị không có trong danh sách, tạo giá trị mới
            if (!OPTIONS_PROGRAMMING_LANGUAGES.includes(programmingLang)) {
              setProgramingLang(programmingLang);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Programming languages/technologies" variant="outlined" />
          )}
        />
        <IconButton onClick={handleAddProgrammingLangs}>
          <Add />
        </IconButton>
      </Stack>

      {
        <Stack flexDirection={"row"} flexWrap={"wrap"} mt={2} gap={1}>
          {programmingLanguages.map((lang, index) => (
            <Chip
              key={index}
              label={lang}
              className="bg-gradient"
              onDelete={() => handleDeleteProgrammingLangs(lang)}
            />
          ))}
        </Stack>
      }
    </>
  );
};

export default memo(ProgrammingLanguagesBox);
