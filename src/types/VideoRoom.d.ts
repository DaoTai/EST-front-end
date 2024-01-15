import SimplePeer from "simple-peer";

interface PeerInstance extends SimplePeer.Instance {
  _id?: string;
  user?: IProfile;
  socketId?: string | undefined;
}

interface PeerRef {
  socketId: string;
  peer: PeerInstance;
}

interface ICreatePeerParams {
  friendSocketId: string;
  callerId: string;
  stream: MediaStream;
  user: Pick<IProfile, "avatar" | "username" | "_id">;
  iceServers: any[];
}

interface IAddPeerParams {
  signal: SimplePeer.SignalData;
  callerId: string;
  stream: MediaStream;
  iceServers: any[];
}

interface IEventUserJoinParams {
  signal: SimplePeer.SignalData;
  callerId: string;
  user: Pick<IProfile, "avatar" | "username" | "_id">;
}

interface IPayload {
  socketId: string;
  username: string;
  avatar: IProfile["avatar"];
  _id: string;
}

interface IFriendVideo {
  peer: PeerInstance;
  friend?: Pick<IProfile, "avatar" | "username" | "_id">;
  socketId: string;
}
