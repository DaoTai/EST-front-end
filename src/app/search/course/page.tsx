"use client";
import SearchBox from "@/components/common/SearchBox";
import { Box, Chip, Divider, Grid, Rating, Stack, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import Image from "next/image";
import React, { useCallback, useState } from "react";

const CoursePage = () => {
  const theme = useTheme();
  const [value, setValue] = useState<string>("");
  const onClear = useCallback(() => {
    setValue("");
  }, []);

  const onSearch = useCallback(() => {
    console.log("Search");
  }, []);

  return (
    <Box p={2}>
      <SearchBox value={value} onClear={onClear} onChange={setValue} onSearch={onSearch} />
      <Stack mt={2} flexDirection={"row"} alignItems={"end"} gap={1}>
        <Chip label="Front-end" className="bg-gradient" clickable size="small" />
        <Chip label="Back-end" className="bg-gradient" clickable size="small" />
        <Chip label="DevOP" className="bg-gradient" clickable size="small" />
      </Stack>

      {/* List course */}
      <Stack gap={1} mt={2}>
        <Grid
          container
          p={1}
          columnSpacing={1}
          borderBottom={1}
          flexDirection={"row"}
          flexWrap={"wrap"}
          sx={{
            cursor: "pointer",
            img: {
              height: "auto",
              maxHeight: "100%",
              maxWidth: "100%",
              transition: "all linear 0.2s",
            },
            ":hover": {
              img: {
                filter: "opacity(0.9)",
              },
            },
          }}
        >
          <Grid item lg={3} md={3}>
            <Image src="/intro-1.jpg" alt="thumbnail-course" width={350} height={160} />
          </Grid>
          {/* Content  */}
          <Grid item lg={9} md={9}>
            <Typography variant="h6">Name course</Typography>
            <Typography variant="body1">Level: Beginner</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt in omnis natus rem
              commodi ea dolorem debitis, nam provident sed quia dolores error sunt. Placeat
              nesciunt in sequi inventore atque.
            </Typography>
            <Typography variant="subtitle1">Teacher: Dao Tai</Typography>
            <Stack flexDirection={"row"} alignItems={"center"} mb={1} gap={0.75}>
              <Typography variant="body2" fontWeight={600}>
                4.8
              </Typography>
              <Rating name="read-only" value={1} readOnly size="small" />
              <Typography variant="body2">(190.5)</Typography>
            </Stack>
            <Chip label="Private" size="small" />
            <Typography variant="subtitle2" mt={1}>
              Open time: 24/10/2023
            </Typography>
            <Typography variant="subtitle2">Close time: 24/10/2023</Typography>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CoursePage;
