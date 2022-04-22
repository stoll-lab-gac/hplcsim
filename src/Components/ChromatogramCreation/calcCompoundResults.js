import { HSL2HEX } from '../Utilities/HSL2HEX';
import { round_to_xStep } from '../Utilities/round_to_xStep';

const chromaCore = require('@stoll-lab-gac/chroma-core');

export const calcCompoundResults = (compoundIndx, state) => {
  const compoundName = state.compoundList[compoundIndx];

  let compoundResults = {};
  const compoundParams = state.compoundParameters[state.selectedColumn][state.solventB][compoundName];
  compoundResults.M = compoundParams.M;
  //console.debug(compoundParams);

  compoundResults.solventSensitivityFactor = chromaCore.LSS.calcSolventSensitivityFactor(compoundParams.S_intercept, compoundParams.S_slope, state.temperature);
  compoundResults.lnRetentionFactorWater = chromaCore.LSS.calcLnRetentionFactorWater(compoundParams.lnkw_intercept, compoundParams.lnkw_slope, state.temperature);

  if (state.useGradient && (state.phi0 !== state.phiFinal)) {
    if (compoundName === "uracil") {
      compoundResults.retentionTime = state.voidTime;
      compoundResults.retentionFactor = 0;
    } else {
      compoundResults.retentionTime = chromaCore.LSS.calcGradientRetentionTime(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.flowRate, state.phi0, state.phiFinal, state.voidVolume, state.voidTime, state.gradientTime, state.delayTime);
      compoundResults.retentionFactor = chromaCore.LSS.calcGradientRetentionFactorEffective(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.phi0, state.phiFinal, state.voidTime, state.gradientTime * 60, compoundResults.retentionTime, state.delayTime);
    }
    compoundResults.peakWidth = chromaCore.LSS.calcGradientPeakWidth(compoundResults.retentionFactor, state.theoreticalPlateNumber, state.voidTime / 60, state.detectorTimeConstant);
    const gradientSlope = (state.phiFinal - state.phi0) / (state.gradientTime * 60);
    if (compoundResults.retentionTime - state.delayTime - state.voidTime < state.gradientTime * 60) {
      compoundResults.phiEffective = gradientSlope * (compoundResults.retentionTime - state.delayTime - state.voidTime) + state.phi0;
    } else {
      compoundResults.phiEffective = state.phi0;
    }
  } else {
    if (compoundName === "uracil") {
      compoundResults.retentionTime = state.voidTime;
      compoundResults.retentionFactor = 0;
    } else {
      compoundResults.retentionFactor = chromaCore.LSS.calcIsocraticRetentionFactor(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.phi0);
      compoundResults.retentionTime = chromaCore.LSS.calcIsocraticRetentionTime(compoundResults.retentionFactor, state.voidTime);
    }
    compoundResults.peakWidth = chromaCore.LSS.calcIsocraticPeakWidth(compoundResults.retentionTime, state.theoreticalPlateNumber, state.flowRate, state.injectionVolume, state.detectorTimeConstant);
    compoundResults.phiEffective = state.phi0;
  }

  compoundResults.height = chromaCore.general.calcChromatogram(compoundResults.retentionTime, compoundParams.M * (state.injectionVolume / 100), compoundResults.peakWidth, state.flowRate, compoundResults.retentionTime);
  //if(compoundResults.height > heightMax) { heightMax = compoundResults.height; }

  compoundResults.timeMin = round_to_xStep(compoundResults.retentionTime - (state.numPeakWidths * compoundResults.peakWidth), state.xStep);
  compoundResults.timeMax = round_to_xStep(compoundResults.retentionTime + (state.numPeakWidths * compoundResults.peakWidth), state.xStep);
  //if (compoundResults.timeMax > timeMax) { timeMax = compoundResults.timeMax; }

  let compoundHue = 0;
  let compoundColorHEX = "#828282";
  if (compoundName !== "uracil") {
    compoundHue = (360 / state.compoundList.length) * compoundIndx;
    compoundColorHEX = HSL2HEX(compoundHue, 80, 50);
  }
  //console.debug("compoundHue: " + compoundHue + ", compoundColorHEX: " + compoundColorHEX);
  compoundResults.color = compoundColorHEX;
  
  return compoundResults;
};