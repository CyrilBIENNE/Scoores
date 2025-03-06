export default async function fetchApi(url: string, options: any = {}, body?: any, noLog?: boolean) {
  try {
    const headers = options?.headers ?? {}
    const method = options?.method ?? 'GET'
    const params: any = { ...options, headers, method }
    if (body) params.body = JSON.stringify(body)

    return await (await fetch(url, params)).json()
  } catch (e) {
    if (!noLog) console.error('ERROR URL: ' + url, e)
    return undefined
  }
}
