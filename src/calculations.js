/**
 * calculate total porosity
 * @param {number} epsilonE interstitual porosity
 * @param {number} epsilonI internal porosity
 * @returns total porosity
 */
export function calcEpsilonTotal(epsilonE, epsilonI) {
  const epsilonT = epsilonE + epsilonI * (1 - epsilonE);
  console.debug(`epsilonT: ${epsilonT}`);
  return epsilonT;
}

export function calcVoidVolume(innerDiameter_mm, length_mm, epsilonT) {
  const innerDiameter_cm = innerDiameter_mm / 10;
  const length_cm = length_mm / 10;
  const voidVolume = Math.PI*Math.pow((innerDiameter_cm/2),2)*length_cm*epsilonT;
  console.debug(`voidVolume: ${voidVolume}`);
  return voidVolume;
}

export function calcVoidTime(voidVolume_mL, flowRate_mL_min) {
  const voidTime_min = voidVolume_mL / flowRate_mL_min;
  const voidTime_sec = voidTime_min * 60;
  console.debug(`voidTime: ${voidTime_sec}`);
  return voidTime_sec;
}