const debugging = true;

/**
 * calculate total porosity
 * @param {number} epsilonE interstitual porosity
 * @param {number} epsilonI internal porosity
 * @returns total porosity
 */
export function calcEpsilonTotal(epsilonE, epsilonI) {
  const epsilonT = epsilonE + epsilonI * (1 - epsilonE);
  if(debugging) console.debug(`epsilonT: ${epsilonT}`);
  return epsilonT;
}

export function calcVoidVolume(innerDiameter_mm, length_mm, epsilonT) {
  const innerDiameter_cm = innerDiameter_mm / 10;
  const length_cm = length_mm / 10;
  const voidVolume = Math.PI*Math.pow((innerDiameter_cm/2),2)*length_cm*epsilonT;
  if(debugging) console.debug(`voidVolume: ${voidVolume} mL`);
  return voidVolume;
}

export function calcVoidTime(voidVolume_mL, flowRate_mL_min) {
  const voidTime_min = voidVolume_mL / flowRate_mL_min;
  const voidTime_sec = voidTime_min * 60;
  if(debugging) console.debug(`voidTime: ${voidTime_sec} s`);
  return voidTime_sec;
}

export function calcCrossSectionalArea(innerDiameter_mm) {
  const innerDiameter_cm = innerDiameter_mm / 10;
  const crossSectionalArea = Math.PI * Math.pow(innerDiameter_cm, 2);
  if(debugging) console.debug(`crossSectionalArea: ${crossSectionalArea} cm^2`);
  return crossSectionalArea;
}

export function calcFlowVelocityOpenTube(flowRate_mL_min, columnCrossArea_cm2) {
  const flowRate_mL_sec = flowRate_mL_min / 60;
  const flowVelocity_openTube = flowRate_mL_sec / columnCrossArea_cm2;
  if(debugging) console.debug(`flowVelocity_openTube: ${flowVelocity_openTube} cm/s`);
  return flowVelocity_openTube;
}

export function calcFlowVelocityIntersitial(flowVelocity_openTube, epsilonE) {
  const flowVelocity_intersitial = flowVelocity_openTube / epsilonE;
  if(debugging) console.debug(`flowVelocity_intersitial: ${flowVelocity_intersitial} cm/s`);
  return flowVelocity_intersitial;
}

export function calcFlowVelocityChromatographic(flowVelocity_openTube, epsilonT) {
  const flowVelocity_chromatographic = flowVelocity_openTube / epsilonT;
  if(debugging) console.debug(`flowVelocity_chromatographic: ${flowVelocity_chromatographic} cm/s`);
  return flowVelocity_chromatographic;
}

export function calcFlowVelocityReduced(flowVelocity_intersitial, particleSize_um, diffusionCoefficient) {
  const particleSize_cm = particleSize_um / 10000;
  const flowVelocity_reduced = (flowVelocity_intersitial*particleSize_cm)/diffusionCoefficient;
  if(debugging) console.debug(`flowVelocity_reduced: ${flowVelocity_reduced}`);
  return flowVelocity_reduced;
}