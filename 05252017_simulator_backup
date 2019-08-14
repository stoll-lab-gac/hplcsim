function show(id) {
	var arrow = document.getElementById(id + "_switch").innerHTML.charCodeAt();
	var classname = document.getElementById(id+"_dropdown").className;
	if (arrow == "9660") {
		document.getElementById(id + "_switch").innerHTML = "&#9650;";
		document.getElementById(id+"_dropdown").className = classname+"_show";
	} else {
		document.getElementById(id + "_switch").innerHTML = "&#9660;";
		document.getElementById(id+"_dropdown").className = classname.replace("_show", "");
	}
}

function enableEdit() {
	var check = document.getElementById("auto_time_check").checked;
	if (check) {
		document.getElementById("initial_time_general").disabled = true;
		document.getElementById("final_time_general").disabled = true;
	} else {
		document.getElementById("initial_time_general").disabled = false;
		document.getElementById("final_time_general").disabled = false;
	}
}

function openMenu(id) {
	var dropdowns = document.getElementsByClassName("menu_section");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
	  var openMenu = dropdowns[i];
	  if (openMenu.classList.contains('show')) {
	  	if (openMenu != document.getElementById(id)){
	  		openMenu.classList.remove('show');
	  	}
	  }
	}
	document.getElementById(id).classList.toggle("show");
}

function select_option(selected, menu) {
	document.getElementById(menu + "_text").innerHTML = selected;
}

function loadSlider(id) {
	    var margin = {
	          top: 0,
	          right: 15,
	          bottom: 0,
	          left: 15
	      },
	      width = 230 - margin.left - margin.right,
	      height = 75 - margin.top - margin.bottom;

	var type;
	if (id == "solvent_b_slider") {
		type = 100;
	} else {
		type = 150;
	}

	  var x = d3.scaleLinear()
	  	.domain([0, type])
	    .range([0, width]);

	var svg = d3.select("#"+id).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  var xAxis = d3.axisBottom().scale(x).ticks(4);
	  var line = d3.line()
	    .x(function(d) {
	        return x(d.q);
	    })

	svg.append("g")
		 	.attr("class", "x axis")
	    .attr("transform", "translate(0," + height * .7 + ")")
	    .call(xAxis);
	
}

function renderGraph (data1) {
	var data = data1[0]
	/*
	var csvContent = "data:text/csv;charset=utf-8,";
	for (i = 0; i < data.length; i++) {
		 csvContent += data[i].t + "," + data[i].Ct + "\n";
	}

	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
	*/
	
	var svg = d3.select("#graph_svg"),
	    margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 700 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom,
	    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleLinear()
	    .rangeRound([0, width]);

	var y = d3.scaleLinear()
	    .rangeRound([height, 0]);

	var line = d3.line()
		.curve(d3.curveBasis)
	    .x(function(d) { return x(d.t); })
	    .y(function(d) { return y(d.Ct); });

	x.domain(d3.extent(data, function(d) { return d.t; }));
	y.domain(d3.extent(data, function(d) { return d.Ct; }));

	g.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(x))
	  .append("text")
	    .attr("fill", "#000")
	    .attr("x", 6)
	    .attr("dx", "60em")
	    .attr("dy", "-0.55em")
	    .attr("text-anchor", "middle")
	    .text("time (min)");

	g.append("g")
	    .call(d3.axisLeft(y))
	  .append("text")
	    .attr("fill", "#000")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", "0.71em")
	    .attr("text-anchor", "end")
	    .text("Signal (micromoles/liter)");

	//for (i = 0; i < data.length; i++) {
		g.append("path")
	    .datum(data)
	    .attr("fill", "none")
	    .attr("stroke", "steelblue")
	    .attr("stroke-linejoin", "round")
	    .attr("stroke-linecap", "round")
	    .attr("stroke-width", 1.5)
	    .attr("d", line);
	//}
}

