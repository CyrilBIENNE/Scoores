export type CustomValues = {
  [key: string]: any
}

export function dynamicData(stringJS: string, customValues: CustomValues = {}): any {
  if (!stringJS) return null

  try {
    if (typeof stringJS == 'object') return stringJS
    const F = new Function(...Object.keys(customValues), 'return ' + stringJS)
    return F(...Object.values(customValues))
  } catch (error) {
    console.error({ error, msg: `Erreur DynamicData: ${stringJS}`, customValues })
  }
  return null
}

export function dynamicCondition(condition?: string, customValues?: CustomValues): boolean {
  if (!condition) return true
  return dynamicData(condition, customValues) == true
}
