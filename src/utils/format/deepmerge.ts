export function deepmerge(target: any, source: any) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = deepmerge(target[key] || {}, source[key]) // Fusionner récursivement les objets
    } else {
      target[key] = source[key]
    }
  }
  return target
}
