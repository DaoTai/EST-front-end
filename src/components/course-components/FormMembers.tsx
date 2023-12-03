import teacherCourseService from "@/services/teacher/course";
import { Avatar, Chip, Stack } from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import MyDialog from "../custom/Dialog";
import AddMembers from "../group-chat-components/AddMembers";

type IProps = {
  course: ICourse;
  visitor?: "teacher" | "admin";
};

const FormMembers = ({ course, visitor = "teacher" }: IProps) => {
  const [newMember, setNewMember] = useState<IProfile | null>(null);
  const members = useMemo(() => {
    return course?.members ?? [];
  }, [course]);

  // Add new member to course / Create new register course
  const handleAddNewMember = async () => {
    if (newMember) {
      try {
        await teacherCourseService.appendMember({
          idCourse: course._id,
          idUser: newMember._id,
        });
        toast.success("Append successfully!");
        setNewMember(null);
        mutate("/api/teacher/courses/" + course._id);
      } catch (error) {
        toast.error("Append failed!");
      } finally {
      }
    }
  };

  const handleOpenConfirm = (user: IProfile) => {
    setNewMember(user);
  };

  const handleCloseConfirm = useCallback(() => {
    setNewMember(null);
  }, []);

  return (
    <div>
      {visitor === "teacher" && (
        <AddMembers existUsers={members as IProfile[]} onAdd={handleOpenConfirm as any} />
      )}
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2} mt={2}>
        {members.map((member, i) => (
          <Chip key={i} label={member.username} avatar={<Avatar src={member.avatar.uri} />} />
        ))}
      </Stack>

      {newMember && (
        <MyDialog
          title="Add member to course"
          content="Do you want to add this member to course. You won't able to remove them after"
          onClose={handleCloseConfirm}
          onSubmit={handleAddNewMember}
        />
      )}
    </div>
  );
};

export default memo(FormMembers);
