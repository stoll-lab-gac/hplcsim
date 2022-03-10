const debugging = true;

/**
 * Calculate the fraction of the volume in the column that is occupied by eluent, both outside and inside the stationary phase particles.
 * @summary Calculate Total Porosity (Eq. 3)
 * @param {number} epsilonE Interparticle (External) Porosity
 * @param {number} epsilonI Intraparticle (Internal) Porosity
 * @returns {number} Total Porosity
 * @author Thomas J. Lauer
 * @since 09 March 2022
 */
export function calcEpsilonTotal(epsilonE, epsilonI) {
  const epsilonT = epsilonE + epsilonI * (1 - epsilonE);
  if(debugging) console.debug(`epsilonT: ${epsilonT}`);
  return epsilonT;
}

/**
 * Calculate the volume in the column that is accessible to the mobile phase (the space between the particles and within them).
 * @summary Calculate Void Volume (Eq. 4)
 * @param {number} innerDiameter Column Inner-Diameter [mm]
 * @param {number} length Column Length [mm]
 * @param {number} epsilonT Total Porosity
 * @returns {number} Void Volume [mL]
 * @see {@link calcEpsilonTotal calcEpsilonTotal(epsilonE, epsilonI)}
 * @author Thomas J. Lauer
 * @since 09 March 2022
 */
export function calcVoidVolume(innerDiameter, length, epsilonT) {
  const innerDiameter_cm = innerDiameter / 10;
  const length_cm = length / 10;
  const voidVolume = Math.PI*Math.pow((innerDiameter_cm/2),2)*length_cm*epsilonT;
  if(debugging) console.debug(`voidVolume: ${voidVolume} mL`);
  return voidVolume;
}

/**
 * Calculate the time required for an entirely unretained solute to pass through the column.
 * @summary Calculate Void Time (Eq. 5)
 * @param {number} voidVolume Void Volume [mL]
 * @param {number} flowRate Flow Rate [mL/min]
 * @returns {number} Void Time [s]
 * @see {@link calcVoidVolume calcVoidVolume(innerDiameter, length, epsilonT)}
 * @author Thomas J. Lauer
 * @since 09 March 2022
 */
export function calcVoidTime(voidVolume, flowRate) {
  const voidTime_min = voidVolume / flowRate;
  const voidTime_sec = voidTime_min * 60;
  if(debugging) console.debug(`voidTime: ${voidTime_sec} s`);
  return voidTime_sec;
}

export function calcCrossSectionalArea(innerDiameter_mm) {
  const innerDiameter_cm = innerDiameter_mm / 10;
  // Is there supposed to be a "Divided by 4" in the next line? I don't think so, but it matched HPLC Sim v4.0.0 - TL
  const crossSectionalArea = (Math.PI * Math.pow(innerDiameter_cm, 2))/4;
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