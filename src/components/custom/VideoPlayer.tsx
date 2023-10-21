import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import { Box, IconButton, Slider, Stack } from "@mui/material";
import { useRef, useState } from "react";
const VideoPlayer = ({ uri }: { uri: string }) => {
  const [isPlay, setPlay] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const containerVideo = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const btnFullScreen = useRef<HTMLButtonElement>(null);

  const onTogglePlay = () => {
    if (video.current?.paused) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
    setPlay(!isPlay);
  };

  const onChangeVol = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number" && video.current) {
      video.current.volume = newValue;
      setVolume(newValue);
    }
  };

  const onToggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  const handleToggleFullScreen = async () => {
    console.log(btnFullScreen.current?.classList);

    try {
      document.fullscreenElement
        ? await document.exitFullscreen()
        : await containerVideo.current?.requestFullscreen();
      btnFullScreen.current?.classList.toggle("full-screen");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Box
      ref={containerVideo}
      borderRadius={2}
      sx={{
        height: "50vh",
        background: "black",
        ":hover": {
          ".controls": {
            display: "flex",
          },
        },

        video: {
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          "&::-webkit-media-controls-panel": {
            display: "none !important",
          },
        },
        svg: {
          transition: "0.2s ease all",
          ":hover": {
            transform: "scale(1.2)",
          },
        },
        "#btn-full-screen": {
          "&.full-screen": {
            ".full-screen-icon": {
              display: "block",
            },
            ".exit-full-screen-icon": {
              display: "none",
            },
          },
          ".full-screen-icon": {
            display: "none",
          },
        },
        ".controls": {
          display: "none",
          transition: "0.5s ease all",
        },
      }}
      width={"100%"}
      position={"relative"}
    >
      <video ref={video as any} controls={false} onClick={onTogglePlay}>
        <source src={uri} type="video/mp4" />
      </video>

      {/* Control */}
      <Stack
        className="controls"
        flexDirection={"row"}
        justifyContent={"space-between"}
        position={"absolute"}
        bottom={0}
        left={0}
        right={0}
        bgcolor={"rgba(0,0,0,0.3)"}
        p={1}
        pt={0}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <IconButton size="small" onClick={onTogglePlay}>
            {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton size="small" onClick={onToggleMute}>
            {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
          <Stack sx={{ width: 100 }}>
            <Slider value={volume} min={0} max={1} step={0.01} onChange={onChangeVol} />
          </Stack>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <IconButton
            ref={btnFullScreen}
            id="btn-full-screen"
            className="full-screen"
            size="small"
            onClick={handleToggleFullScreen}
          >
            <FullscreenIcon className="full-screen-icon" />
            <FullscreenExitIcon className="exit-full-screen-icon" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VideoPlayer;
