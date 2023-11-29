interface IGroupChat {
  _id: string;
  name: string;
  host: IMemberGroupChat;
  createdAt: string;
  updatedAt: string;
  members: IMemberGroupChat[];
  blockedMembers: IMemberGroupChat[];
  latestReadBy: IMemberGroupChat[] | string[];
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
  seo?: ISEOChat;
}

interface IFormChat {
  message: string;
  images?: FileList;
}

interface ISEOChat {
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  href: string;
  ogImage: ISEOChatImage;
}

interface ISEOChatImage {
  width?: string;
  height?: string;
  url: string;
}
