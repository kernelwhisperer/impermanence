import { Nullable } from "unsplash-js/dist/helpers/typescript";
import { Random } from "unsplash-js/dist/methods/photos/types";

import { blobToBase64 } from "./utils";

const ACCESS_KEY = "kgy2dYcQjx4oeo5STQD8zKIYiozmj8ZqHFOi5Pi2pDs";
// https://unsplash.com/documentation#get-a-random-photo
// const RANDOM_IMAGE_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&orientation=landscape`; // &query=person

type RandomApiResponse = Random & {
  tags_preview: Array<{
    title: string;
    type: string;
  }>;
  views: number;
};

export interface ImageResult {
  altDescription: Nullable<string>;
  asBase64: string;
  authorName: string;
  color: Nullable<string>;
  createdAt: string;
  description: Nullable<string>;
  downloadUrl: string;
  height: number;
  location: {
    city: Nullable<string>;
    country: Nullable<string>;
    name: Nullable<string>;
  };
  siteUrl: string;
  tagsPreview: {
    title: string;
    type: string;
  }[];
  views: number;
  width: number;
}

export async function fetchRandomImage(
  disallowedKeywords: string[],
  includedKeywords: string[],
): Promise<ImageResult> {
  const RANDOM_IMAGE_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&orientation=landscape&query=${includedKeywords}`; // &query=person
  const response = await fetch(RANDOM_IMAGE_URL);
  const body: RandomApiResponse = await response.json();
  //
  const downloadUrl = body.urls.full;
  const siteUrl = body.links.html;
  const { name: authorName } = body.user;
  const {
    width,
    height,
    color,
    created_at: createdAt,
    description,
    alt_description: altDescription,
    views,
    location,
    tags_preview: tagsPreview,
  } = body;
  // Avoid watermarked images from Unsplash Plus
  if (downloadUrl.includes("plus.")) {
    // console.log("📜 LOG > fetchRandomImage > skipping");
    return fetchRandomImage(disallowedKeywords, includedKeywords);
  }
  // Avoid images with disallowed keywords
  if (
    disallowedKeywords.some((keyword) => description?.includes(keyword)) ||
    disallowedKeywords.some((keyword) => altDescription?.includes(keyword)) ||
    disallowedKeywords.some((keyword) =>
      tagsPreview.some((tag) => tag.title.includes(keyword)),
    )
  ) {
    // console.log("📜 LOG > fetchRandomImage > skipping");
    return fetchRandomImage(disallowedKeywords, includedKeywords);
  }

  //
  const imgRes = await fetch(downloadUrl);
  const blob = await imgRes.blob();
  const asBase64 = await blobToBase64(blob);
  //
  return {
    altDescription,
    asBase64,
    authorName,
    color,
    createdAt,
    description,
    downloadUrl,
    height,
    location,
    siteUrl,
    tagsPreview,
    views,
    width,
  };
}
