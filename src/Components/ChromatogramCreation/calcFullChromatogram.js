import { createPlotDataObject } from '../Utilities/createPlotDataObject';


export const calcFullChromatogram = (state) => {
  let fullChromatogram = {};
  //for(let t = 0; t <= timeMax; t += xStep) { let key = ""+(t.toFixed(6)); fullChromatogram[key] = 0; }
  //console.log(fullChromatogram);

  let compoundResultsKeys = Object.keys(state.compoundResults);
  for(let compoundIndx = 0; compoundIndx < compoundResultsKeys.length; compoundIndx++) {
    const compoundResults = state.compoundResults[compoundResultsKeys[compoundIndx]];
    const compoundChromatogram = compoundResults.chromatogram;

    let compoundChromatogramKeys = Object.keys(compoundChromatogram);

    for(let compoundChromatogramKeyIndx = 0; compoundChromatogramKeyIndx < compoundChromatogramKeys.length; compoundChromatogramKeyIndx++) {
      let fullChromatogramKey = compoundChromatogramKeys[compoundChromatogramKeyIndx];
      if(fullChromatogram[fullChromatogramKey] === undefined) {
        fullChromatogram[fullChromatogramKey] = compoundChromatogram[fullChromatogramKey];
      } else {
        fullChromatogram[fullChromatogramKey] = fullChromatogram[fullChromatogramKey] + compoundChromatogram[fullChromatogramKey];
      }
      
    }
  }
  console.log(fullChromatogram);
  console.log(Object.keys(fullChromatogram).length);

  let xValues = []; let yValues = [];
  let fullChromatogramKeys = Object.keys(fullChromatogram);
  fullChromatogramKeys.sort(function(a, b) { return a - b; });
  for(let i = 0; i < fullChromatogramKeys.length; i++) {
    const t = Number(fullChromatogramKeys[i]);
    xValues.push((t.toFixed(6))/60);
    let key = ""+(t.toFixed(6)); yValues.push(fullChromatogram[key]);
  }

  let heightMax = 0; for(let i = 0; i < yValues.length; i++){ if(yValues[i] > heightMax) { heightMax = yValues[i]; } }; //heightMax *= 1.02;

  console.log("Full Chromatogram Points = " + xValues.length);
  //console.log(yValues);

  let fullChromatogramLineWidth = 2; if(state.plotCompounds){ fullChromatogramLineWidth = 1; }

  //*

  

  let plotDataObj = createPlotDataObject({
    xValues: xValues,
    yValues: yValues,
    name: 'full',
    color: '#000000',
    legendrank: 0,
    lineWidth: fullChromatogramLineWidth
  });

  return plotDataObj;
}