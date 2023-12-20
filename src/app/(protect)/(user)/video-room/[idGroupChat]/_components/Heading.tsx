"use client";
import ToggleModeTheme from "@/components/common/ToggleModeTheme";
import MyDialog from "@/components/custom/Dialog";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { memo, useCallback, useState } from "react";

const Heading = ({ groupChat }: { groupChat: IGroupChat }) => {
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
        minHeight={60}
        boxShadow={2}
        sx={{
          background: (theme) => theme.palette.white.main,
          zIndex: 999,
        }}
      >
        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"start"}>
          <Box>
            <Typography variant="h6" lineHeight={1.8} fontWeight={500}>
              {groupChat.name}
            </Typography>
            <Typography variant="body1" lineHeight={1.8} fontWeight={500} gutterBottom>
              Host: {groupChat.host.username}
            </Typography>
          </Box>

          <Stack flexDirection={"row"} gap={2}>
            <ToggleModeTheme />
            <Tooltip title="Exit video room" arrow>
              <IconButton
                onClick={handleToggleConfirm}
                color="error"
                sx={{
                  border: 1,
                  borderColor: "currentColor",
                }}
              >
                <PhoneDisabledIcon />
              </IconButton>
            </Tooltip>
          </Stack>
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

export default memo(Heading);
