import { Link, Typography } from "@mui/material";
import React from "react";

import { ImageResult } from "../../unsplash-api";

export function ImageMetadata({ imageResult }: { imageResult: ImageResult }) {
  return (
    <>
      <Typography variant="h3" fontWeight={"400"} fontFamily={"Roboto serif"}>
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
          component={"div"}
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
            <>Tags — {imageResult.tagsPreview.map((x) => x.title).join(", ")}</>
          )}
        </Typography>
      )}
    </>
  );
}
