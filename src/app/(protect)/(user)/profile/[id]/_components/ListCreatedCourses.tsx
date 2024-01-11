import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
type IProps = {
  listCreatedCourses: ICourse[];
};

const ListCreatedCourses = ({ listCreatedCourses }: IProps) => {
  return (
    <Grid container spacing={2}>
      {listCreatedCourses.length > 0 ? (
        listCreatedCourses?.map((course) => (
          <Grid
            item
            key={course._id}
            component={Link}
            href={"/search/course/" + course.slug}
            sm={6}
            xs={12}
            gap={1}
          >
            <Paper
              elevation={4}
              sx={{
                pb: 2,
                borderRadius: 3,
                height: "100%",

                transition: "all linear 0.2s",
                ":hover": { boxShadow: 2 },
              }}
            >
              <Image
                src={
                  course?.thumbnail
                    ? (course?.thumbnail?.uri as string)
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
                <Typography variant="h6">{course.name}</Typography>
                <Typography variant="subtitle2">
                  Created time: {dayjs(course.createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="subtitle2">Suitable job: {course.suitableJob}</Typography>
                <Chip
                  size="small"
                  label={course.type}
                  color={course.type === "private" ? "info" : "success"}
                  sx={{ textTransform: "capitalize" }}
                />
                <Stack mt={1} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
                  {course.programmingLanguages?.map((lang, i) => (
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

export default ListCreatedCourses;
