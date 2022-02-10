//import { useCallback } from 'react';
import { CollapsableDiv } from './CollapsableDiv';

function App({state, dispatch}) {
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
