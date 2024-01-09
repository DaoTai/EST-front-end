import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Dialog from "@/components/custom/Dialog";
import Group from "@mui/icons-material/Group";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import MyModal from "../custom/Modal";
import FormMembers from "./FormMembers";

const AboutCourse = ({ course, type }: { course: ICourse; type?: "create" | "edit" | "watch" }) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openFormMember, setOpenFormMember] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const isCreater = useMemo(() => {
    if (typeof course.createdBy === "string") {
      return session?._id === course.createdBy;
    }
    return false;
  }, [session, course]);

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

  const onCloseDialog = useCallback(() => {
    setOpenConfirm(false);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenFormMember(false);
  }, []);

  return (
    <>
      <Stack mt={2} gap={1} flexDirection={"row"} justifyContent={"center"} flexWrap={"wrap"}>
        {/* Thumbnail */}
        {course.thumbnail && (
          <Image
            src={course.thumbnail.uri}
            alt="thumbnail"
            width={280}
            height={250}
            style={{ borderRadius: 12, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}
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
            Lessons: {course?.totalLessons || course?.lessons?.length}
          </Typography>
          <Typography component={"li"} variant="body1" gutterBottom>
            Members: {course?.members?.length}
          </Typography>
          {course.roadmap && (
            <Box component={"li"}>
              <Typography variant="body1" gutterBottom>
                Roadmap
              </Typography>
              <Image
                unoptimized
                src={course.roadmap.uri}
                alt="roadmap"
                width={280}
                height={250}
                style={{
                  borderRadius: 4,
                  width: "100%",
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: "drop-shadow(0px 0px 8px rgba(0,0,0,0.2))",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Add member button & Delete button*/}
        {type !== "watch" && (
          <>
            {isCreater && course.type === "private" && (
              <Tooltip title="Members">
                <IconButton
                  color="info"
                  sx={{ alignSelf: "start", border: 1 }}
                  onClick={() => setOpenFormMember(true)}
                >
                  <Group />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Delete">
              <IconButton
                color="error"
                sx={{ alignSelf: "start", border: 1 }}
                onClick={() => setOpenConfirm(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>

      {/* Dialog confirm */}
      {openConfirm && (
        <Dialog
          title="Delete course?"
          content={"Do you want to delete " + course.name + " ?"}
          onClose={onCloseDialog}
          onSubmit={handleDeleteCouse}
        />
      )}

      {/* Modal form member */}
      {
        <MyModal open={openFormMember} onClose={onCloseModal}>
          <Box minHeight="80vh" minWidth={"50vw"} pt={1}>
            <FormMembers course={course} />
          </Box>
        </MyModal>
      }
    </>
  );
};

export default memo(AboutCourse);
