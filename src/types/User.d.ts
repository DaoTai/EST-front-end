interface IUser {
  _id: string;
  email: string;
  roles: string[];
  fullName: string;
  avatar: string;
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
  accessToken?: string;
  provider?: string;
}
