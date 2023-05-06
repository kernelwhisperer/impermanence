import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  PaletteMode,
  ThemeOptions,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useMemo, useState } from "react";
//
import { FrontPage } from "./pages/FrontPage";
import { Settings } from "./Settings";

const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  }
};

const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  }
};

export function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const theme = useMemo(
    () => createTheme(mode === "dark" ? darkTheme : lightTheme),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar sx={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar sx={{flexDirection: "row-reverse"}}>
          <Settings mode={mode} setMode={setMode} />
        </Toolbar>
      </AppBar>
      <FrontPage />
    </ThemeProvider>
  );
}
