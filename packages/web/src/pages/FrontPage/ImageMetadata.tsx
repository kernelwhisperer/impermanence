import styled from "@emotion/styled";
import {
  AccessTimeOutlined,
  AspectRatioOutlined,
  DescriptionOutlined,
  LaunchOutlined,
  LocationOnOutlined,
  TagOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { useCallback, useState } from "react";

import { ImageResult } from "../../unsplash-api";

const Numeric = (props: TypographyProps) => (
  <Typography
    variant="inherit"
    fontFamily="Roboto mono"
    component="span"
    {...props}
  />
);

const Row = (props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={1} {...props} />
);

const Truncate = styled.span`
  max-width: 80vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ImageMetadataProps {
  imageResult: ImageResult;
  loading: boolean;
}

export function ImageMetadata({ loading, imageResult }: ImageMetadataProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(
    () => setExpanded((x) => !x),
    [setExpanded],
  );

  if (loading) {
    return (
      <Stack gap={1.5}>
        <Skeleton variant="rounded" height={56} width={240}></Skeleton>
        <Skeleton variant="rounded" height={32} width={400}></Skeleton>
        <Skeleton variant="rounded" height={32}></Skeleton>
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h3" fontWeight="400" fontFamily="Roboto serif">
        {imageResult.authorName}
      </Typography>
      {imageResult.description && (
        <Typography variant="h5" fontWeight="300" color="secondary">
          {imageResult.description}
        </Typography>
      )}
      <Button
        sx={{
          background: "transparent",
          justifyContent: "flex-start",
          marginLeft: -0.5,
          padding: 0.5,
          width: "100%",
        }}
        onClick={toggleExpanded}
      >
        <Typography
          variant="body1"
          fontWeight="300"
          color="secondary"
          component="div"
        >
          <Stack
            direction={expanded ? "column" : "row"}
            alignItems={expanded ? "flex-start" : "center"}
            flexWrap="wrap"
            sx={{
              "& > div": {
                marginRight: 3,
              },
            }}
          >
            <Row>
              <AccessTimeOutlined fontSize="small" />{" "}
              {new Date(imageResult.createdAt).toLocaleDateString([], {
                dateStyle: "long",
              })}
            </Row>
            <Row>
              <VisibilityOutlined fontSize="small" />{" "}
              <Numeric>
                {new Intl.NumberFormat([], {
                  maximumFractionDigits: 2,
                  notation: "compact",
                }).format(imageResult.views)}
              </Numeric>
            </Row>
            <Row>
              <AspectRatioOutlined fontSize="small" />{" "}
              <Numeric>
                {imageResult.width}x{imageResult.height}
              </Numeric>
            </Row>
            {imageResult.location.name && (
              <Row>
                <LocationOnOutlined fontSize="small" />
                <Truncate>{imageResult.location.name}</Truncate>
              </Row>
            )}
          </Stack>
          {expanded && (
            <>
              {imageResult.altDescription && (
                <Row>
                  <DescriptionOutlined fontSize="small" />{" "}
                  <Truncate>{imageResult.altDescription}</Truncate>
                </Row>
              )}
              <Row>
                {imageResult.tagsPreview.length > 0 && (
                  <>
                    <TagOutlined fontSize="small" />{" "}
                    <Truncate>
                      {imageResult.tagsPreview.map((x) => x.title).join(", ")}
                    </Truncate>
                  </>
                )}
              </Row>
              <Row>
                <LaunchOutlined fontSize="small" />{" "}
                <Link
                  href={imageResult.siteUrl}
                  target="_blank"
                  color="secondary"
                  sx={{
                    maxWidth: "80vw",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Truncate>
                    {imageResult.siteUrl.replace("https://", "")}
                  </Truncate>
                </Link>
              </Row>
            </>
          )}
        </Typography>
      </Button>
    </Box>
  );
}
