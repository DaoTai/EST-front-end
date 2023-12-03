import * as Yup from "yup";
import { MessageValidation, minCharacterValidator } from "@/utils/constants/messages";

export const FormQuestionSchema = Yup.object().shape({
  content: Yup.string()
    .required(MessageValidation.required)
    .trim()
    .min(3, minCharacterValidator("Content", 3)),
  category: Yup.string()
    .required(MessageValidation.required)
    .oneOf(["code", "choice", "multiple-choice"], MessageValidation.categoryQuestion),
  correctAnswers: Yup.array().of(
    Yup.string().trim().min(1, minCharacterValidator("Correct answers", 1))
  ),
  answers: Yup.array().of(Yup.string().trim().min(2, minCharacterValidator("Answers", 2))),
  explaination: Yup.string().trim(),
});
