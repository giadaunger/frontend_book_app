export function setLongCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function setCookie(name, value, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split('; ');

    for (let i = 0; i < cookiesArray.length; i++) {
        const cookie = cookiesArray[i].split('=');
        if (cookie[0] === name) {
            try {
                // Parse the cookie value as JSON and return the parsed object
                return JSON.parse(cookie[1]);
            } catch (error) {
                // If parsing fails, return the raw string value
                return cookie[1];
            }
        }
    }

    return null;
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
