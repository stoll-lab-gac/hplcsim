//import { useCallback } from 'react';
import { Menu } from './Components/Menus/Menu';
import { MenuMobilePhase } from './Components/Menus/MenuMobilePhase';
import { MenuChromatographic } from './Components/Menus/MenuChromatographic';
import { MenuColumn } from './Components/Menus/MenuColumn';
import { useMemo } from 'react';

const chromaCore = require('@stoll-lab-gac/chroma-core');

function calcEluentViscosity(phi, temperature, solventB) {
  if(solventB === "Methanol") {
    return chromaCore.calcViscosityMethanolWater(phi, temperature);
  } else {
    return chromaCore.calcViscosityAcetonitrileWater(phi, temperature);
  }
}

function calcMorg(solventB) {
  if (solventB === "Methanol") {
    return 32.04; /*Methanol*/
  } else {
    return 41.05; /*Acetonitrile*/
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

  //const statusUpdater = useCallback((status) => dispatch({type: 'set-status', payload: status}), [dispatch]);

  const phiAverage = (state.phi0+state.phiFinal)/2;

  // Layer 0
  state.mOrg = useMemo(() => calcMorg(state.solventB), [state.solventB]);
  state.solventAssociationParameter = useMemo(() => chromaCore.calcSolventAssociationParameter(phiAverage, state.xOrg), [phiAverage, state.xOrg]);
  state.solventMolecularWeight = useMemo(() => chromaCore.calcSolventMolecularWeight(phiAverage, state.mOrg), [phiAverage, state.mOrg]);

  // Layer 1
  state.epsilonT = useMemo(() => chromaCore.calcEpsilonTotal(state.epsilonE, state.epsilonI), [state.epsilonE, state.epsilonI]);
  state.eluentViscosity = useMemo(() => calcEluentViscosity((state.phi0+state.phiFinal)/2,state.temperature,state.solventB), [state.phi0, state.phiFinal, state.temperature,state.solventB]);
  state.columnCrossArea = useMemo(() => chromaCore.calcCrossSectionalArea(state.innerDiameter), [state.innerDiameter]);

  // Layer 2
  state.voidVolume = useMemo(() => chromaCore.calcVoidVolume(state.innerDiameter, state.length, state.epsilonT), [state.innerDiameter, state.length, state.epsilonT]);
  state.diffusionCoefficient = useMemo(() => chromaCore.calcDiffusionCoefficient(state.temperature, state.solventAssociationParameter, state.solventMolecularWeight, state.eluentViscosity, state.volumeMolar), [state.temperature, state.solventAssociationParameter, state.solventMolecularWeight, state.eluentViscosity, state.volumeMolar]);
  state.flowVelocity_openTube = useMemo(() => chromaCore.calcFlowVelocityOpenTube(state.flowRate, state.columnCrossArea), [state.flowRate, state.columnCrossArea]);

  // Layer 3
  state.voidTime = useMemo(() => chromaCore.calcVoidTime(state.voidVolume, state.flowRate), [state.voidVolume, state.flowRate]);
  state.flowVelocity_intersitial = useMemo(() => chromaCore.calcFlowVelocityIntersitial(state.flowVelocity_openTube, state.epsilonE), [state.flowVelocity_openTube, state.epsilonE]);
  state.flowVelocity_chromatographic = useMemo(() => chromaCore.calcFlowVelocityChromatographic(state.flowVelocity_openTube, state.epsilonT), [state.flowVelocity_openTube, state.epsilonT]);
  state.backPressure = useMemo(() => chromaCore.calcBackPressure(state.flowVelocity_openTube, state.eluentViscosity, state.length, state.epsilonE, state.particleSize), [state.flowVelocity_openTube, state.eluentViscosity, state.length, state.epsilonE, state.particleSize]);

  // Layer 4
  state.flowVelocity_reduced = useMemo(() => chromaCore.calcFlowVelocityReduced(state.flowVelocity_intersitial, state.particleSize, state.diffusionCoefficient), [state.flowVelocity_intersitial, state.particleSize, state.diffusionCoefficient]);
  
  // Layer 5
  state.reducedPlateHeight = useMemo(() => chromaCore.calcReducedPlateHeight(state.flowVelocity_reduced, state.vanDeemterA, state.vanDeemterB, state.vanDeemterC), [state.flowVelocity_reduced, state.vanDeemterA, state.vanDeemterB, state.vanDeemterC]);

  // Layer 6
  state.HETP = useMemo(() => chromaCore.calcHeightEquivalentTheoreticalPlate(state.reducedPlateHeight, state.particleSize), [state.reducedPlateHeight, state.particleSize]);

  // Layer 7
  state.theoreticalPlateNumber = useMemo(() => chromaCore.calcTheoreticalPlateNumber(state.length, state.HETP), [state.length, state.HETP]);

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
        <input id="resetBtn" type="button" value="Reset" onclick="resetMenus()" />
			</div>
      <div id="header">
        <div>
					<a href="../about"><input class="title_button" type="button" value="About" /></a>
					<a href="../whats_new"><input class="title_button" type="button" value="What's New" /></a>
				</div>
				<div>
					<a href="../instructor_resources"><input id="instructor_resources_btn" class="title_button" type="button" value="Instructor Resources" /></a>
				</div>
				<div>
					<input class="export_button" type="button" value="Export Chromatogram" onclick="logExportFileData_Full()" />
					<input class="export_button" type="button" value="Export Selected Compound" onclick="logExportFileData_Selected()" />
				</div>
				<span id="versionDisplay">Version:<br />v{process.env.REACT_APP_VERSION}</span>
      </div>
      <div id="params">
        <Menu title='Manage Compounds'>
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
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </Menu>
        <Menu title='General Properties'>
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
