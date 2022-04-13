//import { useCallback } from 'react';
import { Menu } from './Components/Menus/Menu';
import { MenuCompounds } from './Components/Menus/MenuCompounds';
import { MenuMobilePhase } from './Components/Menus/MenuMobilePhase';
import { MenuChromatographic } from './Components/Menus/MenuChromatographic';
import { MenuGeneral } from './Components/Menus/MenuGeneral';
import { MenuColumn } from './Components/Menus/MenuColumn';
import { InputButton } from './Components/Inputs/InputButton'
import { InputButtonLink } from './Components/Inputs/InputButtonLink'
import { useMemo } from 'react';

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



  for(let compoundIndx = 0; compoundIndx < state.compoundList.length; compoundIndx++){
    const compoundName = state.compoundList[compoundIndx];
    let compoundResults = {};
    const compoundParams = state.compoundParameters[state.selectedColumn][state.solventB][compoundName];
    console.log(compoundParams);

    compoundResults.solventSensitivityFactor = chromaCore.LSS.calcSolventSensitivityFactor(compoundParams.S_intercept, compoundParams.S_slope, state.temperature, true);
    compoundResults.lnRetentionFactorWater = chromaCore.LSS.calcLnRetentionFactorWater(compoundParams.lnkw_intercept, compoundParams.lnkw_slope, state.temperature, true);

    if(state.useGradient) {
      compoundResults.retentionTime = chromaCore.LSS.calcGradientRetentionTime(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.flowRate, state.phi0, state.phiFinal, state.voidVolume, state.voidTime, state.gradientTime, 0, true);
      compoundResults.retentionFactor = chromaCore.LSS.calcGradientRetentionFactorEffective(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.phi0, state.phiFinal, state.voidTime, state.gradientTime*60, compoundResults.retentionTime, 0, true);
      compoundResults.peakWidth = chromaCore.LSS.calcGradientPeakWidth(compoundResults.retentionFactor, state.theoreticalPlateNumber, state.voidTime/60, state.detectorTimeConstant, true);
    } else {
      compoundResults.retentionFactor = chromaCore.LSS.calcIsocraticRetentionFactor(compoundResults.lnRetentionFactorWater, compoundResults.solventSensitivityFactor, state.phi0, true);
      compoundResults.retentionTime = chromaCore.LSS.calcIsocraticRetentionTime(compoundResults.retentionFactor, state.voidTime, true);
      compoundResults.peakWidth = chromaCore.LSS.calcIsocraticPeakWidth(compoundResults.retentionTime, state.theoreticalPlateNumber, state.flowRate, state.injectionVolume, state.detectorTimeConstant, true);
    }
  }


  console.log(state);

  return (
    <div id="content" style={{
      width: '1148px',
      height: '690px',
      backgroundColor: '#fff',
      marginLeft: '386px',
      marginTop: '142px'
      }}>
      <div id="header_title">
				<div id="title">HPLC Simulator</div>
        <InputButton id="resetBtn" value="Reset" onClick={ resetMenus() } />
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
          <InputButton value="Export Chromatogram" className="export_button" onClick={logExportFileData_Full()} />
          <InputButton value="Export Selected Compound" className="export_button" onClick={logExportFileData_Selected()} />
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
      <div id="graph">graph</div>
      <div id="tableDiv">tableDiv</div>
    </div>
  );
}