/* all calculations */
/*
//porosity
function interparticlePorosity(Ve, V) {
	//Ve = volume of eluent between particles
	//V = volume of empty column
	var Ee = Ve/V;
	return Ee;
}

function intraparticlePorosity(Vp, Vl) {
	//Vl = eluent acessible volume w/ in particles
	//Vp = total volume of stationary phase particles
	var El = Vl/Vp;
	return El;
}
*/

function totalPorosity(Ee, El) {
	//Ee = interparticle porosity
	//El = intraparticle porosity
	var Et = Ee + El*(1-Ee);
	return Et;
}

//void stuff
function voidVolume (Et, d, L) {
	//d = column diameter
	//L = column length
	//Et = total porosity
	var V0 = Math.PI*Math.pow((d/10/2), 2)*(L/10)*Et;
	return V0;
}

function voidTime(V0, F) {
	//V0 = void volume
	//F = volumetric flow rate
	var t0 = V0/F*60;
	return t0;
}

//flow velocity
function openTubeFlowVelocity(F, d) {
	//F = volumetric flow rate
	//d = column diameter
	var Us = (F/60)/(Math.PI * Math.pow((d/10/2), 2));
	return Us;
}

function interstitialFlowVelocity(Us, Ee) {
	//Us = open tube flow velocity
	//Ee = interparticle velocity
	var Ue = Us/Ee;
	return Ue;
}

function chromatographicFlowVelocity(Us, Et) {
	//Us = open tube flow velocity
	//Et = total porosity
	var U = Us/Et;
	return U;
}

function reducedVelocity(Ue, dp, De) {
	//Ue = intersitial flow velocity
	//dp = diameter of stationary phase particles
	//De = diffusion coefficient of solute in eluent
	var V = Ue*(dp/10000)/De;
	return V;
}

//backpressure
function backpressure(Us, n, Ee, dp, L) {
	//Us = open tube flow velocity
	//n = viscosity
	//Ee = interparticle velocity
	//L = column length
	var deltaP = 180*(Us*n*L*Math.pow((1-Ee),2))/(Math.pow(Ee, 3)*Math.pow(dp, 2));
	return deltaP;
}

//average analyte diffusion coefficient
function analyteDiffCoeff(T, phi, xorg, n, Vm, Morg) {
	//T = temperature in kelvin
	//xorg = solvent association parameter of organic modifier
	//Morg = molecular weight of organic modifier
	//x = solvent association parameter
	//M = molecular weight of solvent
	//n = viscosity
	//Vm = molar volume of solute
	var M = phi*(Morg - 18) + 18;
	var x = ((1-phi) * (2.6-xorg)) + xorg;
	var De = 0.000000074*(T + 273.15)*Math.pow((x*M), 0.5)/(n*Math.pow(Vm, 0.6));
	return De;
}

//Reduced plate height
function reducedPlateHeight(A, B, C, v) {
	//A, B, C = van Deemter parameters
	//v = reduced flow velocity
	var h = A + B/v + C*v;
	return h;
}

function theoreticalPlates(h, dP, L) {
	//h = reduced plate height
	//dP = diameter of stationary phase particles
	//L = column length
	//HETP = height equivalent to a theoretical plate
	var HETP = h*(dP/10000);
	var N = (L/10)/HETP;
	return [HETP, N];
}

//Isocratic elution mode

//isocratic retention factors
function isocraticRetentionFactor(T, A, B, a, b, phi) {
	//kw = isocratic retention factor of the compound in water
	//S = solvent sensitivity factor of the solute
	//T = temperature in celcius
	var S = A + B*T;
	var kw = Math.pow(10, (a+b*T))
	var k = Math.pow(10, (Math.log(kw) - S*phi));
	return k;
}

//retention time
function retentionTime(t0, k) {
	//t0 = void time
	//k = isocratic retention factor
	var tR = t0/(1+k);
	return tR;
}

