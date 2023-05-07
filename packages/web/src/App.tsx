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
  Theme as MaterialUITheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useCallback, useMemo, useState } from "react";
//
import { FrontPage } from "./pages/FrontPage";
import { Settings } from "./Settings";
import { setElectronMode } from "./api/electron-api";

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
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(255,255,255)",
    },
    secondary: {
      main: "rgb(255,255,255)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          background: "rgb(255,255,255, 0.15)",
        },
      },
    },
  },
};

const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
    secondary: {
      main: "rgb(0,0,0)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          background: "rgb(0,0,0, 0.15)",
        },
      },
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
  const setMode = useCallback((mode: PaletteMode) => {
    setElectronMode(mode);
    setMuiMode(mode);
  }, [setMuiMode])

  console.log("📜 LOG > App > theme:", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          background: 'transparent',
          boxShadow: "none",
          "-webkit-app-region": "drag",
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
