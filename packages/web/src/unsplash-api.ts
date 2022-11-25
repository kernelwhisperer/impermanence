import { wait } from "./utils";

const RANDOM_IMAGE_URL = "https://source.unsplash.com/1920x1080/?space";

let lastImageUrl = "";

export async function fetchRandomImage(): Promise<Blob> {
  const response = await fetch(RANDOM_IMAGE_URL);
  const blob = await response.blob();

  const uniqueImageUrl = response.url.split("?")[0];

  if (lastImageUrl === uniqueImageUrl) {
    await wait(750); // prevent spam
    return fetchRandomImage();
  } else {
    lastImageUrl = uniqueImageUrl;
    return blob;
  }
}
