import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Image from "next/image";

const ListRegisterCourses = ({
  listRegisterCourses,
}: {
  listRegisterCourses: IRegisterCourse[];
}) => {
  return (
    <Grid container spacing={2}>
      {listRegisterCourses.length > 0 ? (
        listRegisterCourses?.map((register) => (
          <Grid key={register._id} item sm={6} xs={12} gap={1}>
            <Paper
              elevation={4}
              sx={{
                pb: 2,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Image
                src={
                  register?.course?.thumbnail
                    ? (register?.course?.thumbnail?.uri as string)
                    : "/default-fallback-image.png"
                }
                alt="thumbnail"
                width={100}
                height={200}
                style={{
                  width: "100%",
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                }}
              />

              {/* Texts */}
              <Stack alignItems={"start"} gap={0.5} pl={1} pr={1}>
                <Typography variant="h6">{register.course.name}</Typography>
                <Typography variant="subtitle2">
                  Joined time:
                  {dayjs(register.createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Chip
                  size="small"
                  label={register.course.type}
                  color={register.course.type === "private" ? "info" : "success"}
                  sx={{ textTransform: "capitalize" }}
                />
                <Stack mt={1} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
                  {register.course.programmingLanguages?.map((lang, i) => (
                    <Chip
                      key={i}
                      className="bg-gradient"
                      size="small"
                      label={lang}
                      sx={{ textTransform: "capitalize" }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography variant="body1" width={"100%"} textAlign={"center"} gutterBottom>
          No course
        </Typography>
      )}
    </Grid>
  );
};

export default ListRegisterCourses;
