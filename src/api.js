const baseUrl = "https://source.unsplash.com/1920x1080/?moon";

export const fetchImageUrl = async () => {
  const response = await fetch(baseUrl);
  console.log("📜 LOG > fetchImageUrl > response", response.url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
