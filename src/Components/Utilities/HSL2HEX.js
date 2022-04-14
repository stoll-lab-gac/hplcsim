import { HSL2RGB } from './HSL2RGB';
import { RGB2HEX } from './RGB2HEX';

/**
 * @memberof module:Utilities
 * @static
 * Convert a color in HSL to HEX
 * @param {angle_degrees} hue Hue - (0,360]
 * @param {percentage} saturation Saturation - (0,100]
 * @param {percentage} lightness Lightness - (0,100]
 * @return {string} Color in HEX (ex. "#F2F2F2")
 */
export const HSL2HEX = (hue, saturation, lightness) => {
  const RGB = HSL2RGB(hue, saturation, lightness);
  const HEX = RGB2HEX(RGB.R, RGB.G, RGB.B);
  return HEX;
};