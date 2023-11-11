interface IReport {
  _id: string;
  user: IUser | string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ILesson {
  _id: string;
  course: ICourse & string;
  name: string;
  slug: string;
  isLaunching: boolean;
  theory: string;
  references: string[];
  video: IAttachment;
  comments: any[];
  questions: IQuestion[];
  reports: IReport[];
  createdAt: string;
  updatedAt: string;
}

interface ILessonComment {
  _id: string;
  user: IUser;
  lesson: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
