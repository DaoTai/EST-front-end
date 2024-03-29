interface ICourse {
  _id: string;
  name: string;
  suitableJob: string;
  level: "beginner" | "fresher" | "junior" | "senior" | "all";
  status: "pending" | "approved";
  deleted: boolean;
  type: "public" | "private";
  slug: string;
  createdBy: IProfile;
  createdAt: string;
  updatedAt: string;
  members?: IProfile[];
  lessons?: ILesson[];
  totalLessons: number;
  programmingLanguages: string[];
  intro: string;
  thumbnail?: IAttachment;
  openDate?: string;
  closeDate?: string;
  deletedAt?: string;
  roadmap?: IAttachment;
  averageRating?: number;
  totalRating?: number;
}

interface IRegisterCourse {
  _id: string;
  user: IUser;
  course: ICourse;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  passedLessons: ILesson[];
  teacher?: IUser;
}
