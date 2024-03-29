"use client";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { memo, useState } from "react";

type IProps = {
  openMic: boolean;
  openCamera: boolean;
  isSharingScreen: boolean;
  disabledSharing: boolean;
  handleToggleCamera: () => void;
  handleToggleMic: () => void;
  handleToggleShareScreen: () => Promise<void>;
};

const ControlMedia: React.FC<IProps> = ({
  isSharingScreen,
  openMic,
  disabledSharing,
  openCamera,
  handleToggleCamera,
  handleToggleShareScreen,
  handleToggleMic,
}) => {
  return (
    <Stack
      p={0.5}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderTop={1}
      sx={{
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
        ".icon-control": {
          border: 1,
          borderColor: "currentColor",
        },
      }}
    >
      <Box flex={2} display={"flex"} gap={2} width={"100%"} justifyContent={"center"}>
        {/* Share screen */}
        <Tooltip title={isSharingScreen ? "Stop sharing sreen" : "Share screen"}>
          <span>
            <IconButton
              disabled={disabledSharing}
              className={disabledSharing || isSharingScreen ? "" : "bg-gradient"}
              onClick={handleToggleShareScreen}
            >
              <PresentToAllIcon />
            </IconButton>
          </span>
        </Tooltip>

        {/* Camera */}
        <IconButton
          disabled={isSharingScreen}
          color="secondary"
          className="icon-control"
          onClick={handleToggleCamera}
        >
          {openCamera ? <CameraAltIcon /> : <NoPhotographyIcon />}
        </IconButton>

        {/* Mic */}
        <IconButton color="info" className="icon-control" onClick={handleToggleMic}>
          {openMic ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
      </Box>
    </Stack>
  );
};

export default memo(ControlMedia);
