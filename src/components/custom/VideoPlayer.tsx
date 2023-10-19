import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { useRef, useState } from "react";
const VideoPlayer = ({ uri }: { uri: string }) => {
  const [isPlay, setPlay] = useState<boolean>(false);
  const video = useRef<HTMLVideoElement>();

  const onTogglePlay = () => {
    if (video.current?.paused) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
    setPlay(!isPlay);
  };

  const onToggleMute = () => {
    if (video.current?.muted) {
    }
  };

  const onToggleFullScreen = () => {
    video.current?.requestFullscreen();
  };

  return (
    <Box
      sx={{
        video: {
          width: "100%",
          height: "50vh",
        },
      }}
      width={"100%"}
      position={"relative"}
    >
      <video ref={video as any}>
        <source src={uri} type="video/mp4" />
      </video>
      <Box
        position={"absolute"}
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <IconButton size="large" sx={{ bgcolor: "rgba(255,255,255,0.3)" }} onClick={onTogglePlay}>
          {isPlay ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
      </Box>

      {/* Control */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        position={"absolute"}
        bottom={0}
        left={0}
        right={0}
      >
        <Stack flexDirection={"row"} gap={1}>
          <IconButton size="small" onClick={onTogglePlay}>
            {isPlay ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </IconButton>
          <IconButton size="small" onClick={onToggleMute}>
            <VolumeUpIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <IconButton size="small" onClick={onToggleFullScreen}>
            <FullscreenIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VideoPlayer;
