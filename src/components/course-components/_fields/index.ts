import { FormCourseSchema } from "@/utils/validation/course";
import { TextFieldProps, SelectProps, MenuItemProps } from "@mui/material";
import { InferType } from "yup";

type NameField = InferType<typeof FormCourseSchema>;

type CustomTextFieldProps = TextFieldProps & { name: keyof NameField };
type CustomSelectProps = SelectProps & { name: keyof NameField };
type SelectFields = {
  props: CustomSelectProps;
  menuItem: Array<MenuItemProps & { label: string }>;
};

export const textFields: CustomTextFieldProps[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name course",
    fullWidth: true,
    required: true,
  },
];

export const selectFields: SelectFields[] = [
  {
    props: {
      name: "level",
      label: "Level",
      fullWidth: true,
      required: true,
    },
    menuItem: [
      {
        value: "beginner",
        label: "Beginner",
      },
      {
        value: "fresher",
        label: "Fresher",
      },
      {
        value: "junior",
        label: "Junior",
      },
      {
        value: "senior",
        label: "Senior",
      },
      {
        value: "all",
        label: "All",
      },
    ],
  },
  {
    props: {
      name: "type",
      label: "Type",
      fullWidth: true,
      required: true,
    },
    menuItem: [
      {
        value: "public",
        label: "Public",
      },
      {
        value: "private",
        label: "Private",
      },
    ],
  },
];
