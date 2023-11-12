import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import { getDistanceTimeToNow } from "@/utils/functions";
import Image from "next/image";
import { memo, useMemo } from "react";
import MyList from "../custom/MyList";
import { ListItem, ListItemText, Stack } from "@mui/material";
import dayjs from "dayjs";

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
    <Grid container columnSpacing={1} alignItems={direction === "row" ? "center" : "start"}>
      <Grid item sm={direction === "row" ? 4 : 12} xs={direction === "row" ? 4 : 12}>
        <Image
          unoptimized
          src={data.course.thumbnail.uri}
          width={100}
          height={100}
          alt="thumbnail"
          style={{
            width: direction === "row" ? "100px" : "100%",
            height: direction === "row" ? "100px" : "200px",
            borderRadius: 4,
            flex: "1 1 auto",
          }}
        />
      </Grid>
      <Grid item sm={direction === "row" ? 8 : 12} xs={direction === "row" ? 8 : 12}>
        <Box p={1}>
          <Typography variant="h6">{data.course.name}</Typography>
          <Chip
            size="small"
            label={data.course.type}
            color={data.course.type === "private" ? "info" : "success"}
            sx={{ textTransform: "capitalize" }}
          />
          {direction === "column" && (
            <Stack mt={1}>
              <Typography variant="body1">Category: {data.course.category}</Typography>
              <Typography variant="body1">
                Started from: {dayjs(data.createdAt).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body1">Total lessons: {data.course.lessons.length}</Typography>
              <Typography variant="body1">Pass lessons: {data.passedLessons.length}</Typography>
              <Typography variant="body1">Completed progress: {progress}%</Typography>
            </Stack>
          )}
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
      </Grid>
    </Grid>
  );
};

export default memo(MyCourse);
