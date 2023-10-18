import {
  MessageValidation,
  minCharacterValidator,
  maxCharacterValidator,
} from "@/utils/constants/messages";
import * as Yup from "yup";

export const FormCourseSchema = Yup.object().shape({
  name: Yup.string()
    .required(MessageValidation.required)
    .min(2, minCharacterValidator("Name", 2))
    .max(300, maxCharacterValidator("Name", 300)),
  category: Yup.string().trim().required(MessageValidation.required),
  level: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .oneOf(["beginner", "fresher", "junior", "senior", "all"], MessageValidation.levelCourse)
    .default("all"),
  intro: Yup.string().default("").trim(),
  type: Yup.string().oneOf(["public", "private"], MessageValidation.typeCourse).default("public"),
});
