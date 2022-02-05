import React, { useCallback, useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";
import {
  CircularProgress,
  Fade,
  IconButton,
  LinearProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import { fetchImageUrl } from "../api";
import { wait } from "../utils";

const MainContainer = styled.div`
  height: 100%;
  display: flex;
`;

const Background = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  transition: background-image 0.4s linear;
  background-size: cover;
  background-position: center;
`;

const ButtonContainer = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "visible",
})`
  position: absolute;
  width: 100%;

  background: none;

  & > .MuiLinearProgress-bar {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &[aria-valuenow="0"] {
    transition: none;

    & > .MuiLinearProgress-bar {
      transition: none;
    }
  }

  transition: opacity 1s linear;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export function FrontPage() {
  const [imageSrc, setImageSrc] = useState();
  const [progress, setProgress] = useState(100);

  const refreshImage = useCallback(async () => {
    setProgress(0);
    await wait(500);
    const imgSrc = await fetchImageUrl({
      onDownloadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentage);
        console.log("📜 LOG > refreshImage > percentage", percentage);
      },
    });
    console.log("📜 LOG > refreshImage > imgSrc", imgSrc);
    setImageSrc(imgSrc);
  }, []);

  useEffect(() => {
    refreshImage();
  }, [refreshImage]);

  const loading = progress !== 100;

  return (
    <MainContainer>
      <Background style={{ backgroundImage: `url(${imageSrc})` }} />
      <ProgressBar variant="determinate" value={progress} visible={loading} />
      <ButtonContainer>
        <IconButton
          aria-label="refresh image"
          color="primary"
          onClick={refreshImage}
          size="large"
          disabled={loading}
        >
          <Fade in={!loading}>
            <Refresh />
          </Fade>
          <Fade in={loading}>
            <CircularProgress size={24} style={{ position: "absolute" }} />
          </Fade>
        </IconButton>
      </ButtonContainer>
    </MainContainer>
  );
}
