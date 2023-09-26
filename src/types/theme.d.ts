import "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      main: string;
    };
    backgroundGradient: {
      main: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      main: string;
    };
    backgroundGradient?: {
      main: string;
    };
  }
}

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
