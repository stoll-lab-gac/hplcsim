import { useMemo } from 'react';

import Plot from 'react-plotly.js';

import { Menu } from './Components/Menus/Menu';
import { MenuCompounds } from './Components/Menus/MenuCompounds';
import { MenuMobilePhase } from './Components/Menus/MenuMobilePhase';
import { MenuChromatographic } from './Components/Menus/MenuChromatographic';
import { MenuGeneral } from './Components/Menus/MenuGeneral';
import { MenuColumn } from './Components/Menus/MenuColumn';

import { ResultsTable } from './Components/Menus/ResultsTable';

import { InputButton } from './Components/Inputs/InputButton'
import { InputButtonLink } from './Components/Inputs/InputButtonLink'

import { HSL2HEX } from './Components/Utilities/HSL2HEX';

const chromaCore = require('@stoll-lab-gac/chroma-core');

const round_to_xStep = (x, xStep) => { return Math.round(x/xStep)*xStep; };

function calcEluentViscosity(phi0, phiFinal, temperature, solventB) {
  if(phi0 === phiFinal) {
    if(solventB === "Methanol") {
      return chromaCore.general.calcViscosityMethanolWater(phi0, temperature);
    } else {
      return chromaCore.general.calcViscosityAcetonitrileWater(phi0, temperature);
    }
  } else {
    let eluentViscosity = 0;
    let count = 0;
    for(let phi = phi0; phi <= phiFinal; phi+=0.01) {
      if(solventB === "Methanol") {
        eluentViscosity += chromaCore.general.calcViscosityMethanolWater(phi, temperature);
      } else {
        eluentViscosity += chromaCore.general.calcViscosityAcetonitrileWater(phi, temperature);
      }
      count += 1;
    }
    return eluentViscosity / count;
  }
}

function calcMorg(solventB) {
  if (solventB === "Methanol") {
    return 32.04; /*Methanol*/
  } else {
    return 41.05; /*Acetonitrile*/
  }
}

function checkPhiFinal(phi0, phiFinal) {
  if(phiFinal < phi0) {
    return phi0;
  } else {
    return phiFinal;
  }
}

