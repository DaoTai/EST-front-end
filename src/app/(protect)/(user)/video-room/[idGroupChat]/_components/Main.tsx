"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { Socket, io } from "socket.io-client";
import ControlMedia from "./ControlMedia";
import FriendVideo from "./FriendVideo";
import { toast } from "react-toastify";

const Heading = dynamic(() => import("./Heading"), {
  ssr: false,
});

export interface PeerInstance extends SimplePeer.Instance {
  _id?: string;
  user?: IProfile;
  socketId?: string | undefined;
}

interface PeerRef {
  socketId: string;
  peer: PeerInstance;
}

type ICreatePeerParams = {
  friendSocketId: string;
  callerId: string;
  stream: MediaStream;
  user: Pick<IProfile, "avatar" | "username">;
};

type IAddPeerParams = {
  signal: SimplePeer.SignalData;
  callerId: string;
  stream: MediaStream;
};

type IEventUserJoinParams = {
  signal: SimplePeer.SignalData;
  callerId: string;
  user: Pick<IProfile, "avatar" | "username">;
};

type IPayload = {
  socketId: string;
  username: string;
  avatar: IProfile["avatar"];
};

export type IFriendVideo = {
  peer: PeerInstance;
  friend?: Pick<IProfile, "avatar" | "username">;
  socketId: string;
};

const VideoRoom = ({ idGroupChat }: { idGroupChat: string }) => {
  const { data: session } = useSession();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [listFriends, setListFriends] = useState<IFriendVideo[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const socket = useRef<Socket>();

  const myVideoRef = useRef<HTMLVideoElement | any>();
  const peersRef = useRef<PeerRef[]>([]);

  // Tạo kết nối ngang hàng
  /*
 - userId: id của friend
 - user: thông tin của mình
 - callerId: socket id của mình
 - stream: MediaStream của mình
  */
  const createPeer = ({ friendSocketId, callerId, stream, user }: ICreatePeerParams) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false, // đảm bảo rằng không có dữ liệu nào được gửi đi trước khi kết nối hoàn chỉnh, và toàn bộ dữ liệu sẽ được gửi một lần duy nhất sau khi kết nối đã sẵn sàng
      stream,
    });

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

  // Thêm kết nối ngang hàng
  // Caller id: socket id của friend
  // Signal: tín hiệu từ friend
  const addPeer = ({ signal, callerId, stream }: IAddPeerParams) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    // Khi có tín hiệu
    peer.on("signal", (signal) => {
      socket.current?.emit("return signal", {
        signal,
        callerId,
      });
    });

    // Khi đóng kết nối (rời video call)
    peer.on("close", () => {
      const currentPeer = { ...peer } as PeerInstance;
      const newPeers = [...listFriends].filter(({ peer }) => peer._id !== currentPeer._id);
      setListFriends(newPeers);
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
    socket.current = io(process.env.BACK_END_URI as string);
    let localStream: MediaStream;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        localStream = stream;
        myVideoRef.current.srcObject = stream;
        setStream(stream);
        socket.current?.emit("join video", {
          idGroupChat: idGroupChat,
          user: {
            username: session.username,
            avatar: session.avatar,
          },
        });

        // Event get all user in this room
        // Các friends đã vào trước đó
        socket.current?.on("all users", (listFriends: IPayload[]) => {
          const newFriendVideos = [] as IFriendVideo[];
          // Tạo các peer tương ứng với từng friend
          listFriends.forEach((user) => {
            const peer = createPeer({
              friendSocketId: user.socketId,
              callerId: socket.current!.id,
              stream: stream,
              user: {
                username: session.username,
                avatar: session.avatar,
              },
            });

            peersRef.current.push({
              socketId: user.socketId,
              peer,
            });

            newFriendVideos.push({
              peer: peer,
              friend: { ...user },
              socketId: user.socketId,
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

        // Establish connect: send signal to peers
        socket.current?.on(
          "receive returned signal",
          (payload: { socketId: string; signal: SimplePeer.SignalData }) => {
            const { socketId, signal } = payload;
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
            // peersRef.current.forEach((peerItem) => {
            //   if (peerItem.socketId === friendSocketId) {
            //     peerItem.peer.destroy();
            //   }
            // });

            peersRef.current = [...peersRef.current].filter(
              (peer) => peer.socketId !== friendSocketId
            );
            setListFriends((prev) =>
              [...prev].filter((friend) => friend.socketId !== friendSocketId)
            );
          }
        });
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
        toast.error("Error accessing media devices");
      });

    return () => {
      socket.current?.emit("leave");
      const videoTracks = localStream?.getVideoTracks();
      videoTracks?.forEach((track) => {
        track.stop();
      });
      socket.current?.close();
    };
  }, [session]);

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

  return (
    <>
      {/* Heading room */}
      <Heading />
      <Box position={"relative"} height={"100vh"} boxShadow={2} p={1} style={{ paddingTop: 60 }}>
        {/* List videos */}
        <Typography gutterBottom>Total: {listFriends.length}</Typography>
        <Grid container spacing={1}>
          {/* My video */}
          <Grid item md={4} sm={6} xs={6}>
            <Box sx={{ width: "100%", position: "relative" }}>
              <video
                ref={myVideoRef}
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                  maxHeight: 250,
                }}
              />

              {/* Display avatar & name when off camera */}
              {openCamera ? (
                <Typography textAlign={"center"}>{session?.username}</Typography>
              ) : (
                <Stack
                  position={"absolute"}
                  sx={{ inset: "0 0 0 0" }}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  width={"100%"}
                  overflow={"hidden"}
                >
                  <Avatar alt="avatar" src={session?.avatar.uri} sx={{ width: 150, height: 150 }} />
                  <Chip
                    className="bg-gradient"
                    label={session?.username}
                    style={{ color: "#fff" }}
                  />
                </Stack>
              )}
            </Box>
          </Grid>

          {/* Friend's videos */}
          {listFriends.map((item, index) => {
            return (
              <Grid key={index} item md={4} sm={6} xs={6}>
                <FriendVideo peer={item.peer} friend={item.friend} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Control camera & mic*/}
      {stream && (
        <ControlMedia
          stream={stream}
          openCamera={openCamera}
          handleToggleCamera={handleToggleCamera}
        />
      )}
    </>
  );
};

export default memo(VideoRoom);
