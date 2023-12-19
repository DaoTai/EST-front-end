"use client";
import MyDialog from "@/components/custom/Dialog";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
const Heading = () => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const handleExitRoom = useCallback(() => {
    router.back();
    handleToggleConfirm();
  }, []);

  const handleToggleConfirm = useCallback(() => {
    setOpenConfirm(!openConfirm);
  }, [openConfirm]);
  return (
    <>
      <Stack
        p={1}
        position={"fixed"}
        top={0}
        left={0}
        right={0}
        height={60}
        sx={{
          background: (theme) => theme.palette.white.main,
          zIndex: 999,
        }}
      >
        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography>Video call</Typography>
          <Tooltip title="Exit video room" arrow>
            <IconButton
              onClick={handleToggleConfirm}
              color="error"
              sx={{
                alignSelf: "end",
                border: 1,
                borderColor: "currentColor",
              }}
            >
              <PhoneDisabledIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Confirm exit room */}
      {openConfirm && (
        <MyDialog
          title="Video room"
          content="Do you want to exit video room?"
          onClose={handleToggleConfirm}
          onSubmit={handleExitRoom}
        />
      )}
    </>
  );
};

export default Heading;
