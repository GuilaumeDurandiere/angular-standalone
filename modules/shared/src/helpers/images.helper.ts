

export function getImagefromBase64(base64: string): string | undefined {
  let extension = undefined;
  const decodedString = window.atob(base64); //decode the string;
  const lowerCase = decodedString.toLowerCase();
  // find the extension in the decoded string
  if (lowerCase.indexOf("png") !== -1) extension = "png"
  else if (lowerCase.indexOf("svg") !== -1) extension = "svg+xml"
  else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
    extension = "jpg"
  // add more cases if needed..
  return `data:image/${extension};base64,${base64}`;
}