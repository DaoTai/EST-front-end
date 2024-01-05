"use client";
import { IFriendVideo } from "@/types/VideoRoom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
interface IProps extends Pick<IFriendVideo, "friend" | "peer"> {
  isSharing?: boolean;
  setStreamShare: Dispatch<SetStateAction<MediaStream | null>>;
}

const FriendVideo = ({ isSharing = false, peer, friend, setStreamShare }: IProps) => {
  const [isError, setError] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    peer.on("stream", (stream: MediaStream) => {
      isError && setError(false);
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStream(stream);
    });

    peer.on("error", (err) => {
      setError(true);
      console.log("Friend lỗi kết nối");
      console.log("Peer error friend video: ", err);
    });
  }, [peer]);

  useEffect(() => {
    if (isSharing) {
      setStreamShare(stream);
    }
  }, [isSharing, stream]);

  return (
    <Stack
      gap={1}
      border={isSharing ? 3 : 1}
      p={1}
      borderRadius={2}
      width={"100%"}
      height={"100%"}
      position={"relative"}
      sx={{ width: "100%", position: "relative" }}
      borderColor={isSharing ? "cyan" : "divider"}
    >
      <Box
        position="relative"
        borderRadius={"inherit"}
        overflow={"hidden"}
        sx={{
          video: {
            "&::-webkit-media-controls-panel": {
              display: "none !important",
            },
          },
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            borderRadius: "inherit",
          }}
        />
      </Box>
      <Stack gap={1} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
        <Chip color="info" label={friend?.username} />
        <Typography component={"span"} variant="body1">
          {isError && "is having error connection"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FriendVideo;
