interface IAttachment {
  uri: string;
  type?: string;
  storedBy?: string;
}

interface IUser {
  _id: string;
  email: string;
  roles: string[];
  fullName: string;
  avatar: IAttachment;
  favouriteProrammingLanguages: string[];
  deleted: boolean;
  username: string;
  createdAt: string;
  bio?: string;
  dob?: string;
  gender?: string;
  school?: string;
  city?: string;
  updatedAt: string;
  provider?: string;
  accessToken?: string;
  refreshToken?: string;
}

interface IProfile {
  _id: string;
  email: string;
  roles: string[];
  fullName: string;
  avatar: IAttachment;
  favouriteProrammingLanguages: string[];
  deleted: boolean;
  username: string;
  bio?: string;
  dob?: string;
  gender?: string;
  school?: string;
  city?: string;
  createdAt: string;
  updatedAt: string;
}

interface ICv {
  _id: string;
  user: IProfile;
  role: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
