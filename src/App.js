import { useMemo } from 'react';
//import fetch from 'node-fetch';

import { OutputPlot } from './Components/Outputs/OutputPlot';
import { createPlotDataObject } from './Components/Utilities/createPlotDataObject';

import { Menu } from './Components/Menus/Menu';
import { MenuCompounds } from './Components/Menus/MenuCompounds';
import { MenuMobilePhase } from './Components/Menus/MenuMobilePhase';
import { MenuChromatographic } from './Components/Menus/MenuChromatographic';
import { MenuGeneral } from './Components/Menus/MenuGeneral';
import { MenuColumn } from './Components/Menus/MenuColumn';

import { ResultsTable } from './Components/Menus/ResultsTable';

import { InputButton } from './Components/Inputs/InputButton'
import { InputButtonLink } from './Components/Inputs/InputButtonLink'

import { round_to_xStep } from './Components/Utilities/round_to_xStep';
import { arrayMax } from './Components/Utilities/arrayMax';

import { calcCompoundResults } from './Components/ChromatogramCreation/calcCompoundResults';
import { calcCompoundChromatogram } from './Components/ChromatogramCreation/calcCompoundChromatogram';
import { calcFullChromatogram } from './Components/ChromatogramCreation/calcFullChromatogram';

const chromaCore = require('@stoll-lab-gac/chroma-core');

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

function validateCompoundList(compoundList, compoundParameters, selectedColumn, solventA, solventB) {
  let compoundListNew = [];

  const compoundParametersKeys = Object.keys(compoundParameters[selectedColumn][solventB]);
  for(let i = 0; i < compoundList.length; i++) {
    if(compoundParametersKeys.includes(compoundList[i])) {
      compoundListNew.push(compoundList[i]);
    }
  }

  if(compoundListNew.length === 0) { compoundListNew.push("uracil"); }

  return compoundListNew;
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
      case 'plotDetectorSolventB':
        updatedCondition = {plotDetectorSolventB: value}
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

  state.compoundList = useMemo(() => validateCompoundList(state.compoundList, state.compoundParameters, state.selectedColumn, state.solventA, state.solventB), [state.compoundList, state.compoundParameters, state.selectedColumn, state.solventA, state.solventB]);

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

  state.xStep = useMemo(() => (1/state.detectorFrequency), [state.detectorFrequency]);

  state.compoundResults = {};
  state.plotData = [{},{},{}];

  state.xStep = 1/state.detectorFrequency;
  let timeMax = 0;

  for(let compoundIndx = 0; compoundIndx < state.compoundList.length; compoundIndx++){
    const compoundName = state.compoundList[compoundIndx];
    //console.debug(compoundName);
    let compoundResults = calcCompoundResults(compoundIndx, state);
    if (compoundResults.timeMax > timeMax) { timeMax = compoundResults.timeMax; }
    
    compoundResults = calcCompoundChromatogram(compoundResults, state);

    state.compoundResults[compoundName] = compoundResults;
    
    if(state.plotCompounds){
      state.plotData.push(
        createPlotDataObject({
          xValues: compoundResults.xValues,
          yValues: compoundResults.yValues,
          name: compoundName,
          color: compoundResults.color,
          legendrank: compoundResults.retentionTime
        })
      );
    }
    
  }

  state.plotData[2] = calcFullChromatogram(state);

  timeMax = round_to_xStep(timeMax, state.xStep) + state.xStep;

  let xValues = [0]; let yValues = [state.phi0*100];
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
    
    if(state.plotDetectorSolventB){
      state.plotData[1] = {
        x: xValuesOffset,
        y: yValuesOffset,
        type: 'scatter',
        name: "%B Detector",
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

    if(state.plotDetectorSolventB){
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
  
  if(!state.useGradient) { state.plotPumpSolventB = false; }

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
              plotDetectorSolventB={state.plotDetectorSolventB}
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
      <OutputPlot
        plotData={state.plotData}
        timeMax={timeMax}
        heightMax={arrayMax(state.plotData[2].y)}
      />
      <div id="tableDiv"><ResultsTable compoundResultsObject={state.compoundResults} useGradient={state.useGradient} /></div>
    </div>
  );
}
