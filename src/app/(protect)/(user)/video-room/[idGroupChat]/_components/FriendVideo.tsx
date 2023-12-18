"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { IFriendVideo } from "./Main";

const FriendVideo = ({ peer, friend }: Pick<IFriendVideo, "friend" | "peer">) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    peer.on("stream", (stream: MediaStream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    peer.on("error", (err) => {
      console.log("Peer error friend video: ", err);
    });
  }, [peer]);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 12,
          maxHeight: 250,
        }}
      />
      <Typography variant="body1" textAlign={"center"}>
        {friend?.username}
      </Typography>
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
    </Box>
  );
};

export default FriendVideo;
