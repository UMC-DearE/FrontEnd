export function getHarmoniousTextColor(bgHex: string): string {
  let r = 0, g = 0, b = 0;

  if (bgHex.length === 4) {
    r = parseInt(bgHex[1] + bgHex[1], 16);
    g = parseInt(bgHex[2] + bgHex[2], 16);
    b = parseInt(bgHex[3] + bgHex[3], 16);
  } else {
    r = parseInt(bgHex.slice(1, 3), 16);
    g = parseInt(bgHex.slice(3, 5), 16);
    b = parseInt(bgHex.slice(5, 7), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = (cmax + cmin) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (cmax) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const lightnessPct = l * 100;
  const saturationPct = s * 100;

  // 어두운 배경 - 흰색
  if (lightnessPct <= 55) {
    return "#FFFFFF";
  }

  // 밝은 배경 - 톤온톤
  const textSaturation = Math.max(saturationPct, 60);
  const textLightness = 32;

  return `hsl(${h}, ${textSaturation}%, ${textLightness}%)`;
}
