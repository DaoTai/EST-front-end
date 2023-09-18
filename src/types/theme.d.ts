import "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    gradient: Palette["primary"];
  }

  interface PaletteOptions {
    gradient?: PaletteOptions["primary"];
  }
}
