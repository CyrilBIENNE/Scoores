export function cleanInputValue(value: any) {
  if ('true' === value) return true
  if ('false' === value) return false
  if ('null' === value) return null

  return value
}

const cleanValue = cleanInputValue

export function getValueText({ component, choices }: any, val: any) {
  if (!component) return undefined
  if (component == 'funnel_blok_select') return typeof val == 'string' ? val : val ? val.label : ''
  if (component == 'funnel_blok_input' || component == 'funnel_blok_operator') return val
  if (component == 'funnel_blok_choice') return choices.find(({ value }: any) => val === cleanValue(value))?.text
  return undefined
}
