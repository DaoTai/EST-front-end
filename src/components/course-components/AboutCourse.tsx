import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import Dialog from "@/components/custom/Dialog";

const AboutCourse = ({ course, type }: { course: ICourse; type?: "create" | "edit" | "watch" }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  console.log("course: ", course);

  const handleDeleteCouse = async () => {
    try {
      await fetch("/api/teacher/courses/" + course._id, {
        method: "DELETE",
      });
      toast.success("Deleted course successfully");
      router.refresh();
      setTimeout(() => {
        router.push("/teacher");
      }, 1500);
    } catch (error) {
      toast.success("Delete course failed");
    }
  };

  return (
    <>
      <Stack mt={2} gap={1} flexDirection={"row"} justifyContent={"center"} flexWrap={"wrap"}>
        {/* Thumbnail */}
        {course.thumbnail && (
          <Image
            src={course.thumbnail.uri}
            alt="thumb-nail"
            width={300}
            height={300}
            style={{ borderRadius: 12 }}
          />
        )}
        {/* Information  */}
        <Box component={"ul"} flexGrow={2}>
          <Typography component={"li"} variant="body1" gutterBottom>
            Created time: {dayjs(course.createdAt).format("dddd, MMMM D, YYYY h:mm A")}
          </Typography>
          <Typography component={"li"} variant="body1" gutterBottom>
            Updated time: {dayjs(course.updatedAt).format("dddd, MMMM D, YYYY h:mm A")}
          </Typography>
          <Typography component={"li"} variant="body1" gutterBottom>
            Lessons: {course?.totalLessons}
          </Typography>
          <Typography component={"li"} variant="body1" gutterBottom>
            Members: {course.members.length}
          </Typography>
          {course.roadmap && (
            <Typography component={"li"} variant="body1" gutterBottom>
              Roadmap:
              <a href={course.roadmap?.uri} download target="_blank" style={{ marginLeft: 4 }}>
                Download
              </a>
            </Typography>
          )}
        </Box>

        {/* Delete button*/}
        {type !== "watch" && (
          <IconButton
            color="error"
            sx={{ alignSelf: "start", border: 1 }}
            onClick={() => setOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>

      {open && (
        <Dialog
          title="Delete course?"
          content={"Do you want to delete " + course.name + " ?"}
          onClose={() => setOpen(false)}
          onSubmit={handleDeleteCouse}
        />
      )}
    </>
  );
};

export default memo(AboutCourse);
