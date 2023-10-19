import { MessageValidation, minCharacterValidator } from "@/utils/constants/messages";
import * as Yup from "yup";

export const FormLessonSchema = Yup.object().shape({
  name: Yup.string()
    .required(MessageValidation.required)
    .trim()
    .min(2, minCharacterValidator("Name", 2)),
  isLaunching: Yup.boolean().required(MessageValidation.required),
  theory: Yup.string().min(5, minCharacterValidator("Theory", 5)),
  references: Yup.array().of(Yup.string().trim().min(3, minCharacterValidator("link", 3))),
});
