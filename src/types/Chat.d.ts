interface IGroupChat {
  _id: string;
  name: string;
  host: Member;
  members: Member[];
  blockedMembers: Member[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestChat: ILatestChat;
}

interface Member {
  _id: string;
  username: string;
  avatar: IProfile["avatar"];
  favouriteProrammingLanguages?: string[];
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
