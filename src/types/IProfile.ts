import { EditProfileSchema } from "@/utils/validation/profile";
import { InferType } from "yup";

export type IEditProfile = InferType<typeof EditProfileSchema>;
