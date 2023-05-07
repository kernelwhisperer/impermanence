import styled from "@emotion/styled";
import { NavigateNext } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

import { sendImageToElectron } from "../api/electron-api";
import { fetchRandomImage, ImageResult } from "../unsplash-api";
import { DEFAULT_IMG } from "./default-image";

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

const MetadataContainer = styled(Stack)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: ${(props) => props.theme.spacing(1)};
  padding-top: ${(props) => props.theme.spacing(10)};
  background: linear-gradient(
    360deg,
    ${(props) => alpha(props.theme.palette.background.default, 1)} 0%,
    ${(props) => alpha(props.theme.palette.background.default, 0.8)} 50%,
    transparent 100%
  );
`;

export function FrontPage() {
  const [imageResult, setImageResult] = useState<ImageResult>({
    asBase64: DEFAULT_IMG,
  });
  console.log("📜 LOG > FrontPage > imageResult:", imageResult);

  const [loading, setLoading] = useState(false);

  const nextImage = useCallback(async () => {
    setLoading(true);

    const img = await fetchRandomImage();
    setImageResult(img);

    setLoading(false);
  }, [setLoading, setImageResult]);

  const saveImageToDisk = useCallback(async () => {
    if (!imageResult) return;
    sendImageToElectron("Unknown image", imageResult.asBase64);
  }, [imageResult]);

  return (
    <MainContainer>
      {loading ? (
        <ImagePlaceholder animation="wave" variant="rectangular" />
      ) : (
        <Image style={{ backgroundImage: `url(${imageResult.asBase64})` }} />
      )}
      <MetadataContainer gap={1}>
        <Typography variant="h2" fontWeight={"400"} fontFamily={"Roboto serif"}>
          {imageResult.authorName}
        </Typography>
        {imageResult.description && (
          <Typography variant="h5" fontWeight="300" color={"secondary"}>
            {imageResult.description}
          </Typography>
        )}

        {imageResult.altDescription && (
          <Typography
            variant="body1"
            fontWeight="300"
            color={"secondary"}
            //  fontFamily={"Roboto mono"}
          >
            Alt description — {imageResult.altDescription}
            <br />
            Published on —{" "}
            {new Date(imageResult.createdAt).toLocaleDateString([], {
              dateStyle: "long",
            })}
            <br />
            Views —{" "}
            <Typography
              fontWeight="300"
              fontFamily={"Roboto mono"}
              sx={{ display: "inline-block" }}
            >
              {new Intl.NumberFormat([], {
                maximumFractionDigits: 0,
                notation: "compact",
              }).format(imageResult.views)}
            </Typography>
            <br />
            Resolution —{" "}
            <Typography
              fontWeight="300"
              fontFamily={"Roboto mono"}
              sx={{ display: "inline-block" }}
            >
              {imageResult.width}x{imageResult.height}
            </Typography>
            <br />
            Url —{" "}
            <Link
              href={imageResult.siteUrl}
              rel="noopener noreferrer"
              target="_blank"
              color="secondary"
            >
              {imageResult.siteUrl.replace("https://", "")}
            </Link>
            <br />
            {imageResult.tagsPreview.length > 0 && (
              <>
                Tags — {imageResult.tagsPreview.map((x) => x.title).join(", ")}.
              </>
            )}
          </Typography>
        )}
        <Stack flexDirection="row" justifyContent="space-between">
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={saveImageToDisk}
          >
            Set as wallpaper
          </Button>
          <Button
            onClick={nextImage}
            color="primary"
            variant="outlined"
            size="large"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={16} /> : <NavigateNext />
            }
          >
            Next
          </Button>
        </Stack>
      </MetadataContainer>
    </MainContainer>
  );
}
