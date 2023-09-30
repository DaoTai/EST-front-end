import { Button, Chip, Fab, IconButton, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, useState } from "react";

const ListFavProgrammingLanguages = () => {
  const [languages, setLanguages] = useState<string[]>(["Javascript", "Python", "C++", "HTML"]);
  const [newLang, setNewLang] = useState<string>("");

  const handleDeleteLanguage = (lang: string) => {
    const newLangs = languages.filter((oldLang) => oldLang !== lang);
    setLanguages(newLangs);
  };

  const handleAddLang = () => {
    if (newLang.trim() && !languages.includes(newLang.trim()))
      setLanguages((prev) => [...prev, newLang.trim()]);
    setNewLang("");
  };

  return (
    <FormControl fullWidth>
      <FormLabel>Love programming languages</FormLabel>
      <Stack flexDirection="row" mt={1} gap={2} flexWrap={"wrap"}>
        {languages.map((lang, i) => (
          <Chip
            key={i}
            label={lang}
            className="bg-gradient"
            onDelete={() => handleDeleteLanguage(lang)}
          />
        ))}
      </Stack>

      <Accordion sx={{ ml: "auto", mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2">Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <TextField
              fullWidth
              margin="dense"
              spellCheck={false}
              size="small"
              placeholder="Enter new language"
              value={newLang}
              onChange={(e) => setNewLang(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && handleAddLang();
              }}
            />
            <IconButton
              color="success"
              disabled={languages.includes(newLang.trim())}
              sx={{ border: 1 }}
              onClick={handleAddLang}
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
