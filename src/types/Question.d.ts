export interface IQuestion {
  _id: string;
  content: string;
  category: "code" | "choice" | "multiple-choice";
  correctAnswers: string[];
  explaination: string;
  createdAt: Date;
  updatedAt: Date;
}