export function App({state, dispatch}) {

  function handleInputChange(name, value) {
    console.debug(`${name}: ${value}`);
    let updatedCondition = {};
    switch(name) {
      // mobile phase
      case 'solvent-A':
        updatedCondition = {solventA: value};
        break;
      case 'solvent-B':
        updatedCondition = {solventB: value};
        break;
      case 'isocratic-radio':
        if(value !== 'on') return;
        updatedCondition = {
          useGradient: false,
          phiFinal: state.phi0,
          gradientTime: 0
        };
        break;
      case 'gradient-radio':
        if(value !== 'on') return;
        updatedCondition = {
          useGradient: true,
          phiFinal: state.phi0,
          gradientTime: 5
        };
        break;
      case 'phi-initial':
        updatedCondition = {phi0: value};
        break;
      case 'phi-final':
        updatedCondition = {phiFinal: value};
        break;
      case 'gradient-time':
        updatedCondition = {gradientTime: value};
        break;
      
      // chroma parameters
      case 'temperature':
        updatedCondition = {temperature: value}
        break;
      case 'injection-volume':
        updatedCondition = {injectionVolume: value}
        break;
      case 'flow-rate':
        updatedCondition = {flowRate: value}
        break;
      
      // general parameters
      case 'detectorFrequency':
        updatedCondition = {detectorFrequency: value}
        break;
      case 'plotPumpSolventB':
        updatedCondition = {plotPumpSolventB: value}
        break;
      case 'plotColumnSolventB':
        updatedCondition = {plotColumnSolventB: value}
        break;
      case 'plotCompounds':
        updatedCondition = {plotCompounds: value}
        break;
      
      // stationary phase
      case 'selected-column':
        updatedCondition = {column: value}
        break;
      case 'length':
        updatedCondition = {length: value}
        break;
      case 'inner-diameter':
        updatedCondition = {innerDiameter: value}
        break;
      case 'particle-size':
        updatedCondition = {particleSize: value}
        break;
      case 'epsiloni':
        updatedCondition = {epsilonI: value}
        break;
      case 'epsilone':
        updatedCondition = {epsilonE: value}
        break;
      case 'vanDeemter-A':
        updatedCondition = {vanDeemterA: value}
        break;
      case 'vanDeemter-B':
        updatedCondition = {vanDeemterB: value}
        break;
      case 'vanDeemter-C':
        updatedCondition = {vanDeemterC: value}
        break;
      
      default:
        throw Error(`unhandled input change ${name}`);
    }
    dispatch({type: 'edit-inputs', payload: updatedCondition});
  }

  function onChangeConcentration(selectedColumn, solventB, compound, conc){
    dispatch({
      type: 'edit-concentration',
      payload: {
        "selectedColumn": selectedColumn,
        "solventB": solventB,
        "compound": compound,
        "conc": conc
      }
    });
  }

  function onChangeCompoundList(compoundName,compoundChecked) {
    dispatch({
      type: 'edit-compound-list',
      payload: {
        "compoundName": compoundName,
        "compoundChecked": compoundChecked
      }
    });
  }

  function resetMenus() {
    dispatch({type: 'reset', payload: {}});
  }

  function logExportFileData_Full() {

  }

  function logExportFileData_Selected() {

  }

  //const statusUpdater = useCallback((status) => dispatch({type: 'set-status', payload: status}), [dispatch]);

  state.phiFinal = useMemo(() => checkPhiFinal(state.phi0, state.phiFinal), [state.phi0, state.phiFinal]);

  // Layer 0
  state.mOrg = useMemo(() => calcMorg(state.solventB), [state.solventB]);
  state.solventAssociationParameter = useMemo(() => chromaCore.general.calcSolventAssociationParameter(((state.phi0+state.phiFinal)/2), state.xOrg), [state.phi0, state.phiFinal, state.xOrg]);
  state.solventMolecularWeight = useMemo(() => chromaCore.general.calcSolventMolecularWeight(((state.phi0+state.phiFinal)/2), state.mOrg), [state.phi0, state.phiFinal, state.mOrg]);

  // Layer 1
  state.epsilonT = useMemo(() => chromaCore.general.calcEpsilonTotal(state.epsilonE, state.epsilonI), [state.epsilonE, state.epsilonI]);
  state.eluentViscosity = useMemo(() => calcEluentViscosity(state.phi0,state.phiFinal,state.temperature,state.solventB), [state.phi0,state.phiFinal,state.temperature,state.solventB]);
  state.columnCrossArea = useMemo(() => chromaCore.general.calcCrossSectionalArea(state.innerDiameter), [state.innerDiameter]);

  // Layer 2
  state.voidVolume = useMemo(() => chromaCore.general.calcVoidVolume(state.innerDiameter, state.length, state.epsilonT), [state.innerDiameter, state.length, state.epsilonT]);
  state.diffusionCoefficient = useMemo(() => chromaCore.general.calcDiffusionCoefficient(state.temperature, state.solventAssociationParameter, state.solventMolecularWeight, state.eluentViscosity, state.volumeMolar), [state.temperature, state.solventAssociationParameter, state.solventMolecularWeight, state.eluentViscosity, state.volumeMolar]);
  state.flowVelocity_openTube = useMemo(() => chromaCore.general.calcFlowVelocityOpenTube(state.flowRate, state.columnCrossArea), [state.flowRate, state.columnCrossArea]);

  // Layer 3
  state.voidTime = useMemo(() => chromaCore.general.calcVoidTime(state.voidVolume, state.flowRate), [state.voidVolume, state.flowRate]);
  state.flowVelocity_intersitial = useMemo(() => chromaCore.general.calcFlowVelocityIntersitial(state.flowVelocity_openTube, state.epsilonE), [state.flowVelocity_openTube, state.epsilonE]);
  state.flowVelocity_chromatographic = useMemo(() => chromaCore.general.calcFlowVelocityChromatographic(state.flowVelocity_openTube, state.epsilonT), [state.flowVelocity_openTube, state.epsilonT]);
  state.backPressure = useMemo(() => chromaCore.general.calcBackPressure(state.flowVelocity_openTube, state.eluentViscosity, state.length, state.epsilonE, state.particleSize), [state.flowVelocity_openTube, state.eluentViscosity, state.length, state.epsilonE, state.particleSize]);

  // Layer 4
  state.flowVelocity_reduced = useMemo(() => chromaCore.general.calcFlowVelocityReduced(state.flowVelocity_intersitial, state.particleSize, state.diffusionCoefficient), [state.flowVelocity_intersitial, state.particleSize, state.diffusionCoefficient]);
  
  // Layer 5
  state.reducedPlateHeight = useMemo(() => chromaCore.general.calcReducedPlateHeight(state.flowVelocity_reduced, state.vanDeemterA, state.vanDeemterB, state.vanDeemterC), [state.flowVelocity_reduced, state.vanDeemterA, state.vanDeemterB, state.vanDeemterC]);

  // Layer 6
  state.HETP = useMemo(() => chromaCore.general.calcHeightEquivalentTheoreticalPlate(state.reducedPlateHeight, state.particleSize), [state.reducedPlateHeight, state.particleSize]);

  // Layer 7
  state.theoreticalPlateNumber = useMemo(() => chromaCore.general.calcTheoreticalPlateNumber(state.length, state.HETP), [state.length, state.HETP]);

  state.compoundList = useMemo(() => state.compoundList, [state.compoundList]);

  state.compoundResults = {};
  state.plotData = [{},{},{}];

  const numPeakWidths = 8;
  const xStep = 1/state.detectorFrequency;
  let timeMax = 0;

  for(let compoundIndx = 0; compoundIndx < state.compoundList.length; compoundIndx++){
    const compoundName = state.compoundList[compoundIndx];
    //console.debug(compoundName);
    let compoundResults = {};
    const compoundParams = state.compoundParameters[state.selectedColumn][state.solventB][compoundName];
    //console.debug(compoundParams);

    compoundResults.solventSensitivityFactor = chromaCore.LSS.calcSolventSensitivityFactor(compoundParams.S_intercept, compoundParams.S_slope, state.temperature);
    compoundResults.lnRetentionFactorWater = chromaCore.LSS.calcLnRetentionFactorWater(compoundParams.lnkw_intercept, compoundParams.lnkw_slope, state.temperature);

    if(state.useGradient && (state.phi0 !== state.phiFinal)) {
      if(compoundName === "uracil") {
        compoundResults.retentionTime = state.voidTime;
        compoundResults.retentionFactor = 0;
      } else {
        compoundResults.retentionTime = chromaCore.LSS.calcGradientRetentionTime(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.flowRate, state.phi0, state.phiFinal, state.voidVolume, state.voidTime, state.gradientTime, state.delayTime);
        compoundResults.retentionFactor = chromaCore.LSS.calcGradientRetentionFactorEffective(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.phi0, state.phiFinal, state.voidTime, state.gradientTime*60, compoundResults.retentionTime, state.delayTime);
      }
      compoundResults.peakWidth = chromaCore.LSS.calcGradientPeakWidth(compoundResults.retentionFactor, state.theoreticalPlateNumber, state.voidTime/60, state.detectorTimeConstant);
      const gradientSlope = (state.phiFinal - state.phi0)/(state.gradientTime*60);
      if(compoundResults.retentionTime-state.delayTime-state.voidTime < state.gradientTime*60) {
        compoundResults.phiEffective = gradientSlope*(compoundResults.retentionTime-state.delayTime-state.voidTime)+state.phi0;
      } else {
        compoundResults.phiEffective = state.phi0;
      }
    } else {
      if(compoundName === "uracil") {
        compoundResults.retentionTime = state.voidTime;
        compoundResults.retentionFactor = 0;
      } else {
        compoundResults.retentionFactor = chromaCore.LSS.calcIsocraticRetentionFactor(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.phi0);
        compoundResults.retentionTime = chromaCore.LSS.calcIsocraticRetentionTime(compoundResults.retentionFactor, state.voidTime);
      }
      compoundResults.peakWidth = chromaCore.LSS.calcIsocraticPeakWidth(compoundResults.retentionTime, state.theoreticalPlateNumber, state.flowRate, state.injectionVolume, state.detectorTimeConstant);
      compoundResults.phiEffective = state.phi0;
    }

    compoundResults.height = chromaCore.general.calcChromatogram(compoundResults.retentionTime, compoundParams.M*(state.injectionVolume/100), compoundResults.peakWidth, state.flowRate, compoundResults.retentionTime);
    //if(compoundResults.height > heightMax) { heightMax = compoundResults.height; }

    compoundResults.timeMin = round_to_xStep(compoundResults.retentionTime-(numPeakWidths*compoundResults.peakWidth), xStep);
    compoundResults.timeMax = round_to_xStep(compoundResults.retentionTime+(numPeakWidths*compoundResults.peakWidth), xStep);
    if(compoundResults.timeMax > timeMax) { timeMax = compoundResults.timeMax; }

    let compoundHue = 0; let compoundColorHEX = "#828282";
    if(compoundName !== "uracil") {
      compoundHue = (360/state.compoundList.length)*compoundIndx;
      compoundColorHEX = HSL2HEX(compoundHue, 80, 50);
    }
    //console.debug("compoundHue: " + compoundHue + ", compoundColorHEX: " + compoundColorHEX);
    compoundResults.color = compoundColorHEX;
    
    let xValues = [];
    let yValues = [];

    let chromatogram = {};
    //const numPeakWidths = 8;
    for(let t = compoundResults.timeMin; t <= compoundResults.timeMax; t += xStep){
      xValues.push((t.toFixed(6))/60);
      yValues.push(chromaCore.general.calcChromatogram(t.toFixed(6), compoundParams.M*(state.injectionVolume/100), compoundResults.peakWidth, state.flowRate, compoundResults.retentionTime));
      let key = ""+(t.toFixed(6));
      if((t.toFixed(6)) % 1 === 0) { key += ".0"; }
      chromatogram[key] = chromaCore.general.calcChromatogram(t.toFixed(6), compoundParams.M*(state.injectionVolume/100), compoundResults.peakWidth, state.flowRate, compoundResults.retentionTime);
    }
    compoundResults.chromatogram = chromatogram;

    state.compoundResults[compoundName] = compoundResults;
    
    //*
    if(state.plotCompounds){
      state.plotData.push({
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: compoundName,
        showlegend: false,
        legendrank: compoundResults.retentionTime,
        mode: 'lines',
        marker: {
          color: compoundColorHEX,
          size: 3
        },
        line: {
          color: compoundColorHEX,
          width: 2
        }
      });
    }
    
    //*/
  }

  timeMax = round_to_xStep(timeMax, xStep) + xStep;

  let fullChromatogram = {};
  for(let t = 0; t <= timeMax; t += xStep) { let key = ""+(t.toFixed(6)); if((t.toFixed(6)) % 1 === 0) { key += ".0"; }; fullChromatogram[key] = 0; }
  //console.log(fullChromatogram);

  let compoundResultsKeys = Object.keys(state.compoundResults);
  for(let compoundIndx = 0; compoundIndx < compoundResultsKeys.length; compoundIndx++) {
    const compoundResults = state.compoundResults[compoundResultsKeys[compoundIndx]];
    const compoundChromatogram = compoundResults.chromatogram;

    let compoundChromatogramKeys = Object.keys(compoundChromatogram);
    for(let compoundChromatogramKeyIndx = 0; compoundChromatogramKeyIndx < compoundChromatogramKeys.length; compoundChromatogramKeyIndx++) {
      fullChromatogram[compoundChromatogramKeys[compoundChromatogramKeyIndx]] = fullChromatogram[compoundChromatogramKeys[compoundChromatogramKeyIndx]] + compoundChromatogram[compoundChromatogramKeys[compoundChromatogramKeyIndx]];
    }
  }
  //console.log(fullChromatogram);

  let xValues = []; let yValues = [];
  for(let t = 0; t <= timeMax; t += xStep) {
    xValues.push((t.toFixed(6))/60);
    let key = ""+(t.toFixed(6)); if((t.toFixed(6)) % 1 === 0) { key += ".0"; }; yValues.push(fullChromatogram[key]);
  }

  let heightMax = Math.max(yValues);

  //console.log(xValues);
  //console.log(yValues);

  let fullChromatogramLineWidth = 2;
  if(state.plotCompounds){
    fullChromatogramLineWidth = 1;
  }

  //*
  state.plotData[2] = {
    x: xValues,
    y: yValues,
    type: 'scatter',
    name: "full",
    showlegend: false,
    legendrank: 0,
    mode: 'lines',
    marker: {
      color: "#000000",
      size: 3
    },
    line: {
      color: "#000000",
      width: fullChromatogramLineWidth
    }
  };
  //*/

  xValues = [0]; yValues = [state.phi0*100];
  let xValuesOffsetValue = (state.delayTime+state.voidTime)/60;
  let xValuesOffset = [0, 0+xValuesOffsetValue];
  let yValuesOffset = [state.phi0*100, state.phi0*100];
  if(state.useGradient) {
    if(state.gradientTime < timeMax/60){
      xValues.push(state.gradientTime);
      yValues.push(state.phiFinal*100);
      xValuesOffset.push(state.gradientTime+xValuesOffsetValue);
      yValuesOffset.push(state.phiFinal*100);
      
      xValues.push(state.gradientTime+0.00000001);
      yValues.push(state.phi0*100);
      xValuesOffset.push(state.gradientTime+0.00000001+xValuesOffsetValue);
      yValuesOffset.push(state.phi0*100);
      
      xValues.push(timeMax/60);
      yValues.push(state.phi0*100);
      xValuesOffset.push(timeMax/60+xValuesOffsetValue);
      yValuesOffset.push(state.phi0*100);
    } else {
      const gradientSlope = (state.phiFinal - state.phi0) / state.gradientTime;
      xValues.push(timeMax/60);
      yValues.push(((gradientSlope * (timeMax/60)) + state.phi0)*100);
      xValuesOffset.push((timeMax/60)+xValuesOffsetValue);
      yValuesOffset.push(((gradientSlope * (timeMax/60)) + state.phi0)*100);
    }

    if(state.plotPumpSolventB){
      state.plotData[0] = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: "%B Pump",
        showlegend: false,
        legendrank: 0,
        mode: 'lines+markers',
        yaxis: 'y2',
        marker: {
          color: "#FF0000",
          size: 3
        },
        line: {
          color: "#FF0000",
          width: 0.5,
          dash: "dash"
        }
      };
    }
    
    if(state.plotColumnSolventB){
      state.plotData[1] = {
        x: xValuesOffset,
        y: yValuesOffset,
        type: 'scatter',
        name: "%B Column",
        showlegend: false,
        legendrank: 0,
        mode: 'lines+markers',
        yaxis: 'y2',
        marker: {
          color: "#FF0000",
          size: 3
        },
        line: {
          color: "#FF0000",
          width: 0.5,
          dash: "solid"
        }
      };
    }
    
  } else {
    xValues.push(timeMax/60);
    xValuesOffset.push((timeMax/60)+xValuesOffsetValue);
    yValues.push(state.phi0*100);

    if(state.plotColumnSolventB){
      state.plotData[0] = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: "Solvent B",
        showlegend: false,
        legendrank: 0,
        mode: 'lines+markers',
        yaxis: 'y2',
        marker: {
          color: "#FF0000",
          size: 3
        },
        line: {
          color: "#FF0000",
          width: 0.5,
          dash: "solid"
        }
      };
    }
    
  }
  
  if(!state.useGradient) {
    state.plotPumpSolventB = false;
  }

  console.log(state);

  return (
    <div id="content" style={{
      //width: '1148px',
      //height: '690px',
      backgroundColor: '#fff',
      //marginLeft: '386px',
      //marginTop: '142px'
      }}>
      <div id="header_title">
				<div id="title">HPLC Simulator</div>
        <InputButton id="resetBtn" value="Reset" onClick={ val=>resetMenus() } />
			</div>
      <div id="header">
        <div>
          <InputButtonLink href="../about" value="About" className="title_button" />
          <InputButtonLink href="../whats_new" value="What's New" className="title_button" />
				</div>
				<div>
        <InputButtonLink href="../instructor_resources" value="Instructor Resources" id="instructor_resources_btn" className="title_button" />
				</div>
				<div>
          <InputButton value="Export Chromatogram" className="export_button" onClick={logExportFileData_Full()} disabled={true} />
          <InputButton value="Export Selected Compound" className="export_button" onClick={logExportFileData_Selected()} disabled={true} />
				</div>
				<span id="versionDisplay">Version:<br />v{process.env.REACT_APP_VERSION}</span>
      </div>
      <div id="params">
        <Menu title='Manage Compounds'>
          <fieldset>
            <MenuCompounds
              compounds={state.compoundParameters[state.selectedColumn][state.solventB]}
              compoundList={state.compoundList}
              onChangeConcentration={(compound, conc) => onChangeConcentration(state.selectedColumn, state.solventB, compound, conc)}
              onChangeCompoundList={(compoundName, checked) => onChangeCompoundList(compoundName, checked)}
            />
          </fieldset>
        </Menu>
        <Menu title='Mobile Phase Composition'>
          <fieldset>
            <MenuMobilePhase
              useGradient={state.useGradient}
              phi0={state.phi0}
              phif={state.phiFinal}
              tg={state.gradientTime}
              solventAs={state.solventAs}
              solventBs={state.solventBs}
              selectedSolventA={state.solventA}
              selectedSolventB={state.solventB}
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </Menu>
        <Menu title='Chromatographic Properties'>
          <fieldset>
            <MenuChromatographic
              temperature={state.temperature}
              injectionVolume={state.injectionVolume}
              flowRate={state.flowRate}
              fVel_OpenTube={state.flowVelocity_openTube}
              fVel_Interstitial={state.flowVelocity_intersitial}
              fVel_Chromatographic={state.flowVelocity_chromatographic}
              fVel_Reduced={state.flowVelocity_reduced}
              plateHeight={state.HETP}
              plateNumber={state.theoreticalPlateNumber}
              backpressure={state.backPressure}
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </Menu>
        <Menu title='General Properties'>
          <fieldset>
            <MenuGeneral
              eluentViscosity={state.eluentViscosity}
              diffusionCoefficient={state.diffusionCoefficient}
              detectorFrequency={state.detectorFrequency}
              plotCompounds={state.plotCompounds}
              plotPumpSolventB={state.plotPumpSolventB}
              plotColumnSolventB={state.plotColumnSolventB}
              useGradient={state.useGradient}
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </Menu>
        <Menu title='Column Properties'>
          <fieldset>
            <MenuColumn
              columns={state.columns}
              selectedColumn={state.selectedColumn}
              length={state.length}
              innerDiameter={state.innerDiameter}
              particleSize={state.particleSize}
              epsilonI={state.epsilonI}
              epsilonE={state.epsilonE}
              epsilonT={state.epsilonT}
              vanDeemterA={state.vanDeemterA}
              vanDeemterB={state.vanDeemterB}
              vanDeemterC={state.vanDeemterC}
              voidVolume={state.voidVolume}
              voidTime={state.voidTime}
              reducedPlateHeight={state.reducedPlateHeight}
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </Menu>
      </div>
      <div id="graph">
      <Plot
        data={state.plotData}
        layout={{
          autosize: true,
          width: 765,
          height: 514,
          margin: {
            l: 80,
            r: 80,
            b: 50,
            t: 20,
            pad: 5
          },
          xaxis: {
            range: [0, timeMax/60],
            title: 'Time (min)',
          },
          yaxis: {
            range: [0, heightMax],
            title: 'Signal (mAU)',
          },
          yaxis2: {
            range: [0, 100],
            title: 'Solvent B Fraction (% v/v)',
            overlaying: 'y',
            side: 'right'
          }
        }}
      />
      </div>
      <div id="tableDiv"><ResultsTable compoundResultsObject={state.compoundResults} useGradient={state.useGradient} /></div>
    </div>
  );
}
