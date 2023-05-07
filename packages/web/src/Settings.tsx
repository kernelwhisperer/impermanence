import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export function Settings(props) {
  const { mode, setMode } = props;
  return (
    <>
      <IconButton
        sx={{
          "WebkitAppRegion": "no-drag",
        }}
        size={"small"}
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        color="primary"
      >
        {mode === "dark" ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
      </IconButton>
    </>
  );
}
