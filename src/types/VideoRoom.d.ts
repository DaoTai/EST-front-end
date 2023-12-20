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
  user: Pick<IProfile, "avatar" | "username">;
}

interface IAddPeerParams {
  signal: SimplePeer.SignalData;
  callerId: string;
  stream: MediaStream;
}

interface IEventUserJoinParams {
  signal: SimplePeer.SignalData;
  callerId: string;
  user: Pick<IProfile, "avatar" | "username">;
}

interface IPayload {
  socketId: string;
  username: string;
  avatar: IProfile["avatar"];
}

interface IFriendVideo {
  peer: PeerInstance;
  friend?: Pick<IProfile, "avatar" | "username">;
  socketId: string;
}
