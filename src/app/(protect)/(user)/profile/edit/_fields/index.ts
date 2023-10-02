import { EditProfileSchema } from "@/utils/validation/profile";
import { TextFieldProps } from "@mui/material";
import { InferType } from "yup";

type NameField = InferType<typeof EditProfileSchema>;

type CustomTextFieldProps = TextFieldProps & { name: keyof NameField };

export const textFields: CustomTextFieldProps[] = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Enter your fullname",
  },
  {
    name: "username",
    label: "User name",
    type: "text",
    placeholder: "Enter your user name",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    name: "school",
    label: "School",
    type: "text",
    placeholder: "Example: ThuyLoi University",
  },
];
