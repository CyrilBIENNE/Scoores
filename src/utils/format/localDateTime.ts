export function localDateTime(utc: boolean = false) {
  const date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString()
  return utc ? date : date.slice(0, 19).replace('T', ' ')
}
