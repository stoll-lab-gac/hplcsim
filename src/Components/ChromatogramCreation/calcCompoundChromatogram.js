const chromaCore = require('@stoll-lab-gac/chroma-core');

export const calcCompoundChromatogram = (compoundResults, state) => {
  let xValues = [];
  let yValues = [];

  let chromatogram = {};
  //const numPeakWidths = 8;
  xValues.push(((compoundResults.timeMin - state.xStep).toFixed(6)) / 60);
  yValues.push(0);
  chromatogram["" + ((compoundResults.timeMin - state.xStep).toFixed(6))] = 0;
  for (let t = compoundResults.timeMin; t <= compoundResults.timeMax; t += state.xStep) {
    xValues.push((t.toFixed(6)) / 60);
    yValues.push(chromaCore.general.calcChromatogram(t.toFixed(6), compoundResults.M * (state.injectionVolume / 100), compoundResults.peakWidth, state.flowRate, compoundResults.retentionTime));
    let key = "" + (t.toFixed(6));
    //if((t.toFixed(6)) % 1 === 0) { key += ".0"; }
    chromatogram[key] = chromaCore.general.calcChromatogram(t.toFixed(6), compoundResults.M * (state.injectionVolume / 100), compoundResults.peakWidth, state.flowRate, compoundResults.retentionTime);
  }
  xValues.push(((compoundResults.timeMax + state.xStep).toFixed(6)) / 60);
  yValues.push(0);
  chromatogram["" + ((compoundResults.timeMax + state.xStep).toFixed(6))] = 0;

  compoundResults.xValues = xValues;
  compoundResults.yValues = yValues;
  compoundResults.chromatogram = chromatogram;

  return compoundResults;
}