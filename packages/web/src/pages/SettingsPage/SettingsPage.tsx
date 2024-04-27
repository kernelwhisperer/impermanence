import { Stack, TextField, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import React from "react";

import {
  $disallowedKeywords,
  $includedKeywords,
} from "../../stores/settings-store";

export function SettingsPage() {
  const disallowedKeywords = useStore($disallowedKeywords);
  const includedKeywords = useStore($includedKeywords);

  return (
    <Stack sx={{ padding: 2 }} gap={2}>
      <Typography variant="h6">Settings</Typography>
      <TextField
        label="Keywords to exclude"
        fullWidth
        variant="outlined"
        value={disallowedKeywords}
        onChange={(e) => $disallowedKeywords.set(e.target.value)}
      />
      <TextField
        label="Keywords to include"
        fullWidth
        variant="outlined"
        value={includedKeywords}
        onChange={(e) => $includedKeywords.set(e.target.value)}
      />
    </Stack>
  );
}
