"use client";
import MyDialog from "@/components/custom/Dialog";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";

import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import useListGroupChatContext from "@/hooks/useListGroupChatContext";
import FriendVideo from "./_components/FriendVideo";
export interface PeerInstance extends SimplePeer.Instance {
  _id?: string;
  user?: IProfile;
}

interface PeerRef {
  peerId: string;
  peer: PeerInstance;
}

type ICreatePeerParams = {
  userId: string;
  callerId: string;
  stream: MediaStream;
};

type IAddPeerParams = {
  signal: SimplePeer.SignalData;
  callerId: string;
  stream: MediaStream;
};

type IEventUserJoinParams = {
  signal: SimplePeer.SignalData;
  callerId: string;
};

const VideoRoom = ({ params }: { params: { id: string } }) => {
  const { socket } = useListGroupChatContext();
  const { data: session } = useSession();
  const router = useRouter();

  const [listPeers, setListPeers] = useState<PeerInstance[]>([]);
  const [stream, setStream] = useState<MediaStream>();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [openMic, setOpenMic] = useState<boolean>(true);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const myVideoRef = useRef<HTMLVideoElement | any>();
  const peersRef = useRef<PeerRef[]>([]);

  // Tạo kết nối ngang hàng
  const createPeer = ({ userId, callerId, stream }: ICreatePeerParams) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false, // đảm bảo rằng không có dữ liệu nào được gửi đi trước khi kết nối hoàn chỉnh, và toàn bộ dữ liệu sẽ được gửi một lần duy nhất sau khi kết nối đã sẵn sàng
      stream,
    });

    peer.on("signal", (signal) => {
      socket?.emit("send signal", {
        userId,
        callerId,
        signal,
      });
    });

    return peer;
  };

  // Thêm kết nối ngang hàng
  const addPeer = ({ signal, callerId, stream }: IAddPeerParams) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    // Khi có tín hiệu
    peer.on("signal", (signal) => {
      socket?.emit("return signal", {
        signal,
        callerId,
      });
    });

    // Khi đóng kết nối (rời video call)
    peer.on("close", () => {
      const currentPeer = { ...peer } as PeerInstance;
      const newPeers = [...listPeers].filter((peer) => peer._id !== currentPeer._id);
      setListPeers(newPeers);
    });

    // Khi xảy ra lỗi
    peer.on("error", (err) => {
      console.log("Error: ", err);
    });

    peer.signal(signal);
    return peer;
  };

  useEffect(() => {
    if (!session) return;

    let localStream: MediaStream;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localStream = stream;
        myVideoRef.current.srcObject = stream;
        setStream(stream);
        socket?.emit("join video", {
          idGroupChat: params.id,
          user: {
            id: session._id,
            username: session.username,
            avatar: session.avatar,
          },
        });

        // Event get all user in this room
        socket?.on("all users", (listUsers: IProfile[]) => {
          // console.log("listUsers: ", listUsers);
          const peers = [] as PeerInstance[];

          // Tạo các peer tương ứng với từng user
          listUsers.forEach((user) => {
            const peer = createPeer({
              userId: user._id,
              callerId: socket.id,
              stream: stream,
            });
            peers.push(peer);
          });
          setListPeers(peers);
        });

        // Event a user join
        socket?.on("user join", ({ signal, callerId }: IEventUserJoinParams) => {
          const newPeer = addPeer({
            signal,
            callerId,
            stream,
          });

          peersRef.current.push({
            peerId: callerId,
            peer: newPeer,
          });

          setListPeers((peers) => [...peers, newPeer]);
        });

        // Establish connect: send signal to peers
        socket?.on(
          "receive returned signal",
          (payload: { socketId: string; signal: SimplePeer.SignalData }) => {
            const { socketId, signal } = payload;
            const item = peersRef.current.find((peer) => {
              return peer.peerId === socketId;
            });
            if (item) {
              item.peer.signal(signal);
            }
          }
        );
      });

    return () => {
      const videoTracks = localStream?.getVideoTracks();
      videoTracks?.forEach((track) => {
        track.stop();
      });
    };
  }, [session]);

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
    router.back();
    handleToggleConfirm();
  }, []);

  const handleToggleConfirm = useCallback(() => {
    setOpenConfirm(!openConfirm);
  }, [openConfirm]);

  return (
    <>
      <Box position={"relative"} height={"100vh"} boxShadow={2} p={1}>
        {/* List videos */}
        <Grid container spacing={1}>
          {/* My video */}
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

          {/* Friend's videos */}
          {listPeers.map((peer, index) => {
            return (
              <Grid key={index} item md={4} sm={6} xs={6}>
                <FriendVideo peer={peer} />
              </Grid>
            );
          })}
        </Grid>

        {/* Control */}
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
