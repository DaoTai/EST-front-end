interface IGroupChat {
  _id: string;
  name: string;
  host: IMemberGroupChat;
  createdAt: string;
  updatedAt: string;
  members: IMemberGroupChat[];
  blockedMembers: IMemberGroupChat[];
  latestReadBy: IMemberGroupChat[];
  latestChat?: IChat;
}

interface IMemberGroupChat {
  _id: string;
  username: string;
  avatar: IProfile["avatar"];
  favouriteProrammingLanguages?: string[];
}

interface IChat {
  _id: string;
  idGroupChat: string;
  sender: Pick<IProfile, "_id" | "username" | "avatar">;
  message: string;
  createdAt: string;
  updatedAt: string;
  attachments: IAttachment[];
}

interface IFormChat {
  message: string;
  images?: FileList;
}
