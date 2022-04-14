/**
 * @memberof module:Utilities
 * @static
 * Convert a color in HSL to RGB
 * @param {angle_degrees} hue Hue - (0,360]
 * @param {percentage} saturation Saturation - (0,100]
 * @param {percentage} lightness Lightness - (0,100]
 * @return {object} RGB
 */
export const HSL2RGB = (hue, saturation, lightness) => {
  const H = hue % 360;
  const S = saturation / 100;
  const L = lightness / 100;

  const C = (1 - Math.abs((2*L)-1)) * S;
  const X = C * (1 - Math.abs((H / 60) % 2-1));
  const m = L - (C / 2);

  let r = 0; let g = 0; let b = 0;
  if(0 <= H && H < 60) { r = C; g = X; b = 0; }
  else if(60 <= H && H < 120){ r = X; g = C; b = 0; }
  else if(120 <= H && H < 180){ r = 0; g = C; b = X; }
  else if(180 <= H && H < 240){ r = 0; g = X; b = C; }
  else if(240 <= H && H < 300){ r = X; g = 0; b = C; }
  else if(300 <= H && H < 360){ r = C; g = 0; b = X; }

  const RGB = {
    "R": Math.round((r + m) * 255),
    "G": Math.round((g + m) * 255),
    "B": Math.round((b + m) * 255),
  }

  return RGB;
};