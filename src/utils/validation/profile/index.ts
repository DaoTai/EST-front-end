import * as Yup from "yup";
import {
  MessageValidation,
  minCharacterValidator,
  maxCharacterValidator,
  notMatchValidator,
} from "@/utils/constants/messages";

export const EditProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(MessageValidation.required)
    .matches(/^([^0-9]*)$/, MessageValidation.fullName),
  username: Yup.string().required(MessageValidation.required).trim(),
  bio: Yup.string().max(300, maxCharacterValidator("Bio", 300)),
  dob: Yup.string(),
  gender: Yup.mixed().oneOf(["male", "female", "other", ""], MessageValidation.gender),
  school: Yup.string()
    .min(3, minCharacterValidator("School", 3))
    .max(80, maxCharacterValidator("School", 80)),
  city: Yup.string().max(50, maxCharacterValidator("City", 50)),
  favouriteProramingLanguages: Yup.array().of(
    Yup.string().min(1, minCharacterValidator("Programing language", 1))
  ),
});

export const EditPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .min(6, minCharacterValidator("Password", 6))
    .matches(/^\S*$/, MessageValidation.noSpace),
  newPassword: Yup.string()
    .trim()
    .required(MessageValidation.required)
    .min(6, minCharacterValidator("New password", 6))
    .matches(/^\S*$/, MessageValidation.noSpace)
    .notOneOf([Yup.ref("currentPassword")], MessageValidation.newPassword),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword")], notMatchValidator("New password", "Password")),
});
