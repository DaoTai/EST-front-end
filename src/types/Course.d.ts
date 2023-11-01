interface ICourse {
  _id: string;
  name: string;
  category: string;
  level: "beginner" | "fresher" | "junior" | "senior" | "all";
  status: "pending" | "approved";
  deleted: boolean;
  type: "public" | "private";
  slug: string;
  createdBy: IProfile;
  createdAt: string;
  updatedAt: string;
  members: any[];
  lessons: Lesson[];
  intro: string;
  thumbnail: IAttachment;
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
  rating?: number;
  passedLessons: ILesson[];
  latestLesson?: ILesson;
  createdAt: string;
  updatedAt: string;
}
