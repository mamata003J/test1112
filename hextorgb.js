function hexToRgb(hex) {
  let cleanHex = hex.replace(/^#/, '');

  // Handle 3-digit shorthand hex (#abc -> #aabbcc)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  if (cleanHex.length !== 6) {
    throw new Error('Invalid hex color format');
  }

  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) {
    throw new Error('Invalid hex characters');
  }

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return { r, g, b };
}

module.exports = hexToRgb;