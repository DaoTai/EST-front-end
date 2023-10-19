import { FormLessonSchema } from "@/utils/validation/lesson";

import { InferType } from "yup";

export type IFormLesson = InferType<typeof FormLessonSchema> & {
  video?: File;
};
