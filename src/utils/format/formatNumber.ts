export function formatNumber(number: any, decimal: number = 2) {
  if (number === 0) return '0'
  if (!number) return '-'

  number = Number(number)
  if (!Number.isInteger(number)) decimal = 0

  return simplifyDecimal(number.toLocaleString('fr-FR', { minimumFractionDigits: decimal }))
}

export function formatNumberMax(number: any, decimal: number = 2) {
  if (!number) return '-'
  number = Number(number)
  if (Number.isInteger(number)) decimal = 0

  return number.toLocaleString('fr-FR', { maximumFractionDigits: decimal })
}

function simplifyDecimal(value: any) {
  const array = value.split(',')

  if (array[1] && 0 == Number(array[1])) {
    return array[0]
  }

  return value
}
