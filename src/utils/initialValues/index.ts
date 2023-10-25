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
  category: "",
  intro: "",
  level: "all",
  type: "public",
};

export const initFormLesson = {
  name: "",
  isLaunching: true,
  theory: "",
  references: [] as string[],
};

export const initFormQuestion = {
  content: "",
  category: "",
  expiredTime: "",
  correctAnswers: [""] as string[],
  explaination: "",
};
