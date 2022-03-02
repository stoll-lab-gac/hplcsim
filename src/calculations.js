/**
 * calculate total porosity
 * @param {number} epsilonE interstitual porosity
 * @param {number} epsilonI internal porosity
 * @returns total porosity
 */
export function calcEpsilonTotal(epsilonE, epsilonI) {
  return epsilonE + epsilonI * (1 - epsilonE);
}

export function calcVoidVolume(innerDiameter, length, epsilonT) {
  return Math.PI*Math.pow((innerDiameter/2),2)*length*epsilonT;
}