//isocratic peak width
function isocraticPeakWidth(tR, N, Vinj, F, tau) {
	//tR = retention time of each compound
	//N = theoretical plate number
	//Vinj = injection volume
	//F = volumetric flow rate
	//tau = detector line constant
	var omegaT = Math.pow(Math.pow(tR/Math.pow(N, 1/2), 2) + Math.pow(tau, 2) + 1/12*Math.pow(Vinj/F, 2), 1/2);
	return omegaT;
}

function tubingVolume(length, diameter) {
    var volume = (length / 100) * (Math.PI * Math.pow((diameter * 0.0000254) / 2, 2) * 1000000000);
    return volume;
}

function isocraticRetentionFactor(compoundName, solvent) {
	var calcKACN = {
		"N-benzyl formamide" : [0.769127502, -0.003731062],
		"benzylalcohol" : [0.870975072,	-0.00364158],
		"phenol" : [1.222652803, -0.007051397],
		"3-phenyl propanol" : [1.617423196, -0.005175387],
		"p-chlorophenol" : [2.006666967, -0.009910541],
		"acetopheonone" : [1.615282733, -0.006113393],
		"benzonitrile" : [1.759520682, -0.008118482],
		"nitrobenzene" : [2.074051745, -0.009433757],
		"methyl benzoate" : [2.116364506, -0.0077323],
		"anisole" : [2.2070705, -0.008804318],
		"benzene" : [2.208069224, -0.008529343],
		"p-nitrotoluene" : [2.565390235, -0.010705359],
		"p-nitrobenzyl chloride" : [2.804538425, -0.012956701],
		"toluene" : [2.738254098, -0.010041886],
		"benzophenone" : [3.087847385, -0.011069419],
		"bromobenzene" : [2.941762836, -0.011273051],
		"naphthalene" : [3.296888486, -0.012795634],
		"ethylbenzene" : [3.278713293, -0.011878845],
		"p-xylene" : [3.257874421, -0.011333502],
		"p-dichlorobenzene" : [3.351026587, -0.01247399],
		"propylbenzene" : [3.811104371, -0.012995521],
		"n-butylbenzene" : [4.268938682, -0.013247488],
	}

	var calcKMeOH = {
		"N-benzyl formamide" : [1.540839577, -0.008929697],
		"benzylalcohol" : [1.643378791, -0.008878706],
		"phenol" : [1.714002346, -0.010465041],
		"3-phenyl propanol" : [2.68259933, -0.012422481],
		"p-chlorophenol" : [2.752714402, -0.015141687],
		"acetopheonone" : [2.098172436, -0.009256615],
		"benzonitrile" : [1.995680909, -0.009408557],
		"nitrobenzene" : [2.277842706, -0.01086377],
		"methyl benzoate" : [2.754815913, -0.011887763],
		"anisole" : [2.587044692, -0.011362318],
		"benzene" : [2.574300441, -0.010915393],
		"p-nitrotoluene" : [2.900253547, -0.012887248],
		"p-nitrobenzyl chloride" : [3.063452817, -0.014804187],
		"toluene" : [3.230991673, -0.013099858],
		"benzophenone" : [3.814708, -0.015609851],
		"bromobenzene" : [3.539527614, -0.015203809],
		"naphthalene" : [3.996276656, -0.017658165],
		"ethylbenzene" : [3.91507907, -0.016025676],
		"p-xylene" : [3.898820055, -0.015301291],
		"p-dichlorobenzene" : [4.042717849, -0.016724835],
		"propylbenzene" : [4.572339411, -0.017710503],
		"n-butylbenzene" : [5.195286534, -0.019603702],
	}

	if (solvent == "Methanol") {
		return (calcKMeOH[compoundName]);
	} else {
		return (calcKACN[compoundName]);
	}	
}

