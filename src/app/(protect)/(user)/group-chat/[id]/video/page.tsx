"use client";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import MyDialog from "@/components/custom/Dialog";
import { useSession } from "next-auth/react";

const VideoRoom = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const [stream, setStream] = useState<MediaStream>();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [openMic, setOpenMic] = useState<boolean>(true);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const myVideoRef = useRef<HTMLVideoElement | any>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (stream) {
          myVideoRef.current.srcObject = stream;
          setStream(stream);
        }
      });

    return () => {};
  }, []);

  // Toggle camera
  const handleToggleCamera = () => {
    setOpenCamera(!openCamera);
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const track = videoTracks[0];
        track.enabled = !track.enabled;
      }
    }
  };

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

  const handleExitRoom = useCallback(() => {
    handleToggleConfirm();
  }, []);

  const handleToggleConfirm = useCallback(() => {
    setOpenConfirm(!openConfirm);
  }, [openConfirm]);

  return (
    <>
      <Box position={"relative"} height={"100vh"} boxShadow={2} p={1}>
        {params.id}

        {/* My video */}
        <Grid container spacing={1}>
          <Grid item md={4} sm={6} xs={6}>
            <Paper elevation={5} sx={{ width: "100%", height: 250, position: "relative" }}>
              <video
                ref={myVideoRef}
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Display avatar & name when off camera */}
              {!openCamera && (
                <Stack
                  position={"absolute"}
                  sx={{ inset: "0 0 0 0" }}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  width={"100%"}
                  overflow={"hidden"}
                >
                  <Avatar alt="avatar" src={session?.avatar.uri} sx={{ width: 150, height: 150 }} />
                  <Chip label={session?.username} style={{ color: "#fff" }} />
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>

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

          {/* Exit room */}
          <Tooltip title="Exit video room" arrow>
            <IconButton
              onClick={handleToggleConfirm}
              color="error"
              sx={{
                backgroundColor: (theme) => theme.palette.error.dark,
                color: (theme) => theme.palette.common.white,
                alignSelf: "end",
                border: 1,
                borderColor: "currentColor",
              }}
            >
              <PhoneDisabledIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

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

export default VideoRoom;
