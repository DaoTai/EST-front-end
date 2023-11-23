interface IGroupChat {
  _id: string;
  name: string;
  host: Pick<IProfile, "avatar" | "_id">;
  members: Member[];
  blockedMembers: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestChat: ILatestChat;
}

interface Member {
  _id: string;
  username: string;
  avatar: IProfile["avatar"];
}

interface ILatestChat {
  _id: string;
  idGroupChat: string;
  sender: string;
  message: string;
  seen: any[];
  attachments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
