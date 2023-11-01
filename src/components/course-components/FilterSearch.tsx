"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

const FilterSearch = ({ onClose }: { onClose: () => void }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const searchByLevel = (level: string) => {
    router.push(pathName + "?level=" + level);
    onClose();
  };

  const searchByType = (type: string) => {
    router.push(pathName + "?type=" + type);
    onClose();
  };

  return (
    <Stack gap={1} maxWidth={"fit-content"} p={2}>
      {/* <Box>
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
      </Box> */}
      <Divider />
      <Box textTransform={"capitalize"}>
        <Typography variant="h6">Levels</Typography>
        <FormGroup>
          {["beginner", "fresher", "junior", "senior", "all"].map((level, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox onChange={(event) => searchByLevel(event.target.value)} />}
              checked={searchParams.get("level") === level}
              value={level}
              label={level}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider />
      <Box textTransform={"capitalize"}>
        <Typography variant="h6">Type</Typography>
        <FormGroup>
          {["public", "private"].map((type, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox onChange={(event) => searchByType(event.target.value)} />}
              checked={searchParams.get("type") === type}
              value={type}
              label={type}
            />
          ))}
        </FormGroup>
      </Box>
    </Stack>
  );
};

export default memo(FilterSearch);
