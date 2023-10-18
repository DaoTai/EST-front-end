"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "@mui/material/Rating";

const FilterSearch = () => {
  return (
    <Stack gap={1} maxWidth={"fit-content"} pr={1.5}>
      <Box>
        <Typography variant="h6">Ratings</Typography>
        <FormControl>
          <RadioGroup>
            <FormControlLabel
              value={4.5}
              control={<Radio />}
              label={
                <Stack flexDirection={"row"} gap={1}>
                  <Rating readOnly value={4.5} precision={0.5} size="small" />
                  <Typography variant="body2">4.5 & up</Typography>
                </Stack>
              }
            />

            <FormControlLabel
              value={3.5}
              control={<Radio />}
              label={
                <Stack flexDirection={"row"} gap={1}>
                  <Rating readOnly value={3.5} precision={0.5} size="small" />
                  <Typography variant="body2">3.5 & up</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              value={2.5}
              control={<Radio />}
              label={
                <Stack flexDirection={"row"} gap={1}>
                  <Rating readOnly value={2.5} precision={0.5} size="small" />
                  <Typography variant="body2">2.5 & up</Typography>
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Divider />
      <Box textTransform={"capitalize"}>
        <Typography variant="h6">Levels</Typography>
        <FormGroup>
          {["beginner", "fresher", "junior", "senior", "all"].map((level, i) => (
            <FormControlLabel key={i} control={<Checkbox />} value={level} label={level} />
          ))}
        </FormGroup>
      </Box>

      <Divider />
      <Box textTransform={"capitalize"}>
        <Typography variant="h6">Type</Typography>
        <FormGroup>
          {["public", "private"].map((level, i) => (
            <FormControlLabel key={i} control={<Checkbox />} value={level} label={level} />
          ))}
        </FormGroup>
      </Box>
    </Stack>
  );
};

export default FilterSearch;
