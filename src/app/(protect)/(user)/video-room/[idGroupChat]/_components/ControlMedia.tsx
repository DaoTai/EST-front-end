"use client";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import { memo, useState } from "react";

type IProps = {
  stream: MediaStream;
  openCamera: boolean;
  handleToggleCamera: () => void;
};

const ControlMedia: React.FC<IProps> = ({ stream, openCamera, handleToggleCamera }) => {
  const { data: session } = useSession();

  const [openMic, setOpenMic] = useState<boolean>(true);

  // Toggle mic
  const handleToggleMic = () => {
    setOpenMic(!openMic);
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        const track = audioTracks[0];
        track.enabled = !track.enabled;
      }
    }
  };

  return (
    <>
      <Stack
        p={1}
        position={"absolute"}
        bottom={0}
        left={0}
        right={0}
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
          {/* Camera */}
          <IconButton color="secondary" className="icon-control" onClick={handleToggleCamera}>
            {openCamera ? <CameraAltIcon /> : <NoPhotographyIcon />}
          </IconButton>

          {/* Mic */}
          <IconButton color="info" className="icon-control" onClick={handleToggleMic}>
            {openMic ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

export default memo(ControlMedia);
