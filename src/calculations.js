/**
 * calculate total porosity
 * @param {number} epsilonE interstitual porosity
 * @param {number} epsilonI internal porosity
 * @returns total porosity
 */
export function calcEpsilonTotal(epsilonE, epsilonI) {
  return epsilonE + epsilonI * (1 - epsilonE);
}