import { FormCourseSchema } from "@/utils/validation/course";

import { InferType } from "yup";

export type IEditProfile = InferType<typeof FormCourseSchema>;
