"use client";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "@mui/material/Rating";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

const FilterSearch = ({ onClose }: { onClose: () => void }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const levelQuery = searchParams.get("level");
  const typeQuery = searchParams.get("type");
  const ratingQuery = searchParams.get("rating");
  const sortQuery = searchParams.get("sort");

  // Reset query
  const handleReset = () => {
    router.push(pathName);
    onClose();
  };

  // Handle search
  const handleSearch = (query: string) => {
    router.push(query);
    onClose();
  };

  const searchByLevel = (level: string) => {
    if (String(level) === levelQuery) return;
    let query = pathName + "?level=" + level;

    if (ratingQuery) {
      query += "&rating=" + ratingQuery;
    }
    if (typeQuery) {
      query += "&type=" + typeQuery;
    }
    if (sortQuery) {
      query += "&sort=" + sortQuery;
    }
    handleSearch(query);
  };

  const searchByType = (type: string) => {
    if (String(type) === typeQuery) return;
    let query = pathName + "?type=" + type;

    if (levelQuery) {
      query += "&level=" + levelQuery;
    }
    if (ratingQuery) {
      query += "&rating=" + ratingQuery;
    }
    if (sortQuery) {
      query += "&sort=" + sortQuery;
    }
    handleSearch(query);
  };

  const searchByRating = (rating: number) => {
    if (String(rating) === ratingQuery) return;

    let query = pathName + "?rating=" + rating;
    if (levelQuery) {
      query += "&level=" + levelQuery;
    }
    if (typeQuery) {
      query += "&type=" + typeQuery;
    }
    if (sortQuery) {
      query += "&sort=" + sortQuery;
    }
    handleSearch(query);
  };

  const searchBySort = (sort: number) => {
    if (String(sort) === sortQuery) return;
    let query = pathName + "?sort=" + sort;

    if (levelQuery) {
      query += "&level=" + levelQuery;
    }
    if (typeQuery) {
      query += "&type=" + typeQuery;
    }
    if (ratingQuery) {
      query += "&rating=" + ratingQuery;
    }
    handleSearch(query);
  };

  return (
    <Stack gap={1} maxWidth={"fit-content"} alignItems={"flex-start"} p={2} minWidth={"15vw"}>
      <Tooltip title="Reset" placement="left" arrow>
        <IconButton onClick={handleReset}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>

      {/* Sort by time */}
      <Box>
        <Typography variant="h6">Time</Typography>
        <FormControl>
          <RadioGroup>
            <FormControlLabel
              value={1}
              control={<Radio onChange={() => searchBySort(1)} />}
              label="Oldest"
              checked={sortQuery === "1"}
            />
            <FormControlLabel
              value={-1}
              control={<Radio onChange={() => searchBySort(-1)} />}
              label="Newest"
              checked={sortQuery === "-1"}
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Rating */}
      <Box>
        <Typography variant="h6">Ratings</Typography>
        <FormControl>
          <RadioGroup>
            {[1, 2, 3, 4, 5].map((value) => {
              return (
                <FormControlLabel
                  control={<Radio />}
                  checked={String(value) === ratingQuery}
                  value={value}
                  onClick={() => searchByRating(value)}
                  label={
                    <Stack flexDirection={"row"} gap={1}>
                      <Rating readOnly value={value} precision={0.5} size="small" />
                      <Typography variant="body2">{value}+</Typography>
                    </Stack>
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Levels */}
      <Box textTransform={"capitalize"}>
        <Typography variant="h6">Levels</Typography>
        <FormGroup>
          {["beginner", "fresher", "junior", "senior", "all"].map((level, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox onChange={(event) => searchByLevel(event.target.value)} />}
              checked={levelQuery === level}
              value={level}
              label={level}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Types */}
      <Box textTransform={"capitalize"}>
        <Typography variant="h6">Type</Typography>
        <FormGroup>
          {["public", "private"].map((type, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox onChange={(event) => searchByType(event.target.value)} />}
              checked={typeQuery === type}
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
