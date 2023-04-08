import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#fff",
    },

    error: {
      main: "#ff5722",
    },
  },

  typography: {
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default defaultTheme;
