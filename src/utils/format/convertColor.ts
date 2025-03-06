export function hexToRgb(
  hex: string,
  opacity?: number,
  hasText?: boolean
): { r: number; g: number; b: number } | string | null {
  const validHex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/
  if (!validHex.test(hex)) return null

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return hasText ? (opacity ? `rgb(${r}, ${g}, ${b}, ${opacity})` : `rgb(${r}, ${g}, ${b})`) : { r, g, b }
}
