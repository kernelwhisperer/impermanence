export async function wait(interval: number) {
  return new Promise((resolve) => setTimeout(resolve, interval));
}

export async function blobToBase64(blob: Blob): Promise<string> {
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
