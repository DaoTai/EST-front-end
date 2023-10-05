import { EditProfileSchema, EditPasswordSchema } from "@/utils/validation/profile";

import { InferType } from "yup";

export type IEditProfile = InferType<typeof EditProfileSchema>;
export type IEditPassword = InferType<typeof EditPasswordSchema>;
