import {
  Button,
  CircularProgress,
  Fade,
  IconButton,
  LinearProgress,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Refresh } from "@mui/icons-material";
import styled from "@emotion/styled";
//
import { fetchRandomImage } from "../unsplash-api";
import { sendImageToElectron } from "../api/electron-api";

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
  const [base64Image, setBase64Image] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const refreshImage = useCallback(async () => {
    setLoading(true);

    const base64Image = await fetchRandomImage();

    setBase64Image(base64Image);
    setLoading(false);
  }, [setLoading, setBase64Image]);

  const saveImageToDisk = useCallback(async () => {
    if (!base64Image) return;
    sendImageToElectron("Unknown image", base64Image);
  }, [base64Image]);

  // useEffect(() => {
  //   localStorage.setItem("FrontPage:base64Image", base64Image);
  // }, [base64Image]);

  // useEffect(() => {
  //   const base64Image = localStorage.getItem("FrontPage:base64Image");
  //   console.log("📜 LOG > localStorage:getItem > base64Image:", base64Image);
  //   if (base64Image) {
  //     setBase64Image(base64Image);
  //   }
  // }, [setBase64Image]);

  return (
    <MainContainer>
      {/* <img src={imageBlob}></img> */}
      <Background style={{ backgroundImage: `url(${base64Image})` }} />
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
