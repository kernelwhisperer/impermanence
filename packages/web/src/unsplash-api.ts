import { wait } from "./utils";

const RANDOM_IMAGE_URL = "https://api.unsplash.com/photos/random?client_id=kgy2dYcQjx4oeo5STQD8zKIYiozmj8ZqHFOi5Pi2pDs"; // ?space

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader();
      reader.onload = function () { onSuccess(this.result as string) };
      reader.readAsDataURL(blob);
    } catch (err) {
      onError(err);
    }
  });
};

export async function fetchRandomImage(): Promise<string> {
  const response = await fetch(RANDOM_IMAGE_URL);
  const body = await response.json();
  console.log("📜 LOG > fetchRandomImage > body.urls.regular:", body.urls.regular);
  const imgUrl = body.urls.full;
  // const imgUrl = 'https://images.unsplash.com/photo-1682266113207-19ca6b4a9008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0NDQwMzZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODMxNDg3MjU&ixlib=rb-4.0.3&q=80&w=400'
  const imgRes = await fetch(imgUrl);
  const blob = await imgRes.blob();
  return blobToBase64(blob)
}
