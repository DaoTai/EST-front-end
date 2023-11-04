interface IAnswerRecord {
  _id: string;
  user: string;
  question: IQuestion;
  answers: string[];
  score?: number;
  comment?: string;
}