function solventSensitivityFactor(compoundName, solvent) {
	var calcSACN = {
		"N-benzyl formamide" : [-1.950157208, 0.001962312],
		"benzylalcohol" : [-1.801193074, 0.001538701],
		"phenol" : [-2.157819856, 0.004948239],
		"3-phenyl propanol" : [-2.711627278, 0.004245094],
		"p-chlorophenol" : [-3.110178571, 0.009176534],
		"acetopheonone" : [-2.419171414, 0.004190421],
		"benzonitrile" : [-2.581132813, 0.006344149],
		"nitrobenzene" : [-2.909075892, 0.008291834],
		"methyl benzoate" : [-2.911497882, 0.006053077],
		"anisole" : [-2.941605639, 0.007554149],
		"benzene" : [-2.82653686, 0.007114051],
		"p-nitrotoluene" : [-3.433694873, 0.009864271],
		"p-nitrobenzyl chloride" : [-3.866695802, 0.012986999],
		"toluene" : [-3.393491059, 0.009005662],
		"benzophenone" : [-4.064139779, 0.010362441],
		"bromobenzene" : [-3.651869929, 0.010618543],
		"naphthalene" : [-4.112896456, 0.012596045],
		"ethylbenzene" : [-4.00434081, 0.01150122],
		"p-xylene" : [-3.911260542, 0.01022372],
		"p-dichlorobenzene" : [-4.06721018, 0.011894773],
		"propylbenzene" : [-4.521888293, 0.012122284],
		"n-butylbenzene" : [-4.916062651, 0.011228978],
	}

	var calcSMeOH = {
		"N-benzyl formamide" : [-2.693811682, 0.00765532],
		"benzylalcohol" : [-2.603915073, 0.007510281],
		"phenol" : [-2.668849687, 0.009039869],
		"3-phenyl propanol" : [-3.54429381, 0.010666582],
		"p-chlorophenol" : [-3.575981618, 0.013318826],
		"acetopheonone" : [-2.981031723, 0.00868429],
		"benzonitrile" : [-2.971312206, 0.009056849],
		"nitrobenzene" : [-2.982884732, 0.009470827],
		"methyl benzoate" : [-3.478030789, 0.010738983],
		"anisole" : [-3.103431889, 0.009681809],
		"benzene" : [-3.003558355, 0.009506717],
		"p-nitrotoluene" : [-3.522153507, 0.011004872],
		"p-nitrobenzyl chloride" : [-3.80208134, 0.013294572],
		"toluene" : [-3.54707318, 0.010958917],
		"benzophenone" : [-4.572059492, 0.014479928],
		"bromobenzene" : [-3.937991714, 0.013730549],
		"naphthalene" : [-4.36460133, 0.015853326],
		"ethylbenzene" : [-4.212581658, 0.014007133],
		"p-xylene" : [-4.091577867, 0.012295396],
		"p-dichlorobenzene" : [-4.384667429, 0.014898054],
		"propylbenzene" : [-4.77660703, 0.014762593],
		"n-butylbenzene" : [-5.293527636, 0.0159448],
	}

	if (solvent == "Methanol") {
		return (calcSMeOH[compoundName]);
	} else {
		return (calcSACN[compoundName]);
	}
}

function getMolarVolume(compound) {
	var MolarVolumeArray = {
			"N-benzyl formamide" : 156.1,
			"benzylalcohol" : 125.6,
			"phenol" : 103.4,
			"3-phenyl propanol" : 170,
			"acetopheonone" : 140.4,
			"benzonitrile" : 122.7,
			"p-chlorophenol" : 124.3,
			"nitrobenzene" : 122.7,
			"methyl benzoate" : 151.2,
			"anisole" : 128.1,
			"benzene" : 96,
			"p-nitrotoluene" : 144.9,
			"p-nitrobenzyl chloride" : 165.8,
			"toluene" : 118.2,
			"benzophenone" : 206.8,
			"bromobenzene" : 119.3,
			"naphthalene" : 147.6,
			"ethylbenzene" : 140.4,
			"p-xylene" : 140.4,
			"p-dichlorobenzene" : 137.8,
			"propylbenzene" : 162.6,
			"n-butylbenzene" : 184.8
		};	

	return MolarVolumeArray[compound];
}

