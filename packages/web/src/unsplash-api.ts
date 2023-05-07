import { blobToBase64, wait } from "./utils";

const ACCESS_KEY = "kgy2dYcQjx4oeo5STQD8zKIYiozmj8ZqHFOi5Pi2pDs"
const RANDOM_IMAGE_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`; // ?space

export async function fetchRandomImage(): Promise<string> {
  const response = await fetch(RANDOM_IMAGE_URL);
  const body = await response.json();
  console.log("📜 LOG > fetchRandomImage > body.urls.regular:", body.urls.regular);
  const imgUrl = body.urls.full as string;
  // await wait(1500)
  // const imgUrl = 'https://images.unsplash.com/photo-1637270868031-b28f517e152e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'

  // Avoid watermarked images from Unsplash Plus 
  if (imgUrl.includes('plus.')) {
    console.log("📜 LOG > fetchRandomImage > skipping");
    // await wait(750); // prevent spam
    return fetchRandomImage();
  } else {
    const imgRes = await fetch(imgUrl);
    const blob = await imgRes.blob();
    return blobToBase64(blob)
  }
}
