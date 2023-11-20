interface IAnswerRecord {
  _id: string;
  user: IProfile;
  question: IQuestion;
  answers: string[];
  score?: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
