import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#35414c",
        },
        gradient: {
          main: "linear-gradient(to right, #58a9eb, #cce5eb)",
        },
        backgroundGradient: {
          main: "linear-gradient(to right, #58a9eb, #cce5eb)",
        },
      },
    },
    dark: {
      palette: {
        text: {
          primary: "#fff",
        },
        gradient: {
          main: "linear-gradient(to right, #58a9eb, #cce5eb)",
        },
        backgroundGradient: {
          main: "#000",
        },
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 17,
          padding: 8,
          textTransform: "initial",
        },
      },
      variants: [
        {
          props: { variant: "white" },
          style: {
            backgroundColor: "white",
            color: "#35414c",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.8)",
            },
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 17,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
  },
});

export default theme;
