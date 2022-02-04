import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useCallback, useEffect, useState } from "react";
import { fetchImageUrl } from "./api";
import "./App.css";

function App() {
  const [imageSrc, setImageSrc] = useState();

  const refreshImage = useCallback(async () => {
    const imgSrc = await fetchImageUrl();
    setImageSrc(imgSrc);
  }, []);

  useEffect(() => {
    refreshImage();
  }, [refreshImage]);

  return (
    <>
      <CssBaseline />
      <div className="app" style={{ background: `url(${imageSrc})` }}>
        <IconButton
          aria-label="refresh image"
          color="primary"
          onClick={refreshImage}
          size="large"
        >
          <Refresh />
        </IconButton>
      </div>
    </>
  );
}

export default App;
