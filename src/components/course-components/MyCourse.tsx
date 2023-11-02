import { getDistanceTimeToNow } from "@/utils/functions";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { memo } from "react";

type IProps = {
  direction?: "column" | "row";
  data: IRegisterCourse;
};

const MyCourse = ({ direction = "column", data }: IProps) => {
  return (
    <Paper elevation={10} sx={{ height: "100%", borderRadius: 2 }}>
      <Stack
        flexDirection={direction}
        gap={1}
        alignItems={direction === "row" ? "center" : "start"}
        textTransform={"capitalize"}
      >
        <Image
          unoptimized
          src={data.course.thumbnail.uri}
          width={100}
          height={100}
          alt="thumbnail"
          style={{
            width: direction === "row" ? "100px" : "100%",
            height: direction === "row" ? "100px" : "200px",
            borderRadius: 12,
          }}
        />
        <Box flexGrow={2} p={1}>
          <Typography variant="h6" gutterBottom>
            {data.course.name}
          </Typography>
          <Chip
            size="small"
            label={data.course.type}
            color={data.course.type === "private" ? "info" : "success"}
            sx={{ mb: 1 }}
          />
          {direction === "column" && (
            <>
              <Typography variant="body1">
                Registered time: {getDistanceTimeToNow(data.createdAt)}
              </Typography>
              <Typography variant="body1">
                Latest learned time: {getDistanceTimeToNow(data.updatedAt)}
              </Typography>
            </>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default memo(MyCourse);
