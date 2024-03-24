import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  PaletteMode,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useStore } from "@nanostores/react";
import React from "react";

import { $disallowedKeywords } from "./stores/settings-store";

interface SettingsProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}

export function Settings(props: SettingsProps) {
  const { mode, setMode } = props;

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const disallowedKeywords = useStore($disallowedKeywords);

  return (
    <>
      <IconButton
        sx={{ WebkitAppRegion: "no-drag" }}
        size="small"
        color="primary"
        onClick={toggleDrawer(true)}
      >
        <SettingsRounded fontSize="small" />
      </IconButton>
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <Stack sx={{ padding: 2 }} gap={2}>
          <Typography variant="h6">Settings</Typography>
          <TextField
            label="Keywords to exclude"
            fullWidth
            variant="outlined"
            value={disallowedKeywords}
            onChange={(e) => $disallowedKeywords.set(e.target.value)}
          />
        </Stack>
      </Drawer>
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
