interface IQuestion {
  _id: string;
  content: string;
  category: "code" | "choice" | "multiple-choice";
  answers?: string[];
  correctAnswers?: string[];
  explaination?: string;
  createdAt: Date;
  updatedAt: Date;
}
