import axios from "axios";

const baseUrl = "https://source.unsplash.com/1920x1080/?moon";

export async function fetchImageUrl(config = {}) {
  const response = await axios.get(baseUrl, {
    responseType: "blob",
    ...config,
  });
  console.log(
    "📜 LOG > fetchImageUrl > response",
    response.request.responseURL
  );
  return URL.createObjectURL(response.data);
}
