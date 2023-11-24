interface IGroupChat {
  _id: string;
  name: string;
  host: IMemberGroupChat;
  members: IMemberGroupChat[];
  blockedMembers: IMemberGroupChat[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestChat: ILatestChat;
}

interface IMemberGroupChat {
  _id: string;
  username: string;
  avatar: IProfile["avatar"];
  favouriteProrammingLanguages?: string[];
}

interface ILatestChat {
  _id: string;
  idGroupChat: string;
  sender: IProfile;
  message: string;
  seen: any[];
  attachments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
