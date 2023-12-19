"use client";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import { IFriendVideo } from "./Main";

interface IProps extends Pick<IFriendVideo, "friend" | "peer"> {
  isSharing?: boolean;
}

const FriendVideo = ({ isSharing = false, peer, friend }: IProps) => {
  const [isError, setError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    peer.on("stream", (stream: MediaStream) => {
      // console.log("Friend có kết nối");
      isError && setError(false);
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    peer.on("error", (err) => {
      setError(true);
      console.log("Friend lỗi kết nối");
      console.log("Peer error friend video: ", err);
    });
    peer.on("connect", () => {
      // console.log("Friend connect");
    });
  }, [peer]);

  return (
    <Stack
      gap={1}
      border={isSharing ? 3 : 0}
      pb={2}
      borderRadius={2}
      width={"100%"}
      height={"100%"}
      position={"relative"}
      sx={{ width: "100%", position: "relative" }}
      borderColor={isSharing ? "red" : "divider"}
    >
      <Box
        position="relative"
        borderRadius={"inherit"}
        maxHeight={280}
        height={"100%"}
        overflow={"hidden"}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
          }}
        />
        <Stack
          position={"absolute"}
          bottom={0}
          left={0}
          right={0}
          flexDirection={"row"}
          justifyContent={"end"}
          width={"100%"}
          overflow={"hidden"}
          sx={{ bgcolor: "rgba(0,0,0,0.2)" }}
          zIndex={10}
          p={1}
        >
          <FullscreenIcon style={{ color: "#fff" }} />
        </Stack>
      </Box>
      <Stack mt={1} gap={1} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
        <Chip color="info" label={friend?.username} />
        <Typography component={"span"} variant="body1">
          {isError && "is having error connection"}
        </Typography>
      </Stack>

      {/* Full screen */}

      {/* <Stack
        position={"absolute"}
        sx={{ inset: "0 0 0 0" }}
        justifyContent={"space-around"}
        alignItems={"center"}
        width={"100%"}
        overflow={"hidden"}
      >
        <Avatar alt="avatar" src={friend?.avatar.uri} sx={{ width: 150, height: 150 }} />
        <Chip label={friend?.username} style={{ color: "#fff" }} />
      </Stack> */}
    </Stack>
  );
};

export default FriendVideo;
