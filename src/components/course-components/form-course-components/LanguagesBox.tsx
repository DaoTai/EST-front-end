"use client";
import Add from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { memo, useState } from "react";
type IProps = {
  programmingLanguages: string[];
  onChange: (programmingLanguages: string[]) => void;
};

const ProgrammingLanguagesBox = ({ programmingLanguages, onChange }: IProps) => {
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
        <TextField
          fullWidth
          placeholder="Add programming languages"
          value={programmingLang}
          onChange={(e) => setProgramingLang(e.target.value)}
        />
        <IconButton onClick={handleAddProgrammingLangs}>
          <Add />
        </IconButton>
      </Stack>

      {
        <Stack flexDirection={"row"} mt={2} gap={1}>
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
