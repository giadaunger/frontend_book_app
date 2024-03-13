export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
  

export function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split('; ');

    for (let i = 0; i < cookiesArray.length; i++) {
        const cookie = cookiesArray[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }

    return null;
}

