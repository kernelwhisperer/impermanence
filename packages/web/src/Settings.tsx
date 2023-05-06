import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export function Settings(props) {
  const { mode, setMode } = props;
  return (
    <>
      <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
      </IconButton>
    </>
  );
}
