interface IUser {
  _id: string;
  email: string;
  roles: string[];
  fullName: string;
  avatar: string;
  favouriteProramingLanguages: any[];
  deleted: boolean;
  username: string;
  createdAt: string;
  bio?: string;
  dob?: string;
  gender?: string;
  school?: string;
  updatedAt: string;
  accessToken?: string;
  provider?: string;
}
