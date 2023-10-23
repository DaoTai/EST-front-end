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
  createdAt: string;
  updatedAt: string;
}
