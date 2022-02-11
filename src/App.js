//import { useCallback } from 'react';
import { CollapsableDiv } from './CollapsableDiv';
import { MenuMobilePhase } from './MenuMobilePhase';

import { useCallback } from 'react';

function App({state, dispatch}) {

  function handleInputChange(name, value, dimension) {
    console.log(`${name}: ${value}`);
    let updatedCondition = {};
    switch(name) {
      // mobile phase
      case 'solvent-B':
        updatedCondition = {mobileType: value};
        break;
      case 'phi-sample':
        updatedCondition = {phiSample: value};
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
      case 'isocratic-radio':
        if(value !== 'on') return;
        updatedCondition = {
          useGradient: false,
          phiFinal: dimension === 1 ? state.firstDimInputs.phi0 : state.secondDimInputs.phi0,
          gradientTime: 0
        };
        break;
      case 'gradient-radio':
        if(value !== 'on') return;
        updatedCondition = {
          useGradient: true,
          phiFinal: dimension === 1 ? state.firstDimInputs.phi0 : state.secondDimInputs.phi0,
          gradientTime: 5
        };
        break;
      // stationary phase
      case 'selected-column':
        updatedCondition = {selectedColumn: value}
        break;
      case 'length':
        updatedCondition = {L: value}
        break;
      case 'diameter':
        updatedCondition = {rc: value}
        break;
      case 'particle-size':
        updatedCondition = {particleSize: value}
        break;
      case 'epsiloni':
        updatedCondition = {epsiloni: value}
        break;
      case 'epsilone':
        updatedCondition = {epsilone: value}
        break;
      // chroma parameters
      case 'flow-rate':
        updatedCondition = {flowRate: value}
        break;
      case 'injection-volume':
        updatedCondition = {injectionVolume: value}
        break;
      case 'delay-vol-inj':
        updatedCondition = {delayVolFromInj: value}
        break;
      case 'delay-vol-col':
        updatedCondition = {delayVolToCol: value}
        break;
      
      default:
        throw Error(`unhandled input change ${name}`);
    }
    if(dimension === 1)
      dispatch({type: 'edit-first-inputs', payload: updatedCondition});
    else if(dimension === 2)
      dispatch({type: 'edit-second-inputs', payload: updatedCondition});
    else throw Error(`unknown dimension ${dimension}`);
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
              solventBs={['ACN', 'MeOH']}
              selectedSolventB={0}
              onChange={(name, value) => handleInputChange(name, value, 1)}
            />
          </fieldset>
        </CollapsableDiv>
        <CollapsableDiv title='Chromatographic Properties'>
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
}

export default App;
