"use client";

import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PreviewLesson from "@/components/course-components/PreviewLesson";
import Link from "next/link";

const ListLessons = () => {
  const params = useParams();

  const [listLessons, setListLessons] = useState<ILesson[]>([]);
  const currentPageRef = useRef<number>(1);
  const maxPageRef = useRef<number>(1);

  useEffect(() => {
    fetchLessonsByIdCourse();
  }, []);

  const fetchLessonsByIdCourse = async (page: number = 1) => {
    if (params.id) {
      const res = await fetch("/api/teacher/lessons/" + params.id + "?page=" + page);
      if (res.ok) {
        const data = (await res.json()) as { listLessons: ILesson[]; maxPage: number };
        setListLessons((prev) => [...prev, ...data.listLessons]);
        maxPageRef.current = data.maxPage;
      }
    }
  };

  const handleFetchMore = async () => {
    currentPageRef.current++;
    if (currentPageRef.current <= maxPageRef.current) {
      fetchLessonsByIdCourse(currentPageRef.current);
    }
  };

  return (
    <>
      {listLessons.length > 0 && (
        <>
          <Stack gap={2}>
            {listLessons.map((lesson, i) => (
              <Stack
                key={lesson._id}
                flexDirection={"row"}
                alignItems={"center"}
                width={"100%"}
                component={Link}
                href={"/teacher/lessons/" + lesson._id}
                sx={{ textDecoration: "none", color: "text.primary" }}
              >
                <Typography variant="body2" minWidth={30}>
                  {i + 1}
                </Typography>
                <Box flexGrow={2}>
                  <PreviewLesson lesson={lesson} />
                </Box>
              </Stack>
            ))}
          </Stack>
          {maxPageRef.current !== currentPageRef.current && (
            <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
              <Chip label="More" clickable onClick={handleFetchMore} />
            </Stack>
          )}
        </>
      )}

      {/* No lessons */}
      {listLessons.length === 0 && (
        <Typography variant="body1" textAlign={"center"}>
          No lesson
        </Typography>
      )}
    </>
  );
};

export default ListLessons;
