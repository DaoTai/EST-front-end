export enum MessageValidation {
  required = "Please fill this field",
  email = "Email is invalid",
  fullName = "Full name is invalid",
  password = "Password is at least 6 characters",
  newPassword = "New password must be different current password",
  noSpace = "Please do not use any spaces",
  gender = "Gender is invalid",
  date = "Date is invalid",
  levelCourse = "Level course is invalid",
  typeCourse = "Type course is invalid",
}

export const minCharacterValidator = (field: string, min: number): string => {
  if (min < 1) return "";
  return `${field} is at least ${min} ` + (min > 1 ? "characters" : "character");
};

export const maxCharacterValidator = (field: string, max: number): string => {
  if (max < 1) return "";
  return `${field} is at maximum ${max} ` + (max > 1 ? "characters" : "character");
};

export const notMatchValidator = (field: string, compareField: string) =>
  field + " unmatched with " + compareField;
