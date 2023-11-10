import "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      main: string;
    };
    backgroundGradient: {
      main: string;
    };
    white: {
      main: string;
      light: string;
    };
    mainBlue: {
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
    white: {
      main: string;
      light: string;
    };
    mainBlue: {
      main: string;
    };
  }

  // interface TypographyVariants {
  //   title: React.CSSProperties;
  // }

  // interface TypographyVariantsOptions {
  //   title?: React.CSSProperties;
  // }
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
