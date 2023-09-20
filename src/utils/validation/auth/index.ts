import * as Yup from "yup";
import {
  MessageValidation,
  minCharacterValidator,
  maxCharacterValidator,
} from "@/utils/constants/messages";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required(MessageValidation.required)
    .email(MessageValidation.email)
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, MessageValidation.email)
    .trim(),
  password: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .min(6, MessageValidation.password),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .email(MessageValidation.email)
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, MessageValidation.email),
  fullName: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .min(2, minCharacterValidator("Full name", 2))
    .max(30, maxCharacterValidator("Full name", 30))
    .matches(/^([^0-9]*)$/, MessageValidation.fullName),

  password: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .min(6, minCharacterValidator("Password", 6))
    .matches(/^\S*$/, MessageValidation.noSpace),
});
