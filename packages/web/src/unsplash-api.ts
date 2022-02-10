import axios from "axios";
import { wait } from "./utils";

const baseUrl = "https://source.unsplash.com/1920x1080/?space";

export async function fetchImageUrl(config = {}) {
  return axios.get(baseUrl, {
    responseType: "blob",
    ...config,
  });
}

let lastImageUrl = "";

export async function fetchNewImageUrl(config = {}) {
  const response = await fetchImageUrl(config);
  console.log("📜 LOG > fetchNewImageUrl > response", response);
  const uniqueImageUrl = response.request.responseURL.split("?")[0];

  if (lastImageUrl === uniqueImageUrl) {
    await wait(750); // prevent spam
    return fetchNewImageUrl(config);
  } else {
    lastImageUrl = uniqueImageUrl;
    return response;
  }
}
