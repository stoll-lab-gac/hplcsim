/**
 * @memberof module:Utilities
 * @static
 * Convert a color in RGB to HEX
 * @param {number} R Red
 * @param {number} G Green
 * @param {number} B Blue
 * @return {string} HEX
 */
export const RGB2HEX = (R, G, B) => {
  let R_string = R.toString(16).toUpperCase();
  let G_string = G.toString(16).toUpperCase();
  let B_string = B.toString(16).toUpperCase();

  if(R_string.length === 1) { R_string = "0" + R_string; }
  if(G_string.length === 1) { G_string = "0" + G_string; }
  if(B_string.length === 1) { B_string = "0" + B_string; }

  const HEX = "#" + R_string + G_string + B_string;

  return HEX;
};