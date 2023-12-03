export const initEditProfile = {
  fullName: "",
  username: "",
  bio: "",
  dob: null,
  gender: "",
  school: "",
  city: "",
  favouriteProrammingLanguages: [],
};

export const initChangePwd = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const initFormCourse = {
  name: "",
  suitableJob: "",
  intro: "",
  level: "all",
  type: "public",
  programmingLanguages: [] as string[],
};

export const initFormLesson = {
  name: "",
  isLaunching: true,
  theory: "",
  references: [] as string[],
};

export const initFormQuestion: Omit<IQuestion, "_id" | "createdAt" | "updatedAt"> = {
  content: "",
  category: "choice",
  answers: [] as string[],
  correctAnswers: [] as string[],
  explaination: "",
};
