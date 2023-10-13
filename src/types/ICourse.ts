import { FormCourseSchema } from "@/utils/validation/course";

import { InferType } from "yup";

export type IEditProfile = InferType<typeof FormCourseSchema>;
export interface IFormCourse extends IEditProfile {
  thumbnail: File;
  roadmap?: File;
  openDate?: string;
  closeDate?: string;
}
