import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import defaultTheme from "./theme";

const customTheme = responsiveFontSizes(defaultTheme);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
