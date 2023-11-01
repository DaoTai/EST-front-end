import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const PreviewLesson = ({ lesson }: { lesson: ILesson }) => {
  return (
    <Stack
      flexDirection={"row"}
      gap={1}
      p={1}
      borderRadius={2}
      sx={{
        bgcolor: "background.paper",
        textDecoration: "none",
        color: "text.primary",
        boxShadow: "0px 0px 4px rgba(0,0,0,.3)",
        transition: "all ease-in 0.2s",
        ":hover": {
          bgcolor: "rgba(0,0,0,0.1)",
        },
        img: {
          borderRadius: 1,
          objectFit: "none",
        },
      }}
    >
      <Typography variant="h6">{lesson.name}</Typography>
    </Stack>
  );
};

export default PreviewLesson;
