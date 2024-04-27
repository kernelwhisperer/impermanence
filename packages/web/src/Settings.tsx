import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsRounded,
} from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { IconButton, PaletteMode } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface SettingsProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}

export function Settings(props: SettingsProps) {
  const { mode, setMode } = props;

  return (
    <>
      <IconButton
        sx={{ WebkitAppRegion: "no-drag" }}
        size="small"
        color="primary"
        component={Link}
        to="/"
      >
        <HomeRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        sx={{ WebkitAppRegion: "no-drag" }}
        size="small"
        color="primary"
        component={Link}
        to="/settings"
      >
        <SettingsRounded fontSize="small" />
      </IconButton>
      <IconButton
        sx={{ WebkitAppRegion: "no-drag" }}
        size="small"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        color="primary"
      >
        {mode === "dark" ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </>
  );
}
