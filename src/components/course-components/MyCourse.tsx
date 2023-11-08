import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import { memo, useMemo } from "react";

import { getDistanceTimeToNow } from "@/utils/functions";
import { Tooltip } from "@mui/material";

type IProps = {
  direction?: "column" | "row";
  data: IRegisterCourse;
};

const MyCourse = ({ direction = "column", data }: IProps) => {
  const progress = useMemo(() => {
    if (data.passedLessons && data.course.lessons.length > 0) {
      return (data.passedLessons.length / data.course.lessons.length) * 100;
    }
    return 0;
  }, [data]);

  return (
    <Stack flexDirection={direction} gap={1} alignItems={direction === "row" ? "center" : "start"}>
      <Image
        unoptimized
        src={data.course.thumbnail.uri}
        width={100}
        height={100}
        alt="thumbnail"
        style={{
          width: direction === "row" ? "100px" : "100%",
          height: direction === "row" ? "100px" : "200px",
          borderRadius: 8,
        }}
      />
      <Box flexGrow={2} p={1} pt={0} width={"100%"}>
        <Typography variant="h6">{data.course.name}</Typography>
        <Chip
          size="small"
          label={data.course.type}
          color={data.course.type === "private" ? "info" : "success"}
          sx={{ textTransform: "capitalize" }}
        />
        <Tooltip arrow title={progress + "%"} placement="top-end">
          <Slider
            max={100}
            value={progress}
            sx={{
              padding: 0,
              ".MuiSlider-thumb": {
                display: "none",
              },
              ".MuiSlider-track": {
                background: (theme) => theme.palette.gradient.main,
                border: "none",
              },
            }}
          />
        </Tooltip>
        <Typography variant="subtitle2">
          Latest learned time: {getDistanceTimeToNow(data.updatedAt)}
        </Typography>
      </Box>
    </Stack>
  );
};

export default memo(MyCourse);
