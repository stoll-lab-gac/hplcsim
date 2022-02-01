<?php
	$local_root = 'http://' . $_SERVER['SERVER_NAME'];	
	$selected_tab = 5;
	$isHPLCSim = "4.0.0";
	$tab_title = 'HPLC Simulator '.$isHPLCSim;
	include($_SERVER['DOCUMENT_ROOT']. '/scaffold/header.php');
?>
<link rel="stylesheet" type="text/css" href="sim_css.css">
<script src="http://d3js.org/d3.v4.min.js"></script>
<script src="/scaffold/d3.min.js"></script>
<script type="text/javascript" src="simulator.js"></script>
					<main>
						<div id="content" onclick="isMouseOverDropdownMenu();">
							<div id="header_title">
								<div id="title" style="grid-area: left;">HPLC Simulator</div>
								<input style="grid-area: right; width: 50px; margin-right: 30px;" type="button" value="Reset" onclick="resetMenus()">
							</div>
							<div id="header">
								<div>
									<a href="../about"><input class="title_button" type="button" value="About"></a>
									<a href="../whats_new"><input class="title_button" type="button" value="What's New"></a>
								</div>
								<div>
									<a href="../instructor_resources"><input class="title_button" type="button" value="Instructor Resources" style="width:150px"></a>
								</div>
								<div>
									<input class="export_button" type="button" value="Export Chromatogram" onclick="logExportFileData_Full()">
									<input class="export_button" type="button" value="Export Selected Compound" onclick="logExportFileData_Selected()">
								</div>
								<span style="width:50px; height:25px; float:right; font-size: 12px;">Version:<br><?php global $isHPLCSim; echo $isHPLCSim; ?></span>
							</div>
							<div id="params">
								<!--  Manage Compounds -->
								<div class="menu_options">
									<button id="add_compound_button" class="menu_button" onclick="openMenu('manage_compound');">Manage Compounds</button>
								</div>
								<div id="manage_compound" class='menu_section' style="display: none;">
									<button style="width: calc(200% / 5);" id="custom_compound" class="compound_button" onclick="showCustom();">Custom Compound</button>
									<table id="add_custom_compound_table" style="width: 100%;" hidden>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>Name</th>
											<td colspan="2"><input type="text" class="add_custom_compound_input_text" id="add_custom_compound_name" onchange="checkCustom();"></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th style="border: 0px;"></th>
											<th>ACN</th>
											<th>MeOH</th>
										</tr>
										<tr>
											<th>lnkw int.</th>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_lnkw_int_ACN" onchange="checkCustom();"></td>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_lnkw_int_MeOH" onchange="checkCustom();"></td>
										</tr>
										<tr>
											<th>lnkw slope</th>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_lnkw_slope_ACN" onchange="checkCustom();"></td>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_lnkw_slope_MeOH" onchange="checkCustom();"></td>
										</tr>
										<tr>
											<th>S int.</th>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_s_int_ACN" onchange="checkCustom();"></td>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_s_int_MeOH" onchange="checkCustom();"></td>
										</tr>
										<tr>
											<th>S slope</th>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_s_slope_ACN" onchange="checkCustom();"></td>
											<td><input type="number" class="add_custom_compound_input_num" id="add_custom_compound_s_slope_MeOH" onchange="checkCustom();"></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<td colspan="2"><button id="add_custom_compound_submit_button" class="compound_button" onclick="addCustom();" disabled>Add Custom Compound</button></td>
										</tr>
									</table>
									<hr style="width: 98%;" />
									<table id="all_compounds_table">
										<tr colspan="2"><th>Name</th></tr>
									</table>
									<br />
								</div>
								<!-- Mobile Phase Composition -->
								<div class="menu_options">
									<button id="mobile_phase_button" class="menu_button" onclick="openMenu('mobile_phase_comp');">Mobile Phase Composition</button>
								</div>
								<div id="mobile_phase_comp" class="menu_section" style="display: none;">
									<table>
										<tr>
											<th>Solvent A</th>
											<td colspan="2">
												<select id="solvent_a" onchange="calculatePeaks()">
													<option value="water">Water</option>
												</select>
											</td>
											<td></td>
										</tr>
										<tr>
											<th>Solvent B</th>
											<td colspan="2">
												<select id="solvent_b" onchange="calculatePeaks()">
													<option value="Acetonitrile">Acetonitrile</option>
													<option value="Methanol">Methanol</option>
												</select>
											</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<td><input id="isocratic_radio" class="elution_mode" type="radio" name="elution_mode" value="Isocratic Elution Mode" onchange="calculatePeaks()" checked></td>
											<td colspan="2">Isocratic Elution Mode</td>
										</tr>
										<tr>
											<td><input id="gradient_radio" class="elution_mode" type="radio" name="elution_mode" value="Gradient Elution Mode" onchange="calculatePeaks()"></td>
											<td colspan="2">Gradient Elution Mode</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th rowspan="2">Solvent B Fraction (% v/v)</th>
											<td colspan="2">
												<input id="solvent_fraction_slider" class="slider" type="range" min="0" max="100" value="40" oninput="document.getElementById('solvent_fraction_comp').value = document.getElementById('solvent_fraction_slider').value;calculatePeaks();">
											</td>
										</tr>
										<tr>
											<td>
												<input class="number" type="number" step="any" id="solvent_fraction_comp" value="40" onchange="document.getElementById('solvent_fraction_slider').value = document.getElementById('solvent_fraction_comp').value; calculatePeaks();"/>
											</td>
											<td></td>
										</tr>
									</table>
									<table id="Gradient_Settings_Table" hidden>
										<tr>
											<th>Time (min)</th>
											<th>% B</th>
										</tr>
										<tr>
											<td><input type="number" value="0" disabled></td>
											<td><input type="number" id="Gradient_Phi_Init" value="5" onchange="calculatePeaks();"></td>
										</tr>
										<tr>
											<td><input type="number" id="Gradient_Time" value="5" onchange="calculatePeaks();"></td>
											<td><input type="number" id="Gradient_Phi_Final" value="95" onchange="calculatePeaks();"></td>
										</tr>
									</table><br>
									<input type="button" id="Gradient_Settings_Table_AddRow" value="+ Row" disabled hidden>
									<input type="button" id="Gradient_Settings_Table_RemoveRow" value="- Row" disabled hidden><br><br>
									<div id="Gradient_PreColumn_Volume">
										Pre-column volume:
										<table>
											<!--<tr>
												<td>Mixing:</td>
												<td><input type="number" id="Gradient_MixingVolume" value="200.0" onchange="calculatePeaks()"></td>
												<td>&mu;L</td>
											</tr>
											<tr>
												<td>Non-mixing:</td>
												<td><input type="number" id="Gradient_NonMixingVolume" value="200.0" onchange="calculatePeaks()"></td>
												<td>&mu;L</td>
											</tr>-->
											<tr>
												<td>Gradient Delay Volume:</td>
												<td><input type="number" id="Gradient_Delay_Volume" value="200.0" onchange="calculatePeaks()"></td>
												<td>&mu;L</td>
											</tr>
											<!--<tr>
												<td>Total dwell volume:</td>
												<td id="Gradient_PreColumn_Volume_DwellVolume"></td>
												<td>&mu;L</td>
											</tr>-->
											<tr>
												<td>Dwell time:</td>
												<td id="Gradient_PreColumn_Volume_DwellTime"></td>
												<td>min</td>
											</tr>
										</table>
									</div>
								</div>
								<!-- Chromatographic Properties -->
								<div class="menu_options">
									<button type="button" id="chromatographic_properties_button" class="menu_button" onclick="openMenu('chromatographic_properties');">Chromatographic Properties</button>
								</div>
								<div id="chromatographic_properties" class="menu_section" style="display: none;">
									<table>
										<tr>
											<th rowspan="2">Temperature</th>
											<td colspan="2">
												<input id="temperature_slider" class="slider" type="range" min="10" max="150" value="40" oninput="document.getElementById('temperature_chrom').value = document.getElementById('temperature_slider').value; calculatePeaks();">
											</td>
										</tr>
										<tr>
											<td>
												<input class="number" type="number" step="any" id="temperature_chrom" value="40" onchange="document.getElementById('temperature_slider').value = document.getElementById('temperature_chrom').value; calculatePeaks();"/>
											</td>
											<td>&deg;C</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>Injection Volume</th>
											<td><input class="number" type="number" step="any" id="injection_volume_chrom" onchange="calculatePeaks()" value="5.0"/></td>
											<td>&mu;L</td>
										</tr>
										<tr>
											<th>Flow Rate</th>
											<td><input class="number" type="number" step="any" id="flow_rate_chrom" onchange="calculatePeaks()" value="2.0"/></td>
											<td>mL/min</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th colspan="3">Flow Velocities</th>
										</tr>
										<tr>
											<th>Open Tube</th>
											<td id="open_tube_flow_velocity">Loading...</td>
											<td>cm/s</td>
										</tr>
										<tr>
											<th>Interstitial</th>
											<td id="intersitial_flow_velocity">Loading...</td>
											<td>cm/s</td>
										</tr>
										<tr>
											<th>Chromatographic</th>
											<td id="chromatographic_flow_velocity">Loading...</td>
											<td>cm/s</td>
										</tr>
										<tr>
											<th>Reduced</th>
											<td id="reduced_flow_velocity">Loading...</td>
											<td></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>H (plate height)</th>
											<td id="HETP_chrom">Loading...</td>
											<td>cm</td>
										</tr>
										<tr>
											<th>N (plate number)</th>
											<td id="theoretical_plates_chrom">Loading...</td>
											<td></td>
										</tr>
										<tr>
											<th>Backpressure</th>
											<td id="backpressure_chrom">Loading...</td>
											<td>bar</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
									</table>
								</div>
								<!-- General Properties -->
								<div class="menu_options">
									<button type="button" id="general_properties_button" class="menu_button" onclick="openMenu('general_properties');">General Properties</button>
								</div>
								<div id="general_properties" class="menu_section" style="display: none;">
									<table>
										<tr>
											<th>Eluent Viscosity</th>
											<td id="eluent_viscosity_general">Loading...</td>
											<td>cP</td>
										</tr>
										<tr>
											<th>Avg. Diffusion Coeff.</th>
											<td id="avg_diffusion_coefficient_general">0.00001223</td>
											<td>cm<sup>2</sup>/s</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>Signal Offset</th>
											<td><input class="number" type="number" step="any" id="signal_offset_general" onchange="calculatePeaks()" value="0.0"></td>
											<td>munits</td>
										</tr>
										<tr>
											<th>Noise</th>
											<td><input class="number" type="number" step="any" id="noise_general" onchange="calculatePeaks()" value="0"></td>
											<td></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<td>Time Constant</td>
											<td><input class="number" type="number" step="any" id="time_constant_general" onchange="calculatePeaks()" value="0.1" disabled></td>
											<td>s</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<td>
												<input id="auto_time_check" type="checkbox" name="auto_time_span" value="auto" onchange="enableEdit();calculatePeaks()" checked>
											</td>
											<td colspan="2">
												Automatically determine time span
											</td>
										</tr>
										<tr>
											<th>Initial Time</th>
											<td><input id="initial_time_general" class="number" type="number" step="any" onchange="calculatePeaks()" value="0.0" disabled></td>
											<td>s</td>
										</tr>
										<tr>
											<th>Final Time</th>
											<td><input id="final_time_general" class="number" type="number" step="any" onchange="calculatePeaks()" value=".72748" disabled></td>
											<td>s</td>
										</tr>
										<tr hidden>
											<td>Plot Points</td>
											<td><input id="plot_points_general" class="number" type="number" step="any" onchange="calculatePeaks()" value="6000"></td>
											<td></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>Detector Frequency</th>
											<td><input id="detectorFrequency_general" class="number" type="number" step="0.1" onchange="calculatePeaks()" value="2"></td>
											<td>Hz</td>
										</tr>
										<tr>
											<th>Data Point Count</th>
											<td id="detectorFrequency_general_numPoints">#</td>
											<td></td> <!-- values calculated -->
										</tr>
										<tr>
											<td>
												<input id="renderGraph_dots_check" type="checkbox" name="renderGraph_dots" onchange="calculatePeaks()">
											</td>
											<td colspan="2">
												Plot points on graph
											</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr hidden>
											<td>Length</td>
											<td><input class="number" type="number" step="any" id="other_length" onchange="calculatePeaks()" value="0.0"/></td>
											<td>cm</td>
										</tr>
										<tr hidden>
											<td>Inner Diameter</td>
											<td><input class="number" type="number" step="any" id="inner_diameter_other" onchange="calculatePeaks()" value="5.0"/></td>
											<td>mil</td>
										</tr>
										<tr hidden>
											<td>Volume</td>
											<td id="volume_other">0.0000</td>
											<td>&mu;L</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
									</table>
								</div>
								<!-- Column Properties -->
								<div class="menu_options">
									<button type="button" id="column_properties_button" class="menu_button" onclick="openMenu('column_properties');">Column Properties</button>
								</div>
								<div id="column_properties" class="menu_section" style="display: none;">
									<table>
										<tr>
											<th>Stationary Phase</th>
											<td colspan="2">
												<select id="stationary_phase">
													<option value="Agilent SB-C18">Agilent SB-C18</option>
												</select>
											</td>
											<td></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>Length</th>
											<td><input class="number" type="number" step="any" id="length_column" value="100.0" onchange="calculatePeaks()"></td>
											<td>mm</td>
										</tr>
										<tr>
											<th>Inner Diameter</th>
											<td><input class="number" type="number" step="any" id="inner_diameter_column" value="4.6" onchange="calculatePeaks()"></td>
											<td>mm</td>
										</tr>
										<tr>
											<th>Particle Size</th>
											<td><input class="number" type="number" step="any" id="particle_size_column" value="3.0" onchange="calculatePeaks()"></td>
											<td>&mu;m</td>
										</tr>
										<tr>
											<th>Interparticle porosity</th>
											<td><input class="number" type="number" step="any" id="interparticle_porosity_column" value="0.4" onchange="calculatePeaks()"></td>
											<td></td>
										</tr>
										<tr>
											<th>Intraparticle porosity</th>
											<td><input class="number" type="number" step="any" id="intraparticle_porosity_column" value="0.4" onchange="calculatePeaks()"></td>
											<td></td>
										</tr>
										<tr>
											<th>Total Porosity</th>
											<td id="total_porosity_column">Loading...</td>
											<td></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th>Void Volume</th>
											<td id="void_volume_column">Loading...</td>
											<td>mL</td>
										</tr>
										<tr>
											<th>Void Time</th>
											<td id="void_time_column">Loading...</td>
											<td>s</td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
										<tr>
											<th colspan="3">VanDeemter Parameters</th>
										</tr>
										<tr>
											<th>A</th>
											<td><input class="number" type="number" step="any" id="A_column" onchange="calculatePeaks()" value="1.0"></td>
											<td></td>
										</tr>
										<tr>
											<th>B</th>
											<td><input class="number" type="number" step="any" id="B_column" onchange="calculatePeaks()" value="5.0"></td>
											<td></td>
										</tr>
										<tr>
											<th>C</th>
											<td><input class="number" type="number" step="any" id="C_column" onchange="calculatePeaks()" value="0.05"></td>
											<td></td>
										</tr>
										<tr>
											<th>Reduced plate height</th>
											<td id="reduced_plate_height_column">Loading...</td>
											<td></td>
										</tr>
										<tr><td colspan="3"><br /></td></tr>
									</table>
								</div>
							</div>
							<div id="graph">
								<!--<svg id="graph_svg" width="100%" height="100%"></svg>-->
								<!--<svg id="graph_svg"></svg>-->
							</div>
							<div id="tableDiv">
								<table id="headerTable">
									<tr>
										<th>Compound</th>
										<th id="headerTable_k">k</th>
										<th>t<sub>R</sub> (min)</th>
										<th>&#963; (s)</th>
										<th>k<sub>w</sub></th>
										<th>S</th>
									</tr>
								</table>
								<div id="scrollTable">
									<table id="dataTable">
									</table>
								</div>
							</div>
						</div>
					</main>
	<script>
		document.onload = load();
		//document.onload = openMenu_ALL();
		document.onload = setLanguage();
		document.onload = applyHighlightCode();
		//document.onload = openMenu('general_properties');
		//document.onload = openMenu('chromatographic_properties');
		
		//console.log(document.getElementById('content').clientWidth);
		//console.log(window.innerWidth);
		//console.log((window.innerWidth - document.getElementById('content').clientWidth)/2);
		
		window.onclick = function(event) {
		  if (!event.target.matches('.dropbutton')) {
		    var dropdowns = document.getElementsByClassName("dropdown-content");
		    var i;
		    for (i = 0; i < dropdowns.length; i++) {
		      var openDropdown = dropdowns[i];
		      if (openDropdown.classList.contains('show')) {
		      	var div = openDropdown.id.replace("dropdown", "switch");
		      	var arrow = document.getElementById(div).innerHTML.charCodeAt();
		      	if (arrow == "9650") {
		      		document.getElementById(div).innerHTML = "&#9660;";
		      	}
		        openDropdown.classList.remove('show');
		      }
		    }
		  }
		}
		
		function applyHighlightCode(){
		$("#dataTable tr").click(function() {
			var selected = $(this).hasClass("highlight");
			$("#dataTable tbody tr").removeClass("highlight");
			$("#dataTable").removeClass();
			if(!selected){
				$(this).addClass("highlight");
				$('#dataTable').addClass($(this).attr("id"));
			}
			calculatePeaks();
		});
		}
		
		function switchToTab(tab){
		  if(tab == "about"){
		    document.getElementById("about").hidden = false;
			document.getElementById("content").hidden = true;
		  } else if(tab == "main"){
		    document.getElementById("about").hidden = true;
			document.getElementById("content").hidden = false;
		  }
		}
		
		function updateDebugLog(){
			var master = document.getElementById("showDebuggingLog");
			if(master.checked == true){
				document.getElementById("debuggingLog").hidden = false;
			} else {
				document.getElementById("debuggingLog").hidden = true;
				document.getElementById("showDebuggingLog_Loading").checked = false;
				document.getElementById("showDebuggingLog_Other").checked = false;
			}
		}
		
		function setDebugLog(){
			var masterOne = document.getElementById("showDebuggingLog_Loading");
			var masterTwo = document.getElementById("showDebuggingLog_Other");
			if(masterOne.checked == true){
				document.getElementById("debuggingLog_Loading").hidden = false;
			} else {
				document.getElementById("debuggingLog_Loading").hidden = true;
			}
			if(masterTwo.checked == true){
				document.getElementById("debuggingLog_Other").hidden = false;
			} else {
				document.getElementById("debuggingLog_Other").hidden = true;
			}
		}
	</script>
<?php
	include($_SERVER['DOCUMENT_ROOT'].'/scaffold/footer.php');
?>