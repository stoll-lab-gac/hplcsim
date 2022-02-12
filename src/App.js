//import { useCallback } from 'react';
import { CollapsableDiv } from './CollapsableDiv';
import { MenuMobilePhase } from './MenuMobilePhase';
import { MenuChromatographic } from './MenuChromatographic';

import { useCallback } from 'react';

export function App({state, dispatch}) {

  //*
  function handleInputChange(name, value) {
    console.log(`${name}: ${value}`);
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
      case 'diameter':
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

  const statusUpdater = useCallback((status) => dispatch({type: 'set-status', payload: status}), [dispatch]);

  return (
    <div id="content">
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
				<span id="versionDisplay">Version:<br />5.0.0</span>
      </div>
      <div id="params">
        <CollapsableDiv title='Manage Compounds'>
        </CollapsableDiv>
        <CollapsableDiv title='Mobile Phase Composition'>
          <fieldset>
            <MenuMobilePhase
              useGradient={state.useGradient}
              phi0={state.phi0}
              phif={state.phiFinal}
              tg={state.gradientTime}
              solventAs={['Water','Buffer, 3.2 pH']}
              solventBs={['Acetonitrile', 'Methanol']}
              selectedSolventA={state.solventA}
              selectedSolventB={state.solventB}
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </CollapsableDiv>
        <CollapsableDiv title='Chromatographic Properties'>
          <fieldset>
            <MenuChromatographic
              temperature={state.temperature}
              injectionVolume={state.injectionVolume}
              flowRate={state.flowRate}
              onChange={(name, value) => handleInputChange(name, value)}
            />
          </fieldset>
        </CollapsableDiv>
        <CollapsableDiv title='General Properties'>
        </CollapsableDiv>
        <CollapsableDiv title='Column Properties'>
        </CollapsableDiv>
      </div>
      <div id="graph">graph</div>
      <div id="tableDiv">tableDiv</div>
    </div>
  );

  //*/
}
