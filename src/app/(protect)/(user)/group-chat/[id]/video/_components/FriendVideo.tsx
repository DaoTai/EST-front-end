"use client";
import { Box, Typography } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import { PeerInstance } from "../page";

type IProps = {
  peer: PeerInstance;
};

const FriendVideo = ({ peer }: IProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // console.log("peer: ", peer);

    peer.on("stream", (stream: MediaStream) => {
      videoRef.current!.srcObject = stream;
    });

    peer.on("error", (err) => {
      console.log("Peer error: ", err);
    });
  }, [peer]);

  return (
    <Box>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Typography variant="body1" textAlign={"center"}>
        {peer?.user?.username}
      </Typography>
    </Box>
  );
};

export default memo(FriendVideo);
