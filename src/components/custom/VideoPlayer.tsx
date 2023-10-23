import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { MouseEvent, useRef, useState } from "react";

const ContainerVideo = styled(Box)(({ ...theme }) => ({
  height: "50vh",
  background: "black",
  ":not(.hide-controls):hover": {
    ".controls": {
      display: "flex",
    },
  },

  "&.show-controls": {
    ".controls": {
      display: "flex",
    },
  },

  "&.hide-controls": {
    ".controls": {
      display: "none",
    },
  },

  video: {
    position: "relative",
    width: "100%",
    height: "100%",
    "&::-webkit-media-controls-panel": {
      display: "none !important",
    },
  },
  svg: {
    color: "#fff",
    transition: "0.2s ease all",
    ":hover": {
      transform: "scale(1.15)",
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
}));

const VideoPlayer = ({ uri, thumbnail }: { uri: string; thumbnail?: string }) => {
  const [isPlay, setPlay] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const containerVideo = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const btnFullScreen = useRef<HTMLButtonElement>(null);
  const duration = useRef<number>(0);

  // Toggle play / pause
  const onTogglePlay = () => {
    if (video.current?.paused) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
    setPlay(!isPlay);
    duration.current = video.current!.duration;
    containerVideo.current?.classList.remove("show-controls");
  };

  // Change volume
  const onChangeVol = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number" && video.current) {
      video.current.volume = newValue;
      setVolume(newValue);
    }
  };

  // Toggle mute/unmuted
  const onToggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  // Toggle open/exit full screen
  const handleToggleFullScreen = async (e: MouseEvent) => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerVideo.current?.requestFullscreen();
      }
      btnFullScreen.current?.classList.toggle("full-screen");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Format time for currentTime & duration
  const formatTime = (time: number) => {
    let output = "";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) output += hours + ":";
    output += `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return output;
  };

  // Handle when video playing
  const handleTimeUpdate = () => {
    const currentTimer = video.current!.currentTime;
    setCurrentTime(currentTimer);
  };

  // Handle pause video
  const onPause = () => {
    containerVideo.current?.classList.add("show-controls");
  };

  // Handle seeking video
  const onSeek = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number" && video.current) {
      const seekTime = video.current?.duration * newValue;
      setCurrentTime(seekTime);
      video.current.currentTime = seekTime;
    }
  };

  // Handle error video
  const handleVideoLoadedMetadata = () => {
    if (isError) {
      console.log("Having error");

      video.current!.currentTime = currentTime;
      video.current?.play();
    }
  };
  return (
    <ContainerVideo ref={containerVideo} borderRadius={2} width={"100%"} position={"relative"}>
      <video
        ref={video as any}
        // poster={thumbnail}
        controls={false}
        muted={!volume}
        onTimeUpdate={handleTimeUpdate}
        onClick={onTogglePlay}
        onPause={onPause}
        onEnded={() => setPlay(false)}
        onError={() => setError(true)}
        onLoadedMetadata={handleVideoLoadedMetadata}
      >
        <source src={uri} type="video/mp4" />
      </video>

      {/* Control */}
      <Stack
        className="controls"
        flexDirection={"row"}
        justifyContent={"space-between"}
        position={"absolute"}
        color={"#fff"}
        bgcolor={"rgba(0,0,0,0.3)"}
        bottom={0}
        left={10}
        right={10}
        zIndex={2}
        p={0.5}
      >
        {/* Progress bar */}
        {video.current?.duration && (
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={currentTime / video.current.duration}
            sx={{
              position: "absolute",
              top: -10,
              left: 0,
              right: 0,
              p: 0,
              height: "6px",
              ".MuiSlider-thumb": {
                width: "12px",
                height: "12px",
              },
            }}
            onChange={onSeek}
          />
        )}

        {/* Controller */}
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          {/* Play / pause */}
          <IconButton size="small" onClick={onTogglePlay}>
            {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          {/* Volume & Time */}
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{
              ":hover": {
                "#volume": {
                  width: 80,
                  transform: "scaleX(1)",
                },
              },
            }}
          >
            <IconButton size="small" onClick={onToggleMute}>
              {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>

            {/* Change volume */}
            <Stack
              id="volume"
              sx={{
                ml: 1,
                width: 0,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Slider
                size="small"
                min={0}
                max={1}
                step={0.01}
                sx={{ color: "#fff" }}
                value={volume}
                onChange={onChangeVol}
              />
            </Stack>

            {/* Time */}
            {!!currentTime && (
              <Box id="times" display={"flex"} gap={1} ml={2}>
                <Typography variant="subtitle1">{formatTime(currentTime)} /</Typography>
                <Typography variant="subtitle1">{formatTime(duration.current)}</Typography>
              </Box>
            )}
          </Box>
        </Stack>

        {/* Full screen */}
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
    </ContainerVideo>
  );
};

export default VideoPlayer;
