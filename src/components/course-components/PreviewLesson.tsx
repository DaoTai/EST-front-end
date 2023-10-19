import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

const PreviewLesson = ({ lesson }: { lesson: ILesson }) => {
  return (
    <Stack
      flexDirection={"row"}
      gap={1}
      p={1}
      borderRadius={2}
      boxShadow={1}
      sx={{
        bgcolor: "background.paper",
        textDecoration: "none",
        color: "text.primary",
        transition: "all ease-in 0.2s",
        ":hover": {
          bgcolor: "rgba(0,0,0,0.1)",
        },
        img: {
          borderRadius: 1,
        },
      }}
    >
      <Box>
        <Typography variant="h6">{lesson.name}</Typography>
        <Rating value={4} readOnly />
        <Typography variant="subtitle2">
          Created at: {dayjs(lesson.createdAt).format("DD/MM/YYYY")}
        </Typography>
      </Box>
    </Stack>
  );
};

export default PreviewLesson;
