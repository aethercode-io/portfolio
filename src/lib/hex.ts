export function hexToRgba(hex: string, opacity_int: number): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${opacity_int / 100})`
}

function generateHex(hexInput: string): string {
  return hexInput.replace('#', '').toUpperCase()
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = generateHex(hex)

  // Validate hex format (3 or 6 characters)
  if (!/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(cleanHex)) {
    throw new Error('Invalid hex color format')
  }

  // Handle 3-character hex (e.g., #FFF -> #FFFFFF)
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex

  // Convert to RGB
  const r = parseInt(fullHex.substring(0, 2), 16)
  const g = parseInt(fullHex.substring(2, 4), 16)
  const b = parseInt(fullHex.substring(4, 6), 16)

  return { r, g, b }
}
