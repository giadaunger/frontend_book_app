export function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split("; ");

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }

  return null;
}
