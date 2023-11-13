"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

import MyDialog from "@/components/custom/Dialog";
const Heading = ({ register }: { register: IRegisterCourse }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // Handle cancel course
  const handleCancel = async () => {
    try {
      await axios.delete("/api/user/my-courses/" + register?.course._id);
      mutate("/api/user/my-courses");
      toast.success("Cancel course successfully");
      setTimeout(() => {
        router.replace("/my-courses");
      }, 1500);
      setOpenDialog(false);
    } catch (error) {
      toast.warning("Cancel course failed");
    }
  };
  return (
    <>
      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"start"}
        mb={1}
      >
        {register?.teacher && (
          <Box>
            <Avatar src={register?.teacher?.avatar?.uri} sx={{ width: 100, height: 100, mb: 1 }} />
            <Link href={"/profile/" + register?.teacher._id}>
              <Chip label={register?.teacher.username} color="info" />
            </Link>
          </Box>
        )}

        <Tooltip title="Exit course">
          <Fab size="small" color="error" onClick={() => setOpenDialog(true)}>
            <LogoutIcon />
          </Fab>
        </Tooltip>
      </Stack>

      {/* Dialog confirm */}
      {openDialog && (
        <MyDialog
          title="Course"
          content={
            "Do you want to cancel course: " +
            register?.course.name +
            ". Your data about course will be deleted! You should think again."
          }
          onClose={() => setOpenDialog(false)}
          onSubmit={handleCancel}
        />
      )}
    </>
  );
};

export default Heading;
