import styled from "@emotion/styled";
import { NavigateNext } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, Button, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useInterval, useTimeout } from "usehooks-ts";

import { sendImageToElectron } from "../../api/electron-api";
import { fetchRandomImage, ImageResult } from "../../unsplash-api";
import { msUntilNextInterval } from "../../utils";
import { DEFAULT_INTERVAL_MS } from "../SettingsPage/default-settings";
import { DEFAULT_IMG } from "./default-image";
import { ImageMetadata } from "./ImageMetadata";

const MainContainer = styled.div`
  height: ${(props) =>
    `calc(100vh - ${props.theme.mixins.toolbar.minHeight}px - 16px)`};
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

const ImageOverlay = styled(Stack)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: ${(props) => props.theme.spacing(1)};
  padding-top: ${(props) => props.theme.spacing(10)};
  background: linear-gradient(
    360deg,
    ${(props) => alpha(props.theme.palette.background.default, 1)} 0%,
    ${(props) => alpha(props.theme.palette.background.default, 0.7)} 45%,
    ${(props) => alpha(props.theme.palette.background.default, 0.4)} 75%,
    transparent 100%
  );
`;

export function FrontPage() {
  const [imageResult, setImageResult] = useState<ImageResult>({
    altDescription: "Alt description",
    asBase64: DEFAULT_IMG,
    authorName: "Author",
    color: "#fff",
    createdAt: "12",
    description: "Description",
    downloadUrl: "website.org",
    height: 100,
    location: {
      city: null,
      country: null,
      name: null,
    },
    siteUrl: "website.com",
    tagsPreview: [{ title: "hey", type: "boo" }],
    views: 123,
    width: 100,
  });

  const [loading, setLoading] = useState(false);

  const nextImage = useCallback(async () => {
    setLoading(true);

    const img = await fetchRandomImage();
    setImageResult(img);

    setLoading(false);
    return img;
  }, [setLoading, setImageResult]);

  const saveImageToDisk = useCallback(async () => {
    if (!imageResult) return;
    sendImageToElectron("Unknown image", imageResult.asBase64);
  }, [imageResult]);

  const handleAutoUpdate = useCallback(async () => {
    const img = await nextImage();
    sendImageToElectron("Unknown image", img.asBase64);
  }, [nextImage]);

  const [intervalActive, setIntervalActive] = useState<boolean>(false);
  const startInterval = useCallback(() => {
    setIntervalActive(true);
    handleAutoUpdate();
  }, [setIntervalActive, handleAutoUpdate]);
  useTimeout(startInterval, msUntilNextInterval());

  useInterval(
    handleAutoUpdate,
    // Delay in milliseconds or null to stop it
    intervalActive ? DEFAULT_INTERVAL_MS : null
  );

  return (
    <MainContainer>
      {loading ? (
        <ImagePlaceholder animation="wave" variant="rectangular" />
      ) : (
        <Image style={{ backgroundImage: `url(${imageResult.asBase64})` }} />
      )}
      <ImageOverlay gap={2}>
        <ImageMetadata imageResult={imageResult} />
        <Stack flexDirection="row" justifyContent="space-between">
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={saveImageToDisk}
          >
            Set as wallpaper
          </Button>
          <LoadingButton
            onClick={nextImage}
            color="primary"
            variant="outlined"
            size="large"
            loading={loading}
            endIcon={<NavigateNext />}
          >
            Next image
          </LoadingButton>
        </Stack>
      </ImageOverlay>
    </MainContainer>
  );
}
