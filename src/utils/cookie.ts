export function getCookie(name: string): string {
  return document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*=\\s*([^;]*).*$)|^.*$`),
    '$1'
  )
}

export function setCookie(name: string, value: string, expires: Date): void {
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
