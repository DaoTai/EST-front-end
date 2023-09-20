import "@mui/material";
declare module "@mui/material/styles" {}

declare module "@mui/material/Button" {
  interface ButtonVariants {
    white: true;
  }

  interface ButtonVariantOverrides {
    white: true;
  }
  interface ButtonPropsVariantOverrides {
    white: true;
  }
}
