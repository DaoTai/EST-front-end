import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";

const ListFavProgrammingLanguages = ({
  value = [],
  name,
  setFieldValue,
}: {
  value: string[];
  name: string;
  setFieldValue: (field: string, value: string[]) => void;
}) => {
  const [newLang, setNewLang] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Delete lang
  const handleDeleteLanguage = (lang: string) => {
    const newLangs = value.filter((oldLang) => oldLang !== lang);
    setFieldValue(name, newLangs);
  };

  // Add lang
  const handleAddLanguage = () => {
    if (newLang.trim() && !value?.includes(newLang.trim()))
      setFieldValue(name, [...value, newLang.trim()]);
    setNewLang("");
    inputRef.current?.focus();
  };

  return (
    <FormControl fullWidth>
      <FormLabel>Love programming languages</FormLabel>
      {value.length > 0 && (
        <Stack flexDirection="row" mt={1} gap={2} flexWrap={"wrap"}>
          {value?.map((lang, i) => (
            <Chip
              key={i}
              label={lang}
              className="bg-gradient"
              onDelete={() => handleDeleteLanguage(lang)}
            />
          ))}
        </Stack>
      )}

      <Accordion sx={{ ml: "auto", mt: 2 }}>
        <AccordionSummary expandIcon={<AddIcon />}></AccordionSummary>
        <AccordionDetails>
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <TextField
              fullWidth
              margin="dense"
              spellCheck={false}
              size="small"
              placeholder="Enter new language"
              ref={inputRef}
              value={newLang}
              onChange={(e) => setNewLang(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && handleAddLanguage();
              }}
            />
            <IconButton
              color="success"
              disabled={value?.includes(newLang.trim())}
              sx={{ border: 1 }}
              onClick={handleAddLanguage}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </FormControl>
  );
};

export default ListFavProgrammingLanguages;