function calctR(t0, T, phi, compoundName, solvent) {
	var Tconst = isocraticRetentionFactor(compoundName, solvent);
	var Sconst = solventSensitivityFactor(compoundName, solvent);
	var S = -1*(Sconst[0] + Sconst[1]*T);
	var logkw = Tconst[0] + Tconst[1]*T;
	var k = Math.pow(10, (logkw - S*phi));
	//check with Dwight, should be division?
	return t0/(1+k);
}

function isocraticSigma (tR, N, tau, Vinj, F, UsT) {
	var t1 = Math.pow((tR / Math.pow(N, 1/2)), 2);
	var t2 = Math.pow(tau, 2);
	var t3 = (1/12)*Math.pow((Vinj/1000) / (F/60), 2);
	return Math.pow(t1 + t2 + t3 + UsT, 1/2);
}

function tubingTimeBroadening(volume, diameter, length, flowRate, diffusionCoefficient) {
	var tubingRadius = (diameter*0.000254)/2;
	var tubingOpenTubeVelocity = (flowRate / 60) / (Math.PI * Math.pow(tubingRadius, 2));
	var tubingZBroadening = (2 * diffusionCoefficient * length / tubingOpenTubeVelocity) + ((Math.pow(tubingRadius, 2) * length * tubingOpenTubeVelocity) / (24 * diffusionCoefficient));
	var tubingVolumeBroadening = Math.pow(Math.sqrt(tubingZBroadening) * Math.PI * Math.pow(tubingRadius, 2), 2);
	var tubingTimeBroadening = Math.pow((Math.sqrt(tubingVolumeBroadening) / flowRate) * 60, 2);
	return tubingTimeBroadening;
}

function isocraticElutionMode(t0, T, phi, N, tau, Vinj, F, solvent, compoundList, v, d, l, De) {
	var compoundName = compoundList;
	var M = [50.0, 30.0, 40.0];

	var graphData = [];

	var tF = parseFloat(document.getElementById("final_time_general").value);
	var step = parseFloat((tF/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));

	for (i = 0; i < compoundName.length; i++) {
		var cmpdData = [];

		var tR = calctR(t0, T, phi, compoundName[i], solvent);
		var UsT = tubingTimeBroadening(v, d, l, tR, De);
		var sigma = isocraticSigma(tR, N, tau, Vinj, F, UsT);
		var W = (Vinj/1000000)*(M[i]);
		var t = 0;
		var j = 0;
		while (t <= tF) {
			var Ct = (W/1000000)/(2*Math.pow((Math.PI), 0.5)*sigma*(F/(60*1000)))*Math.exp(-Math.pow(((t-tR)/(2*sigma)), 2));
			cmpdData[j] = {
				"t" : t,
				"Ct" : Ct
			}
			t += step;
			j++;
		}
		graphData[i] = cmpdData;
	}
	return graphData;
}

