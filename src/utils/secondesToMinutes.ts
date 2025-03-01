export function secondesToMinutes(secondes: number, isLongText: boolean = false): string {
  if (!secondes || 0 == secondes) return '00:00'
  const minutes = Math.floor(secondes / 60)
  const secondesRestantes = secondes % 60

  return `${minutes < 10 ? '0' : ''}${minutes}${isLongText ? "'" : ':'}${
    secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes
  }${isLongText ? '"' : ''}`
}
