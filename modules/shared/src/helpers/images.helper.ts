export function getImagefromBase64(base64: string): string | undefined {
  let extension = undefined;
  const decodedString = window.atob(base64); //decode the string;
  const lowerCase = decodedString.toLowerCase();
  // find the extension in the decoded string
  if (lowerCase.indexOf("png") !== -1) extension = "png"
  else if (lowerCase.indexOf("svg") !== -1) extension = "svg+xml"
  else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
    extension = "jpg"
  else if (lowerCase.indexOf("webp") !== -1) extension = "webp"
  // add more cases if needed..
  return `data:image/${extension};base64,${base64}`;
}

export function compressImage(src: string | ArrayBuffer, newX: number, newY: number) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src as string;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d');
      ctx?.drawImage(img, 0, 0, newX, newY);
      const data = ctx?.canvas.toDataURL('image/webp', 0.9);
      res(data);
    }
    img.onerror = error => rej(error);
  })
}