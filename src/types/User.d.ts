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
  updatedAt: string;
  accessToken?: string;
  provider?: string;
}
