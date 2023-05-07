import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  AppBar,
  createTheme,
  PaletteMode,
  Theme as MaterialUITheme,
  ThemeOptions,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useCallback, useMemo, useState } from "react";

import { setElectronMode } from "./api/electron-api";
import { FrontPage } from "./pages/FrontPage";
import { Settings } from "./Settings";

// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module "@emotion/react" {
  export interface Theme extends MaterialUITheme {
    // cast shape to number
    shape: {
      borderRadius: number;
    };
  }
}

const darkTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "rgb(255,255,255, 0.15)",
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(255,255,255)",
    },
    secondary: {
      main: "rgb(255,255,255)",
    },
  },
};

const lightTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "rgb(0,0,0, 0.15)",
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
    secondary: {
      main: "rgb(0,0,0)",
    },
  },
};
export function App() {
  const [mode, setMuiMode] = useState<PaletteMode>("dark");
  const theme = useMemo(
    () =>
      createTheme({
        ...(mode === "dark" ? darkTheme : lightTheme),
        mixins: {
          toolbar: {
            minHeight: 40,
          },
        },
      }),
    [mode]
  );
  const setMode = useCallback(
    (mode: PaletteMode) => {
      setElectronMode && setElectronMode(mode);
      setMuiMode(mode);
    },
    [setMuiMode]
  );

  console.log("📜 LOG > App > theme:", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          WebkitAppRegion: "drag",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ paddingX: 1 }} disableGutters>
          <Settings mode={mode} setMode={setMode} />
        </Toolbar>
      </AppBar>
      <FrontPage />
    </ThemeProvider>
  );
}
