interface IReport {
  sender: IUser;
  message: string;
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
  questions: any[];
  reports: IReport[];
  createdAt: string;
  updatedAt: string;
}
