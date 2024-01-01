import { FormCourseSchema } from "@/utils/validation/course";

import { InferType } from "yup";

export type IEditFormCouse = InferType<typeof FormCourseSchema>;
export interface IFormCourse extends IEditFormCouse {
  thumbnail: File;
  roadmap?: File;
  openDate?: string;
  closeDate?: string;
}

export type IUploadImage = {
  file: File | null;
  preview: string;
};
