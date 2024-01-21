import {
  MessageValidation,
  maxCharacterValidator,
  minCharacterValidator,
} from "@/utils/constants/messages";
import * as Yup from "yup";

export const FormLessonSchema = Yup.object().shape({
  name: Yup.string()
    .required(MessageValidation.required)
    .trim()
    .min(3, minCharacterValidator("Name", 3))
    .max(100, maxCharacterValidator("Name", 100)),
  isLaunching: Yup.boolean().required(MessageValidation.required),
  theory: Yup.string().min(5, minCharacterValidator("Theory", 5)),
  references: Yup.array().of(Yup.string().trim().min(3, minCharacterValidator("link", 3))),
});
