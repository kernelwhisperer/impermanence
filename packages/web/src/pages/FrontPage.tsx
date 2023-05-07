import styled from "@emotion/styled";
import { NavigateNext } from "@mui/icons-material";
import { alpha, Button, CircularProgress, Skeleton } from "@mui/material";
import React, { useCallback, useState } from "react";

import { sendImageToElectron } from "../api/electron-api";
import { fetchRandomImage } from "../unsplash-api";
import { DEFAULT_IMG } from "./default-image";

const MainContainer = styled.div`
  height: ${(props) =>
    `calc(100% - ${props.theme.mixins.toolbar.minHeight}px - 16px)`};
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.spacing(1)};
  position: relative;
`;

const Image = styled.div`
  flex-grow: 1;

  transition: background-image 0.4s linear;
  background-size: cover;
  background-position: center;
  border-radius: ${(props) => props.theme.shape.borderRadius * 2}px;
`;

const ImagePlaceholder = styled(Skeleton)`
  flex-grow: 1;
  border-radius: ${(props) => props.theme.shape.borderRadius * 2}px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: ${(props) => props.theme.spacing(1)};
  padding-top: ${(props) => props.theme.spacing(4)};
  background: linear-gradient(
    360deg,
    ${(props) => alpha(props.theme.palette.background.default, 1)} 0%,
    ${(props) => alpha(props.theme.palette.background.default, 0.8)} 33%,
    transparent 100%
  );

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NextButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

export function FrontPage() {
  const [base64Image, setBase64Image] = useState<string>(DEFAULT_IMG);
  const [loading, setLoading] = useState(false);

  const nextImage = useCallback(async () => {
    setLoading(true);

    const { asBase64 } = await fetchRandomImage();

    setBase64Image(asBase64);
    setLoading(false);
  }, [setLoading, setBase64Image]);

  const saveImageToDisk = useCallback(async () => {
    if (!base64Image) return;
    sendImageToElectron("Unknown image", base64Image);
  }, [base64Image]);

  return (
    <MainContainer>
      {loading ? (
        <ImagePlaceholder animation="wave" variant="rectangular" />
      ) : (
        <Image style={{ backgroundImage: `url(${base64Image})` }} />
      )}
      <NextButtonContainer></NextButtonContainer>
      <ButtonContainer>
        <Button variant="outlined" color="secondary" onClick={saveImageToDisk}>
          Set as wallpaper
        </Button>
        <Button
          onClick={nextImage}
          color="primary"
          variant="outlined"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={16} /> : <NavigateNext />
          }
        >
          Next
        </Button>
      </ButtonContainer>
    </MainContainer>
  );
}
