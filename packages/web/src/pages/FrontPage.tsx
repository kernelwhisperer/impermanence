import {
  Button,
  CircularProgress,
  Fade,
  IconButton,
  LinearProgress,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Refresh } from "@mui/icons-material";
import styled from "@emotion/styled";
//
import { fetchRandomImage } from "../unsplash-api";
import { sendBlobToMain } from "../api/electron-api";

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

type ProgressBarProps = { visible: boolean };

const ProgressBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "visible",
})<ProgressBarProps>`
  position: absolute;
  width: 100%;

  background: none;

  transition: opacity 0.225s linear;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export function FrontPage() {
  const [imageSrc, setImageSrc] = useState("");
  const imageBlob = useRef<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshImage = useCallback(async () => {
    setLoading(true);

    const blob = await fetchRandomImage();

    imageBlob.current = blob;
    setImageSrc(URL.createObjectURL(blob));

    setLoading(false);
  }, [setLoading, setImageSrc, imageBlob]);

  const saveImageToDisk = useCallback(async () => {
    console.log(
      "📜 LOG > saveImageToDisk > imageBlob.size",
      imageBlob.current?.size
    );
    if (imageBlob.current === null) return;
    sendBlobToMain("Unknown image", imageBlob.current);
  }, [imageBlob]);

  useEffect(() => {
    refreshImage();
  }, [refreshImage]);

  return (
    <MainContainer>
      <Background style={{ backgroundImage: `url(${imageSrc})` }} />
      <ProgressBar variant="indeterminate" visible={loading} />
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
        <Button variant="text" onClick={saveImageToDisk}>
          Set image
        </Button>
      </ButtonContainer>
    </MainContainer>
  );
}
