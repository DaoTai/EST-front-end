"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import { useRouter } from "next/navigation";
import ChangePwd from "../../../change-password/_components/ChangePassword";
const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -30%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ChangePwdModal = () => {
  const router = useRouter();

  return (
    <div>
      <Modal open onClose={() => router.back()}>
        <Paper sx={style}>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIosIcon />
          </IconButton>
          <ChangePwd />
        </Paper>
      </Modal>
    </div>
  );
};

export default ChangePwdModal;
