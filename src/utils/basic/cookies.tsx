export function setCookie(name: string, value: string, durationDay: number = 365, durationMinutes: number = 0) {
  if (typeof window !== 'undefined') {
    let expires = ''
    if (durationDay && durationDay > -1) {
      const date = new Date()
      date.setTime(date.getTime() + durationDay * 24 * 60 * 60 * 1000 + durationMinutes * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }

    document.cookie = `${name}=${value};path=/;expires='` + expires
  }
}

export function readCookie(cookie_name: any) {
  let result = undefined
  if (typeof window !== 'undefined') {
    document.cookie.split('; ').forEach(function (e) {
      if (cookie_name === e.split('=')[0]) {
        result = e.split('=')[1]
      }
    })
  }

  return result
}
