"use client";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import SimplePeer from "simple-peer";
import { Helmet } from "react-helmet";
import { Socket, io } from "socket.io-client";
import ControlMedia from "./ControlMedia";
import FriendVideo from "./FriendVideo";
import {
  IAddPeerParams,
  ICreatePeerParams,
  IEventUserJoinParams,
  IFriendVideo,
  IPayload,
  PeerRef,
} from "@/types/VideoRoom";
import { fetchTURNCredential, showErrorToast } from "@/utils/functions";

const Heading = dynamic(() => import("./Heading"), {
  ssr: false,
});

const VideoRoom = ({ groupChat, profile }: { groupChat: IGroupChat; profile: IProfile }) => {
  const myConstraintAudioMedia: MediaTrackConstraints = {
    echoCancellation: true,
    noiseSuppression: true,
  };
  const [isSharingScreen, setSharingScreen] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [listFriends, setListFriends] = useState<IFriendVideo[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [openMic, setOpenMic] = useState<boolean>(true);
  const [streamShare, setStreamShare] = useState<MediaStream | null>(null);
  const [idSocketSharingScreen, setIdSocketSharingScreen] = useState<string | null>(null);
  const socket = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement | any>();
  const largeScreenRef = useRef<HTMLVideoElement | null>(null);
  const peersRef = useRef<PeerRef[]>([]);
  // share screen
  const handleShareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: myConstraintAudioMedia,
      });
      const screenTrack = screenStream.getVideoTracks()[0];

      screenTrack.onended = async () => {
        await handleUsingMediaStream();
        socket.current?.emit("off sharing screen", {
          idGroupChat: groupChat._id,
          socketId: socket.current.id,
        });
        setSharingScreen(false);
      };
      setStream(screenStream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = screenStream;
      }

      // Notify peers about the screen sharing
      peersRef.current.forEach((peerRef) => {
        if (!peerRef.peer.destroyed) {
          const currentStreamTrack = peerRef.peer.streams[0].getVideoTracks()[0];
          peerRef.peer.replaceTrack(currentStreamTrack, screenTrack, peerRef.peer.streams[0]);
        }
      });
    } catch (error) {
      toast.warn("Denied accessing shared screen");
    }
  };

  // using webcam
  const handleUsingMediaStream = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: myConstraintAudioMedia,
      });
      setStream(videoStream);
      !openCamera && setOpenCamera(true);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = videoStream;
      }
      // Notfify peers about returning to video call
      peersRef.current.forEach((peerRef) => {
        if (!peerRef.peer.destroyed) {
          peerRef.peer.replaceTrack(
            peerRef.peer.streams[0].getVideoTracks()[0],
            videoStream.getVideoTracks()[0],
            peerRef.peer.streams[0]
          );
        }
      });
    } catch (error) {
      toast.error("Error accessing media devices");
    }
  };

  // Tạo một peer initiator để gửi tín hiệu và thông tin cá nhân đến friend (Khi room đã có người vào trước đó)
  /*
 - friendSocketId: socket id của friend
 - user: thông tin của mình
 - callerId: socket id của mình
 - stream: MediaStream của mình
  */
  const createPeer = ({
    friendSocketId,
    callerId,
    stream,
    user,
    iceServers,
  }: ICreatePeerParams) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false, // đảm bảo rằng không có dữ liệu nào được gửi đi trước khi kết nối hoàn chỉnh, và toàn bộ dữ liệu sẽ được gửi một lần duy nhất sau khi kết nối đã sẵn sàng (ngăn chặn việc gửi dữ liệu từ từ và liên tục)
      stream,
      config: {
        iceServers,
      },
    });

    // Khi được thiết lập sẽ gửi tín hiệu (signal) tới friend thông qua socket
    peer.on("signal", (signal) => {
      socket.current?.emit("send signal", {
        friendSocketId,
        callerId,
        signal,
        user,
      });
    });

    return peer;
  };

  // Tạo một peer không phải là initiator để xử lý tín hiệu từ friend. (Khi friend vô sau)
  // Caller id: socket id của friend
  // Signal: tín hiệu từ friend
  const addPeer = ({ signal, callerId, stream, iceServers }: IAddPeerParams) => {
    const peer = new SimplePeer({
      initiator: false, //Peer không khởi tạo việc kết nối, mà chờ để nhận tín hiệu từ peer khác.
      trickle: false,
      stream,
      config: {
        iceServers,
      },
    });

    // Khi có tín hiệu từ friend
    peer.on("signal", (signal) => {
      socket.current?.emit("return signal", {
        signal,
        callerId,
      });
    });

    // Khi xảy ra lỗi
    peer.on("error", (err) => {
      console.log("Peer error: ", err);
    });

    if (!peer.destroyed) {
      // Sử dụng tín hiệu (signal) nhận được từ peer bên friend, mình sẽ phản hồi tới WEB RTC để bắt đầu quá trình thiết lập kết nối tới peer friend
      peer.signal(signal);
    }
    return peer;
  };

  // Establish socket & connect to peers
  useEffect(() => {
    if (!profile) return;
    socket.current = io(process.env.BACK_END_URI as string);
    let localStream: MediaStream;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: myConstraintAudioMedia,
      })
      .then((stream) => {
        // Get TURN credential in production mode
        fetchTURNCredential()
          .then((data: unknown) => {
            if (!Array.isArray(data)) return;

            localStream = stream;
            myVideoRef.current.srcObject = stream;
            setStream(stream);
            socket.current?.emit("join video", {
              idGroupChat: groupChat._id,
              user: {
                username: profile.username,
                avatar: profile.avatar,
                _id: profile._id,
              },
            });

            // Event get all user in this room
            // Các friends đã vào trước đó
            socket.current?.on("all users", (listFriends: IPayload[]) => {
              const newFriendVideos = [] as IFriendVideo[];
              // Tạo các peer tương ứng với từng friend
              listFriends.forEach((friend) => {
                const peer = createPeer({
                  friendSocketId: friend.socketId,
                  callerId: socket.current!.id,
                  stream: stream,
                  user: {
                    username: profile.username,
                    avatar: profile.avatar,
                    _id: profile._id,
                  },
                  iceServers: data,
                });

                peersRef.current.push({
                  socketId: friend.socketId,
                  peer,
                });

                newFriendVideos.push({
                  socketId: friend.socketId,
                  peer,
                  friend,
                });
              });
              setListFriends(newFriendVideos);
            });

            // Event a user join
            socket.current?.on("user join", ({ signal, callerId, user }: IEventUserJoinParams) => {
              const newPeer = addPeer({
                signal,
                callerId,
                stream,
                iceServers: data,
              });
              peersRef.current.push({
                socketId: callerId,
                peer: newPeer,
              });

              setListFriends((prev) => [
                ...prev,
                {
                  peer: newPeer,
                  socketId: callerId,
                  friend: user,
                },
              ]);
            });

            // Tín hiệu từ friend đã vào trước đó
            // Khi một friend (đã vào trước đó) gửi lại tín hiệu (signal) để thiết lập kết nối
            socket.current?.on(
              "receive returned signal",
              (payload: { socketId: string; signal: SimplePeer.SignalData }) => {
                const { socketId, signal } = payload;
                // Tìm peer của friend để thực hiện kết nối từ bên friend với mình bằng method signal
                const item = peersRef.current.find((peer) => {
                  return peer.socketId === socketId;
                });
                if (item && !item.peer.destroyed) {
                  try {
                    item.peer.signal(signal);
                  } catch (error) {
                    console.log("Error: ", error);
                  }
                }
              }
            );

            // Event friend leaving
            socket.current?.on("leaved friend", (friendSocketId: string) => {
              const deletedPeer = peersRef.current.find((peer) => peer.socketId === friendSocketId);

              if (deletedPeer) {
                deletedPeer.peer.destroy();
                peersRef.current = [...peersRef.current].filter(
                  (peer) => peer.socketId !== friendSocketId
                );
                setListFriends((prev) =>
                  [...prev].filter((friend) => friend.socketId !== friendSocketId)
                );
              }
            });

            // Event sharing screen in room
            socket.current?.on("socket id sharing", (idSocket) => {
              setIdSocketSharingScreen(idSocket);
            });
          })
          .catch((err) => showErrorToast(err));
      })

      .catch((err) => {
        toast.error("Browser denied accessing media devices");
      });

    return () => {
      const videoTracks = localStream?.getVideoTracks();
      videoTracks?.forEach((track) => {
        track.stop();
      });
      socket.current?.close();
    };
  }, [profile]);

  // Friend turn on share screen: display stream on video share
  useEffect(() => {
    if (idSocketSharingScreen && idSocketSharingScreen !== socket.current?.id) {
      // Friend chia sẻ màn hình
      if (largeScreenRef.current) largeScreenRef.current.srcObject = streamShare;
    } else {
      if (isSharingScreen) {
        // Đang chia sẻ màn hình
        if (largeScreenRef.current && stream) largeScreenRef.current.srcObject = stream.clone();
      }
    }
  }, [streamShare, idSocketSharingScreen, isSharingScreen, stream]);

  // Friend turn off share screen: turn off stream video
  useEffect(() => {
    if (!idSocketSharingScreen) {
      streamShare && setStreamShare(null);
      if (largeScreenRef.current) largeScreenRef.current.srcObject = null;
    }
  }, [idSocketSharingScreen]);

  // You are joined so forbidden open new tab
  const isJoined = useMemo(() => {
    const isExisted = listFriends.some((item) => {
      return item.friend?._id === profile._id;
    });
    return isExisted;
  }, [profile, listFriends]);

  // Disable share screen because friend is sharing
  const disableShareScreen = useMemo<boolean>(() => {
    return !!(idSocketSharingScreen && idSocketSharingScreen !== socket.current?.id);
  }, [socket.current, idSocketSharingScreen]);

  // Toggle camera
  const handleToggleCamera = useCallback(() => {
    setOpenCamera(!openCamera);
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const track = videoTracks[0];
        track.enabled = !track.enabled;
      }
    }
  }, [openCamera, stream]);

  // Toggle mic
  const handleToggleMic = useCallback(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        const track = audioTracks[0];
        track.enabled = !track.enabled;
      }
      setOpenMic(!openMic);
    }
  }, [stream]);

  // Toggle share screen
  const handleToggleShareScreen = useCallback(async () => {
    if (isSharingScreen) {
      await handleUsingMediaStream();
      socket.current?.emit("off sharing screen", {
        idGroupChat: groupChat._id,
        socketId: socket.current.id,
      });
    } else {
      // Nếu có ai đó đang share hoặc mình đang share màn hình
      const disabledShare = !!(
        idSocketSharingScreen && idSocketSharingScreen !== socket.current?.id
      );
      if (disabledShare) return;
      await handleShareScreen();
      socket.current?.emit("on sharing screen", {
        idGroupChat: groupChat._id,
        socketId: socket.current.id,
      });
    }
    setSharingScreen(!isSharingScreen);
  }, [isSharingScreen]);

  // Toggle open/exit full screen
  const handleToggleFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await largeScreenRef.current?.requestFullscreen();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (!groupChat || isJoined) {
    return redirect("/");
  }

  return (
    <>
      <Helmet>
        <title>Video room | {groupChat.name}</title>
      </Helmet>
      <Box display={"flex"} flexDirection={"column"} height={"100vh"} overflow={"hidden"}>
        {/* Heading room */}
        <Heading groupChat={groupChat} />
        <Box
          position={"relative"}
          height={"100%"}
          boxShadow={2}
          p={1}
          sx={{ flex: "2 1 auto", overflow: "auto" }}
        >
          <Typography gutterBottom>Total friends joined: {listFriends.length}</Typography>
          <Grid container spacing={1} p={1} alignItems={"start"}>
            {/* Share screen */}
            {idSocketSharingScreen && (
              <Grid
                item
                md={10}
                xs={12}
                p={1}
                mb={4}
                border={1}
                borderColor={"error.main"}
                overflow={"hidden"}
                borderRadius={2}
                sx={{
                  video: {
                    width: "100%",
                    height: "100%",
                    border: 1,
                    borderRadius: "inherit",
                  },
                }}
              >
                <video muted={isSharingScreen} playsInline ref={largeScreenRef} autoPlay />
                <Stack
                  mt={1}
                  border={1}
                  borderRadius={1}
                  flexDirection={"row"}
                  justifyContent={"end"}
                  borderColor={"info.main"}
                >
                  <Tooltip title="Turn on/off full screen" arrow>
                    <IconButton color="info" onClick={handleToggleFullScreen}>
                      <FullscreenIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
            )}

            {/* List videos */}
            <Grid
              spacing={1.5}
              item
              container
              xs={12}
              md={idSocketSharingScreen ? 2 : 12}
              sx={{ maxHeight: idSocketSharingScreen ? "100vh" : "auto" }}
            >
              {/* My video */}
              <Grid item md={idSocketSharingScreen ? 12 : 4} sm={6} xs={12}>
                <Stack
                  p={1}
                  gap={1}
                  borderRadius={2}
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"space-between"}
                  position={"relative"}
                  border={socket.current?.id === idSocketSharingScreen ? 3 : 1}
                  borderColor={
                    socket.current?.id === idSocketSharingScreen ? "error.main" : "divider"
                  }
                >
                  <video
                    ref={myVideoRef}
                    muted
                    autoPlay
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "inherit",
                      height: 280,
                    }}
                  />

                  {/* Display avatar & name when off camera */}
                  {openCamera ? (
                    <Stack flexDirection={"row"} justifyContent={"center"}>
                      <Chip className="bg-gradient" label={profile.username} />
                    </Stack>
                  ) : (
                    !isSharingScreen && (
                      <Stack
                        gap={2}
                        position={"absolute"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"100%"}
                        overflow={"hidden"}
                        sx={{ inset: "0 0 0 0" }}
                      >
                        <Avatar
                          alt="avatar"
                          src={profile.avatar.uri}
                          sx={{ width: 150, height: 150 }}
                        />
                        <Chip
                          className="bg-gradient"
                          label={profile.username}
                          style={{ color: "#fff" }}
                        />
                      </Stack>
                    )
                  )}
                </Stack>
              </Grid>

              {/* Friend's videos */}
              {listFriends.map((item, index) => {
                const isSharing = idSocketSharingScreen === item.socketId;
                return (
                  <Grid key={index} item md={idSocketSharingScreen ? 12 : 4} sm={6} xs={12}>
                    <FriendVideo
                      isSharing={isSharing}
                      peer={item.peer}
                      friend={item.friend}
                      setStreamShare={setStreamShare}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Box>

        {/* Control camera & mic*/}
        {stream && (
          <ControlMedia
            openMic={openMic}
            isSharingScreen={isSharingScreen}
            openCamera={openCamera}
            disabledSharing={disableShareScreen}
            handleToggleCamera={handleToggleCamera}
            handleToggleShareScreen={handleToggleShareScreen}
            handleToggleMic={handleToggleMic}
          />
        )}
      </Box>
    </>
  );
};

export default memo(VideoRoom);
