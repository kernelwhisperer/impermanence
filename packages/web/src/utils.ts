import { DEFAULT_INTERVAL_MIN } from "./pages/SettingsPage/default-settings";

export async function wait(interval: number) {
  return new Promise((resolve) => setTimeout(resolve, interval));
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(this.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * @param interval - in minutes; defaults to 15min
 * @returns msUntilNextInterval
 */
export function msUntilNextInterval(interval = DEFAULT_INTERVAL_MIN) {
  const now = new Date();

  const delta = interval - (now.getMinutes() % interval);
  let nextMinutes = now.getMinutes() + delta;
  const minuteOverflow = nextMinutes >= 60;
  const nextHours = minuteOverflow ? now.getHours() + 1 : now.getHours();
  nextMinutes = minuteOverflow ? 0 : nextMinutes;

  const nextInterval = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    nextHours,
    nextMinutes,
    0,
    0,
  );

  // console.log("📜 LOG > msUntilNextInterval > now:", now);
  console.log("📜 LOG > msUntilNextInterval > nextInterval:", nextInterval);
  return nextInterval.getTime() - now.getTime();
}
