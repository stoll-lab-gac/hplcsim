function conv_ParticleSize(particleSize) {
	//this function converts microns to centimeters
	return particleSize / 10000;
}

function calculateLength(particleSize) {
	//this function calculates the v value associated with 
	//set values of velocity, then uses v to find h, which
	//is used to find H. 
	//V = (velocity * particleSize) / (0.00001)
	//h = 1+(5/V)+(0.05*V)
	//H = h * particleSize
	var plateHeights = []
	var Ue_values = [0.01,0.1,0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3];

	for (var i = 0; i < Ue_values.length; i++) {
		var V = (Ue_values[i] * particleSize) / 0.00001 ;
		var h = (1 + (5 / V) + (0.05 * V));
		plateHeights[i] = h * particleSize;

	}

	//this part of the function returns the value of the length
	//corresponding to constant plate number values
	//Length = plateNumber * plateHeight
	var Plate_Length = [];
	var plateNumbers = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,15000,20000,25000,30000];
	for (var i = 0; i < plateNumbers.length; i++){
		Plate_Length[i] = []
		for (var j = 0; j < plateHeights.length; j++){
			Plate_Length[i][j] = (plateNumbers[i] * plateHeights[j]);
		}
	}

	//this part solves for the length values corresponding
	//with each Ue (velocity) value at 600 and 1000 bar pressure
	//Length = (Pressure * particleSize) / (500 * Ue)

	var Ue_values = [0.01,0.1,0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3];
	var L_600P = [];
	var L_1000P = [];

	for (var i = 0; i < Ue_values.length; i++) {
		L_600P[i] = (600 * particleSize * particleSize * 10000 * 10000) / (500 * Ue_values[i]);
		L_1000P[i] = (1000 * particleSize * particleSize * 10000 * 10000) / (500 * Ue_values[i]);
	}
	
	//this will produce constant time lines

	var Ue_values = [0.01,0.1,0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3];
	
		var Length_t_1s = []
		var Length_t_2s = []
		var Length_t_5s = []
		var Length_t_10s = []
		var Length_t_20s = []
		var Length_t_40s = []
		var Length_t_80s = []
	
	for (var i = 0; i < Ue_values.length; i++) {
		Length_t_1s[i] = Ue_values[i];
		Length_t_2s[i] = 2 * Ue_values[i];
		Length_t_5s[i] = 5 * Ue_values[i];
		Length_t_10s[i] = 10 * Ue_values[i];
		Length_t_20s[i] = 20 * Ue_values[i];
		Length_t_40s[i] = 40 * Ue_values[i];
		Length_t_80s[i] = 80 * Ue_values[i];
	}

	var Time_Lengths = [Length_t_1s,Length_t_2s,Length_t_5s,Length_t_10s,Length_t_20s,Length_t_40s,Length_t_80s];

	//var x_values = Ue_values;
	//var y_values = [Length_from_N,Pressure_Lengths_A,Pressure_Lengths_B,Time_Lengths]

	var hex = ["#FF0000","#FF5900","#FF7100","#FFB100","#D7EC0C","#58D76E","#58D76E","#58D76E","#58D76E","#58D76E","#1646B5","#9508B3","#CC061D","#CC061D"]
	var traces = []
	for (var i = 0; i < plateNumbers.length; i++) {
		traces[i] = {
			x: Ue_values,
			y: Plate_Length[i],
			mode: 'lines',
			line: {
				color: hex[i],
				dash: 'solid',
				shape: 'spline'
			},
			hoverinfo: 'none'
		}
	}
	traces[plateNumbers.length]	= {
			x: Ue_values,
			y: L_600P,
			mode: 'lines',
			line: {
				color: '#000000',
				dash: 'solid',
				shape: 'spline'
			},
			hoverinfo: 'none'
		}

	traces[plateNumbers.length + 1]	= {
			x: Ue_values,
			y: L_1000P,
			mode: 'lines',
			line: {
				color: '#000000',
				dash: 'solid',
				shape: 'spline'
			},
			hoverinfo: 'none'
		}

	for (i = 0; i < Time_Lengths.length; i++) {
		traces[plateNumbers.length + 2 + i]	= {
			x: Ue_values,
			y: Time_Lengths[i],
			mode: 'lines',
			line: {
				color: '#000000',
				dash: 'dot',
				shape: 'spline'
			},
			hoverinfo: 'none'
		}

	}

	var layout = {
  		title: 'Title of Graph',
  		xaxis: {
    		range: [0, 3],
    		autorange: false,
    		title: 'Interstitial Velocity (cm/s)'
  		},
  		yaxis: {
    		range: [0, 15],
    		autorange: false,
    		title: 'Length (cm)'
  		},
  		showlegend: false
	};

	Plotly.newPlot('graph', traces, layout)

}

function main(particleSize) {
	calculateLength(conv_ParticleSize(particleSize));
}











