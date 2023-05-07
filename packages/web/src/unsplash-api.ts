import { Random } from "unsplash-js/dist/methods/photos/types";

import { blobToBase64 } from "./utils";

const ACCESS_KEY = "kgy2dYcQjx4oeo5STQD8zKIYiozmj8ZqHFOi5Pi2pDs";
const RANDOM_IMAGE_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`; // ?space

type RandomApiResponse = Random & {
  tags_preview: Array<{
    title: string;
    type: string;
  }>;
  views: number;
};

export async function fetchRandomImage() {
  const response = await fetch(RANDOM_IMAGE_URL);
  const body: RandomApiResponse = await response.json();
  //
  const downloadUrl = body.urls.full;
  // fix type
  // Avoid watermarked images from Unsplash Plus
  // if (!downloadUrl.includes('plus.')) {
  //   console.log("📜 LOG > fetchRandomImage > skipping");
  //   // await wait(750); // prevent spam
  //   return fetchRandomImage();
  // }

  const imgRes = await fetch(downloadUrl);
  const blob = await imgRes.blob();
  const asBase64 = await blobToBase64(blob);
  //
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
  //
  return {
    altDescription,
    asBase64,
    authorName,
    color,
    createdAt,
    description,
    height,
    location,
    siteUrl,
    tagsPreview,
    views,
    width,
  };
}
