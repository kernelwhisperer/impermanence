export async function wait(interval: number) {
  return new Promise((resolve) => setTimeout(resolve, interval));
}
