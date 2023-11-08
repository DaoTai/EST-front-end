import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { blue } from "@mui/material/colors";

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
          primary: "#292929",
        },
        gradient: {
          main: "linear-gradient(to right, #58a9eb, #aa99ff)",
        },
        backgroundGradient: {
          main: "linear-gradient(to right, #58a9eb, #aa99ff)",
        },
        white: {
          main: "#fff",
        },
      },
    },
    dark: {
      palette: {
        text: {
          primary: "#fff !important",
        },
        gradient: {
          main: "linear-gradient(to right, #58a9eb, #aa99ff)",
        },
        backgroundGradient: {
          main: "rgb(32,35,42)",
        },
        white: {
          main: "rgb(32,35,42)",
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          caretColor: blue[700],
        },
      },
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