//consolidate calculations
function calculatePeaks() {
	var mode = "isocratic";
	var compoundList = ["ethylbenzene", "p-dichlorobenzene", "acetopheonone"];
	var solvent = document.getElementById("solvent_b_text").innerHTML;

	var iD = parseFloat(document.getElementById("inner_diameter_other").value);	//inner diameter
	var l = parseFloat(document.getElementById("other_length").value);		//post column tubing
	var v = tubingVolume(l, iD);
	document.getElementById("volume_other").innerHTML = v.toFixed(5);

	var d = parseFloat(document.getElementById('inner_diameter_column').value);	//*column diameter
	var L = parseFloat(document.getElementById('length_column').value);	//*column length
	var Vinj = parseFloat(document.getElementById('injection_volume_chrom').value);	
	var fR = parseFloat(document.getElementById("flow_rate_chrom").value);

	var Ee = parseFloat(document.getElementById('interparticle_porosity_column').value); //interparticlePorosity(Ve, V);	//fraction of volume in column between stationary phase particles
	var El = parseFloat(document.getElementById('intraparticle_porosity_column').value); //intraparticlePorosity(Vp, Vl);	//fraction of stationary phase particles occupied by eluent
	var Et = totalPorosity(Ee, El);			//total porosity

	var V0 = voidVolume (Et, d, L);	//void volume
	document.getElementById("void_volume_column").value = V0.toFixed(5);
	var t0 = voidTime(V0, fR);		//void time
	document.getElementById("void_time_column").value = t0.toFixed(5);

	var dP = parseFloat(document.getElementById('particle_size_column').value);	//diameter of stationary phase particles

	var T = parseFloat(document.getElementById('temperature_chrom').value);		//temperature
	var phi = parseFloat(document.getElementById('solvent_fraction_comp').value) / 100;		//volume fraction of organic modifier
	var n = calcPressureSimulator(L, d * 1000, phi, T, fR);	//viscosity

	var xorg = ((1 - phi) * (2.6 - 1.9)) + 1.9;	//solvent association parameter of the organic modifier
	
	var Morg;	//molecular weight of the organic modifier
	if (solvent == "Methanol") {
		Morg = 32;
	} else {
		Morg = 41;
	}
	Morg = (phi * (Morg = 18)) +18;

	var Vm = 0;		//molar volume of the solute
	for (i = 0; i < compoundList.length; i++) {
		Vm += getMolarVolume(compoundList[i]);
	}
	Vm = Vm / compoundList.length;

	var De = analyteDiffCoeff(T, phi, xorg, n, Vm, Morg);	//average analyte diffusion coefficient
	document.getElementById("avg_diffusion_coefficient_general").innerHTML = De.toExponential(4);

	var Us = openTubeFlowVelocity(fR, d);			//open tube flow velocity
	var Ue = interstitialFlowVelocity(Us, Ee);		//interstitial flow velocity
	var U = chromatographicFlowVelocity(Us, Et);	//chromatographic flow velocity
	var V = reducedVelocity(Ue, dP, De);			//reduced velocity
	document.getElementById("open_tube_flow_velocity").innerHTML = Us.toFixed(5);
	document.getElementById("intersitial_flow_velocity").innerHTML = Ue.toFixed(5);
	document.getElementById("chromatographic_flow_velocity").innerHTML = U.toFixed(5);
	document.getElementById("reduced_flow_velocity").innerHTML = V.toFixed(5);

	var deltaP = backpressure(Us, n, Ee, dP, L);		//backpressure

	var A = parseFloat(document.getElementById("A_column").value);	//*van Deemter coefficient
	var B = parseFloat(document.getElementById("B_column").value);	//*van Deemter coefficient
	var C = parseFloat(document.getElementById("C_column").value);	//*van Deemter coefficient

	var h = reducedPlateHeight(A, B, C, V);	//reduced plate height
	document.getElementById("reduced_plate_height_column").innerHTML = parseFloat(h).toFixed(5);
	var NHETP = theoreticalPlates(h, dP, L);	//theoretical plate number
	document.getElementById("HEPT_chrom").innerHTML = NHETP[0].toExponential(4);
	var N = NHETP[1];

	var tau = parseFloat(document.getElementById("time_constant_general").value);

	if (mode == "isocratic") {
		data = isocraticElutionMode(t0, T, phi, N, tau, Vinj, fR, solvent, compoundList, v, d, l, De)
	} else {

	}

	renderGraph(data);

}

function load() {
	var sliders = document.getElementsByClassName("slider_ticks");
	var i;
	for (i = 0; i < sliders.length; i++) {
		loadSlider(sliders[i].id);
	}
	calculatePeaks();
}