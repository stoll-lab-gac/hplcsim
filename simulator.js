//Old Array[5, 25, 40, 15, 10, 5]
//var M = [5,6.09,7.36,8.79,10.4,12.18,14.13,16.23,18.46,20.79,23.18,25.59,27.98,30.28,32.45,34.44,36.19,37.65,38.78,39.56,39.95,39.95,39.56,38.78,37.65,36.19,34.44,32.45,30.28,27.98,25.59,23.18,20.79,
//	     18.46,16.23,14.13,12.18,10.4,8.79,7.36,6.09,5];
//var M = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];

var exportFileData_Full = "";
var exportFileData_Selected = "";
var exportFileData_SelectedCompound = "";

function logExportFileData_Full(){
	console.log(exportFileData_Full);
	
	var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(exportFileData_Full);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'FullChromatogram.csv';
    hiddenElement.click();
}
function logExportFileData_Selected(){
	if(exportFileData_Selected == ""){
		console.log("No Compound Selected!");
	} else {
		console.log(exportFileData_Selected);
		var hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(exportFileData_Selected);
		hiddenElement.target = '_blank';
		hiddenElement.download = ''+exportFileData_SelectedCompound+'.csv';
		hiddenElement.click();
	}
}

/*
// M Array of 50s
var M = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,
	50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,
	50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,
	50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
*/

/*
// Old M Array
var M = [1.15,33.50,3.33,39.69,36.91,39.62,25.09,39.57,38.55,38.98,30.16,2.66,1.76,4.77,35.56,2.98,31.02,8.43,39.02,6.72,39.78,19.60,39.19,12.06,28.60,4.29,11.40,29.86,1.06,3.21,36.55,37.02,38.24,
	38.89,39.36,2.77,38.17,1.29,39.72,1.97,15.29,21.99,16.05,39.74,15.67,1.90,35.86,39.25,34.13,33.72,5.48,39.63,9.84,27.94,34.70,38.94,36.67,32.82,3.99,0.95,2.29,39.12,26.55,37.23,38.71,1.45,8.70,
	38.80,18.40,39.65,2.13,38.76,32.58,13.10,2.47,4.60,39.09,39.22,14.54,28.27,36.79,37.87,10.76,35.71,18.80,39.73,37.43,36.15,39.55,2.87,1.40,9.55,5.11,24.33,6.95,0.88,4.94,13.45,2.57,23.17,39.45,
	39.43,31.83,0.84,1.63,1.51,27.60,35.40,21.20,37.62,20.80,34.33,11.08,3.58,22.39,2.05,28.92,24.71,32.34,39.71,27.25,38.49,17.61,12.75,39.31,39.81,30.74,3.45,33.93,2.38,1.24,37.13,3.71,26.19,39.60,
	29.24,31.30,36.29,39.70,6.07,33.28,12.40,7.18,2.21,39.39,10.14,0.81,13.81,39.80,0.91,38.31,39.47,39.53,14.91,1.57,3.85,8.17,4.14,35.06,39.67,39.66,36.42,37.79,26.90,37.95,1.69,6.28,5.67,17.22,
	33.05,39.33,35.23,34.89,10.45,1.34,34.52,21.60,20.40,39.59,39.16,9.26,39.76,23.95,23.56,37.34,8.98,19.20,16.44,39.79,38.10,4.44,1.02,7.66,36.01,11.73,30.45,37.53,38.43,31.57,5.30,14.17,20.00,38.85,
	0.78,1.20,7.91,22.78,38.37,37.71,3.09,6.50,39.05,39.75,7.42,5.87,1.83,16.83,38.03,39.51,25.46,0.75,29.55,25.83,39.50,39.28,39.41,18.01,38.60,39.77,0.98,1.11,38.66,0.72,32.09];
*/

// Old M Array + 50;
var M = [
	51.15,83.50,53.33,89.69,86.91,89.62,75.09,89.57,88.55,88.98,80.16,52.66,51.76,54.77,85.56,52.98,81.02,58.43,89.02,56.72,89.78,69.60,89.19,62.06,78.60,54.29,61.40,79.86,51.06,53.21,86.55,
	87.02,88.24,88.89,89.36,52.77,88.17,51.29,89.72,51.97,65.29,71.99,66.05,89.74,65.67,51.90,85.86,89.25,84.13,83.72,55.48,89.63,59.84,77.94,84.70,88.94,86.67,82.82,53.99,50.95,52.29,89.12,
	76.55,87.23,88.71,51.45,58.70,88.80,68.40,89.65,52.13,88.76,82.58,63.10,52.47,54.60,89.09,89.22,64.54,78.27,86.79,87.87,60.76,85.71,68.80,89.73,87.43,86.15,89.55,52.87,51.40,59.55,55.11,
	74.33,56.95,50.88,54.94,63.45,52.57,73.17,89.45,89.43,81.83,50.84,51.63,51.51,77.60,85.40,71.20,87.62,70.80,84.33,61.08,53.58,72.39,52.05,78.92,74.71,82.34,89.71,77.25,88.49,67.61,62.75,
	89.31,89.81,80.74,53.45,83.93,52.38,51.24,87.13,53.71,76.19,89.60,79.24,81.30,86.29,89.70,56.07,83.28,62.40,57.18,52.21,89.39,60.14,50.81,63.81,89.80,50.91,88.31,89.47,89.53,64.91,51.57,
	53.85,58.17,54.14,85.06,89.67,89.66,86.42,87.79,76.90,87.95,51.69,56.28,55.67,67.22,83.05,89.33,85.23,84.89,60.45,51.34,84.52,71.60,70.40,89.59,89.16,59.26,89.76,73.95,73.56,87.34,58.98,
	69.20,66.44,89.79,88.10,54.44,51.02,57.66,86.01,61.73,80.45,87.53,88.43,81.57,55.30,64.17,70.00,88.85,50.78,51.20,57.91,72.78,88.37,87.71,53.09,56.50,89.05,89.75,57.42,55.87,51.83,66.83,
	88.03,89.51,75.46,50.75,79.55,75.83,89.50,89.28,89.41,68.01,88.60,89.77,50.98,51.11,88.66,50.72,82.09
];

var M_default = [
	51.15, 83.50, 53.33, 89.69, 86.91, 89.62, 75.09, 89.57, 88.55, 88.98, 80.16, 52.66, 51.76, 54.77, 85.56, 52.98, 81.02, 58.43, 89.02, 56.72, 89.78, 69.60, 89.19, 62.06, 78.60, 54.29, 61.40, 79.86, 51.06, 53.21, 86.55,
	87.02, 88.24, 88.89, 89.36, 52.77, 88.17, 51.29, 89.72, 51.97, 65.29, 71.99, 66.05, 89.74, 65.67, 51.90, 85.86, 89.25, 84.13, 83.72, 55.48, 89.63, 59.84, 77.94, 84.70, 88.94, 86.67, 82.82, 53.99, 50.95, 52.29, 89.12,
	76.55, 87.23, 88.71, 51.45, 58.70, 88.80, 68.40, 89.65, 52.13, 88.76, 82.58, 63.10, 52.47, 54.60, 89.09, 89.22, 64.54, 78.27, 86.79, 87.87, 60.76, 85.71, 68.80, 89.73, 87.43, 86.15, 89.55, 52.87, 51.40, 59.55, 55.11,
	74.33, 56.95, 50.88, 54.94, 63.45, 52.57, 73.17, 89.45, 89.43, 81.83, 50.84, 51.63, 51.51, 77.60, 85.40, 71.20, 87.62, 70.80, 84.33, 61.08, 53.58, 72.39, 52.05, 78.92, 74.71, 82.34, 89.71, 77.25, 88.49, 67.61, 62.75,
	89.31, 89.81, 80.74, 53.45, 83.93, 52.38, 51.24, 87.13, 53.71, 76.19, 89.60, 79.24, 81.30, 86.29, 89.70, 56.07, 83.28, 62.40, 57.18, 52.21, 89.39, 60.14, 50.81, 63.81, 89.80, 50.91, 88.31, 89.47, 89.53, 64.91, 51.57,
	53.85, 58.17, 54.14, 85.06, 89.67, 89.66, 86.42, 87.79, 76.90, 87.95, 51.69, 56.28, 55.67, 67.22, 83.05, 89.33, 85.23, 84.89, 60.45, 51.34, 84.52, 71.60, 70.40, 89.59, 89.16, 59.26, 89.76, 73.95, 73.56, 87.34, 58.98,
	69.20, 66.44, 89.79, 88.10, 54.44, 51.02, 57.66, 86.01, 61.73, 80.45, 87.53, 88.43, 81.57, 55.30, 64.17, 70.00, 88.85, 50.78, 51.20, 57.91, 72.78, 88.37, 87.71, 53.09, 56.50, 89.05, 89.75, 57.42, 55.87, 51.83, 66.83,
	88.03, 89.51, 75.46, 50.75, 79.55, 75.83, 89.50, 89.28, 89.41, 68.01, 88.60, 89.77, 50.98, 51.11, 88.66, 50.72, 82.09
];

var compoundList = [
	"phenol",
	"benzonitrile",
	"p-chlorophenol",
	"acetophenone",
	"nitrobenzene"
];

var calcGradientACN_Agilent_SBC18 = {
	//"Compound Name": [ln kw intercept, ln kw slope, S intercept, S slope],
	"N-benzylformamide": [4.11763684964633, -0.00859108668819096, 5.72460154055311, -0.004518391449322835],
	"benzylalcohol": [4.295870151731668, -0.00838504826707623, 5.11516782884082, -0.0035429892224701012],
	"phenol": [7.250245913957449, -0.01623644076804236, 8.080764119773358, -0.011393740748934839],
	"3-phenylpropanol": [6.979319890216979, -0.011916768623047113, 8.913709246999934, -0.00977469046200866],
	"p-chlorophenol": [10.853767117959531, -0.022819863346957618, 12.933042037683173, -0.021129750042128245],
	"acetophenone": [8.396675806, -0.01459999476, 10.0447521, -0.01180610814],
	"benzonitrile": [9.157574281447951, -0.018693495104451376, 9.933437736260569, -0.014607943615296394],
	"nitrobenzene": [10.709052818652065, -0.021722028876511597, 11.913552746640644, -0.019092652251069955],
	"methylbenzoate": [9.736348393086557, -0.017804279807352354, 10.511061065621254, -0.013937724488517097],
	"anisole": [10.619453288436164, -0.02027269140388422, 11.524487520896395, -0.017394070021991195],
	"benzene": [10.44880732516308, -0.019639538882926806, 10.982731964464346, -0.016380707763880318],
	"p-nitrotoluene": [12.640177028747386, -0.024650000794250664, 14.110519191618183, -0.0227133244127602],
	"p-nitrobenzylchloride": [14.606820002699553, -0.029833906766707965, 17.071583915484293, -0.029903671253214692],
	"toluene": [12.620918352164775, -0.023122296489957304, 13.477923070957644, -0.020736302933891882],
	"benzophenone": [14.072155096078763, -0.025488280205364526, 15.875496292470416, -0.023860401325815152],
	"bromobenzene": [13.8638573956341, -0.02595715959089104, 15.087285684478196, -0.024450098570551106],
	"naphthalene": [15.63919469704874, -0.029463036485079655, 17.392590529166682, -0.029003464987497615],
	"ethylbenzene": [15.020728922213326, -0.027352050407686294, 16.45404067792924, -0.026482537881368524],
	"p-xylene": [14.62975194741648, -0.02609635317889557, 15.43623038724321, -0.023540985427180604],
	"p-dichlorobenzene": [15.561553538993556, -0.028722422384016594, 16.846328292929112, -0.027388726937070666],
	"propylbenzene": [16.948939478253603, -0.029923292573128975, 18.036356827939073, -0.027912591078851634],
	"n-butylbenzene": [18.161616836431968, -0.030503467927069025, 18.38213053057011, -0.025855676201241597],
	"diethylformamide": [4.02358028702793, -0.00593748531320223, 11.4679326302866, -0.0123072072560952],
	"methylparaben": [11.4111369378345, -0.0228188521038433, 22.526811115202, -0.0366649524457222],
	"ethylparaben": [11.1898101697198, -0.0216321215335735, 17.0359605776335, -0.0269714258248205],
	"propylparaben": [11.0596971062141, -0.020133642293226, 14.1858776754127, -0.0200270391872307],
	"butylparaben": [12.1341303147334, -0.0211029280202196, 14.026391259171, -0.018467385725791],
	"acetanilide": [6.99233786611718, -0.0139326286293655, 10.9138048720276, -0.014891861475092],
	"propiophenone": [9.65102894789204, -0.015987532340238,  10.7187934245166, -0.012507833154392],
	"butyrophenone": [12.0552481653964, -0.0199003704613709, 14.7871477768746, -0.0201212808687109],
	"valerophenone": [11.2311772882595, -0.0170491283515628, 10.7488618780099, -0.0107369614592026],
	"hexanophenone": [13.0781795720922, -0.0197554842203633, 12.3839302756758, -0.0130680713075359],
	"heptanophenone": [12.9705190560471, -0.0182211003263966, 10.8623066945769, -0.00850288263012924],
	"octanophenone": [14.3891847086718, -0.0199033409824707, 11.7236631163352, -0.00894938100296847],
	"ibuprofen": [5.59239458233024, -0.00434643221635735, -6.93530425991638, 0.0489485565782194],
	"Loratidine": [6.46, 0.000, 18.75, -0.026],
	"Impurity-A": [11.2, -0.017, 55.14, -0.105],
	"Impurity-B": [9.7, -0.012, 43.51, -0.069],
	"Impurity-C": [6.24, -0.003, 9.51, 0.008],
	"Impurity-D": [3.19, 0.011, 5.38, 0.015],
	"Impurity-E": [3.55, 0.013, 8.14, 0.009],
	"Impurity-F": [2.62, 0.015, -2.09, 0.037],
	"Impurity-G": [4.36, 0.010, 0.72, 0.029],
}

var calcGradientMeOH_Agilent_SBC18 = {
	//"Compound Name": [ln kw intercept, ln kw slope, S intercept, S slope],
	"N-benzylformamide": [9.164256973698459, -0.02056138653509061, 11.017552429310824, -0.017627024734002957],
	"benzylalcohol": [9.368291799905602, -0.02044397690961204, 10.719335353513642, -0.017293059939322706],
	"phenol": [10.528635454669072, -0.024096647274333242, 11.830889215104005, -0.020815067582978557],
	"3-phenylpropanol": [13.990046610542905, -0.028603819813134486, 14.869796455088817, -0.024560711558855575],
	"p-chlorophenol": [15.861739909834881, -0.03486502200878007, 16.61089215982821, -0.030667729059069244],
	"acetophenone": [10.653179001828002, -0.02131414397680926, 12.326072909876794, -0.019996315953535758],
	"benzonitrile": [10.51274763619913, -0.02166400338685396, 12.538014443255712, -0.02085416530130655],
	"nitrobenzene": [12.077706680960972, -0.025014753882566368, 12.825033442420875, -0.021807386141678032],
	"methylbenzoate": [13.820020039954208, -0.02737258643594428, 14.762757063401498, -0.02472742162094264],
	"anisole": [13.103233159526095, -0.026162704070098193, 13.235300319411905, -0.022293188047843478],
	"benzene": [12.79279454930435, -0.025133621563273766, 12.89520867762737, -0.02189002373674944],
	"p-nitrotoluene": [14.783529711252328, -0.029673985457580394, 15.031584762786096, -0.025339654409184665],
	"p-nitrobenzylchloride": [16.364970805591096, -0.03408790047687219, 17.116251860081324, -0.03061188374616741],
	"toluene": [15.67880353961861, -0.030163537531225547, 15.060060720664186, -0.025233838160978087],
	"benzophenone": [18.601522937006184, -0.03594300992712139, 19.634722807368355, -0.03334126588775872],
	"bromobenzene": [17.712516295303878, -0.03500806434412767, 17.70340522317306, -0.031615757661614736],
	"naphthalene": [20.307889560692914, -0.04065942707536027, 20.02083287112345, -0.03650363138267144],
	"ethylbenzene": [19.094169428831844, -0.03690048224162992, 18.509629573953802, -0.03225261521523469],
	"p-xylene": [18.601129054735626, -0.03523252467484119, 17.15440900790893, -0.028311194595588108],
	"p-dichlorobenzene": [19.827805654558052, -0.03851035621541407, 19.46621766710542, -0.0343040373662159],
	"propylbenzene": [21.667241339921787, -0.04077994058619559, 20.28349365146609, -0.03399212706819865],
	"n-butylbenzene": [24.29235971858094, -0.0451391923516342, 22.217297337226874, -0.03671425777979378],
	"diethylformamide": [4.02358028702793, -0.00593748531320223, 11.4679326302866, -0.0123072072560952],
	"methylparaben": [11.4111369378345, -0.0228188521038433, 22.526811115202, -0.0366649524457222],
	"ethylparaben": [11.1898101697198, -0.0216321215335735, 17.0359605776335, -0.0269714258248205],
	"propylparaben": [11.0596971062141, -0.020133642293226, 14.1858776754127, -0.0200270391872307],
	"butylparaben": [12.1341303147334, -0.0211029280202196, 14.026391259171, -0.018467385725791],
	"acetanilide": [6.99233786611718, -0.0139326286293655, 10.9138048720276, -0.014891861475092],
	"propiophenone": [9.65102894789204, -0.015987532340238,  10.7187934245166, -0.012507833154392],
	"butyrophenone": [12.0552481653964, -0.0199003704613709, 14.7871477768746, -0.0201212808687109],
	"valerophenone": [11.2311772882595, -0.0170491283515628, 10.7488618780099, -0.0107369614592026],
	"hexanophenone": [13.0781795720922, -0.0197554842203633, 12.3839302756758, -0.0130680713075359],
	"heptanophenone": [12.9705190560471, -0.0182211003263966, 10.8623066945769, -0.00850288263012924],
	"octanophenone": [14.3891847086718, -0.0199033409824707, 11.7236631163352, -0.00894938100296847],
	"ibuprofen": [5.59239458233024, -0.00434643221635735, -6.93530425991638, 0.0489485565782194],
	"Loratidine": [6.46, 0.000, 18.75, -0.026],
	"Impurity-A": [11.2, -0.017, 55.14, -0.105],
	"Impurity-B": [9.7, -0.012, 43.51, -0.069],
	"Impurity-C": [6.24, -0.003, 9.51, 0.008],
	"Impurity-D": [3.19, 0.011, 5.38, 0.015],
	"Impurity-E": [3.55, 0.013, 8.14, 0.009],
	"Impurity-F": [2.62, 0.015, -2.09, 0.037],
	"Impurity-G": [4.36, 0.010, 0.72, 0.029],
}

var calcGradientACN_Agilent_SBC8 = {
	"N-benzylformamide":[4,-0.00859108668819096,6,-0.004518391449322835],
	"benzylalcohol":[4,-0.00838504826707623,5,-0.0035429892224701012],
	"phenol":[7,-0.01623644076804236,8,-0.011393740748934839],
	"3-phenylpropanol":[7,-0.011916768623047113,9,-0.00977469046200866],
	"p-chlorophenol":[11,-0.022819863346957618,13,-0.021129750042128245],
	"acetophenone":[8,-0.01459999476,10,-0.01180610814],
	"benzonitrile":[9,-0.018693495104451376,10,-0.014607943615296394],
	"nitrobenzene":[11,-0.021722028876511597,12,-0.019092652251069955],
	"methylbenzoate":[10,-0.017804279807352354,11,-0.013937724488517097],
	"anisole":[11,-0.02027269140388422,12,-0.017394070021991195],
	"benzene":[10,-0.019639538882926806,11,-0.016380707763880318],
	"p-nitrotoluene":[13,-0.024650000794250664,14,-0.0227133244127602],
	"p-nitrobenzylchloride":[15,-0.029833906766707965,17,-0.029903671253214692],
	"toluene":[13,-0.023122296489957304,13,-0.020736302933891882],
	"benzophenone":[14,-0.025488280205364526,16,-0.023860401325815152],
	"bromobenzene":[14,-0.02595715959089104,15,-0.024450098570551106],
	"naphthalene":[16,-0.029463036485079655,17,-0.029003464987497615],
	"ethylbenzene":[15,-0.027352050407686294,16,-0.026482537881368524],
	"p-xylene":[15,-0.02609635317889557,15,-0.023540985427180604],
	"p-dichlorobenzene":[16,-0.028722422384016594,17,-0.027388726937070666],
	"propylbenzene":[17,-0.029923292573128975,18,-0.027912591078851634],
	"n-butylbenzene":[18,-0.030503467927069025,18,-0.025855676201241597],
	"diethylformamide":[4,-0.00593748531320223,11,-0.0123072072560952],
	"methylparaben":[11,-0.0228188521038433,23,-0.0366649524457222],
	"ethylparaben":[11,-0.0216321215335735,17,-0.0269714258248205],
	"propylparaben":[11,-0.020133642293226,14,-0.0200270391872307],
	"butylparaben":[12,-0.0211029280202196,14,-0.018467385725791],
	"acetanilide":[7,-0.0139326286293655,11,-0.014891861475092],
	"propiophenone":[10,-0.015987532340238,11,-0.012507833154392],
	"butyrophenone":[12,-0.0199003704613709,15,-0.0201212808687109],
	"valerophenone":[11,-0.0170491283515628,11,-0.0107369614592026],
	"hexanophenone":[13,-0.0197554842203633,12,-0.0130680713075359],
	"heptanophenone":[13,-0.0182211003263966,11,-0.00850288263012924],
	"octanophenone":[14,-0.0199033409824707,12,-0.00894938100296847],
	"ibuprofen":[6,-0.00434643221635735,-7,0.0489485565782194],
	"Loratidine":[6,0,19,-0.026],
	"Impurity-A":[11,-0.017,55,-0.105],
	"Impurity-B":[10,-0.012,44,-0.069],
	"Impurity-C":[6,-0.003,10,0.008],
	"Impurity-D":[3,0.011,5,0.015],
	"Impurity-E":[4,0.013,8,0.009],
	"Impurity-F":[3,0.015,-2,0.037],
	"Impurity-G":[4,0.01,1,0.029]
}

var calcGradientMeOH_Agilent_SBC8 = {
	"N-benzylformamide":[9,-0.02056138653509061,11,-0.017627024734002957],
	"benzylalcohol":[9,-0.02044397690961204,11,-0.017293059939322706],
	"phenol":[11,-0.024096647274333242,12,-0.020815067582978557],
	"3-phenylpropanol":[14,-0.028603819813134486,15,-0.024560711558855575],
	"p-chlorophenol":[16,-0.03486502200878007,17,-0.030667729059069244],
	"acetophenone":[11,-0.02131414397680926,12,-0.019996315953535758],
	"benzonitrile":[11,-0.02166400338685396,13,-0.02085416530130655],
	"nitrobenzene":[12,-0.025014753882566368,13,-0.021807386141678032],
	"methylbenzoate":[14,-0.02737258643594428,15,-0.02472742162094264],
	"anisole":[13,-0.026162704070098193,13,-0.022293188047843478],
	"benzene":[13,-0.025133621563273766,13,-0.02189002373674944],
	"p-nitrotoluene":[15,-0.029673985457580394,15,-0.025339654409184665],
	"p-nitrobenzylchloride":[16,-0.03408790047687219,17,-0.03061188374616741],
	"toluene":[16,-0.030163537531225547,15,-0.025233838160978087],
	"benzophenone":[19,-0.03594300992712139,20,-0.03334126588775872],
	"bromobenzene":[18,-0.03500806434412767,18,-0.031615757661614736],
	"naphthalene":[20,-0.04065942707536027,20,-0.03650363138267144],
	"ethylbenzene":[19,-0.03690048224162992,19,-0.03225261521523469],
	"p-xylene":[19,-0.03523252467484119,17,-0.028311194595588108],
	"p-dichlorobenzene":[20,-0.03851035621541407,19,-0.0343040373662159],
	"propylbenzene":[22,-0.04077994058619559,20,-0.03399212706819865],
	"n-butylbenzene":[24,-0.0451391923516342,22,-0.03671425777979378],
	"diethylformamide":[4,-0.00593748531320223,11,-0.0123072072560952],
	"methylparaben":[11,-0.0228188521038433,23,-0.0366649524457222],
	"ethylparaben":[11,-0.0216321215335735,17,-0.0269714258248205],
	"propylparaben":[11,-0.020133642293226,14,-0.0200270391872307],
	"butylparaben":[12,-0.0211029280202196,14,-0.018467385725791],
	"acetanilide":[7,-0.0139326286293655,11,-0.014891861475092],
	"propiophenone":[10,-0.015987532340238,11,-0.012507833154392],
	"butyrophenone":[12,-0.0199003704613709,15,-0.0201212808687109],
	"valerophenone":[11,-0.0170491283515628,11,-0.0107369614592026],
	"hexanophenone":[13,-0.0197554842203633,12,-0.0130680713075359],
	"heptanophenone":[13,-0.0182211003263966,11,-0.00850288263012924],
	"octanophenone":[14,-0.0199033409824707,12,-0.00894938100296847],
	"ibuprofen":[6,-0.00434643221635735,-7,0.0489485565782194],
	"Loratidine":[6,0,19,-0.026],
	"Impurity-A":[11,-0.017,55,-0.105],
	"Impurity-B":[10,-0.012,44,-0.069],
	"Impurity-C":[6,-0.003,10,0.008],
	"Impurity-D":[3,0.011,5,0.015],
	"Impurity-E":[4,0.013,8,0.009],
	"Impurity-F":[3,0.015,-2,0.037],
	"Impurity-G":[4,0.01,1,0.029]
}

var calcGradientACN = {};
var calcGradientMeOH = {};

/*function sortCompounds(compounds){
  var compoundsLowercase = compounds.map(arrayToLowerCase);
  var compoundsSorted = compoundsLowercase.sort();
  var compoundsSortedFull = [];
  
  for(var i = 0; i < compoundsSorted.length; i++){
    for(var j = 0; j < compounds.length; j++){
      if(compounds[j].toLowerCase() == compoundsSorted[i]){
        compoundsSortedFull[i] = compounds[j];
        break;
      }
    }
  }
  return compoundsSortedFull;
}

function arrayToLowerCase(str){ return str.toLowerCase(); }

function filterOutImpurities(compound){
	return !compound.includes("Impurity-");
}

function readdImpurities(compounds){
	if(!compounds.includes("Impurity-A")){ compounds[compounds.length] = "Impurity-A"; }
	return compounds;
}*/

function updateCompoundsList(compound){
	var elementID = "compoundsTable_"+compound;
	console.log(elementID);
	if(document.getElementById(elementID).checked == true){
		console.log("checked = true");
		compoundList[compoundList.length] = compound;
	} else {
		console.log("checked = false");
		compoundListNew = [];
		for(indx = 0; indx < compoundList.length; indx++){ if(compoundList[indx] != compound){ compoundListNew[compoundListNew.length] = compoundList[indx]; } }
		compoundList = compoundListNew;
	}
	if(document.getElementById("solvent_b_text").innerHTML == "Methanol"){
		updateCompoundsTable("MeOH");
	} else if(document.getElementById("solvent_b_text").innerHTML == "Acetonitrile"){
		updateCompoundsTable("ACN");
	}
	displayTable();
	applyHighlightCode();
	calculatePeaks();
}

function updateCompoundsTable(mobilePhase){
	//document.getElementById("all_compounds_table")
	
	if(mobilePhase == "MeOH"){ var compounds = Object.keys(calcGradientMeOH); } else { var compounds = Object.keys(calcGradientACN); }
	
	var HTMLCache = '<tr><th colspan="2">Compounds</th><th>Concentration</th></tr>';
	var borderCSS = "border-bottom: 1px solid #bbb;"
	
	for(indx in compounds){
		var compound = compounds[indx];
		var concentration = M_default[indx];

		if(compoundList.includes(compound)){ compoundChecked = "checked"; } else { compoundChecked = ""; }
		if(compoundList.length == 1 && compoundChecked == "checked"){ compoundChecked += " disabled"; }
		
		//console.log("compound = "+compound);
		HTMLCache += '<tr>';
		HTMLCache += '<td style="text-align:right; width: 25%; '+borderCSS+'">';
		HTMLCache += '<input type="checkbox" id="compoundsTable_'+compound+'" onchange="updateCompoundsList('+"'"+compound+"'"+');" '+compoundChecked+'>';
		HTMLCache += '</td>';
		HTMLCache += '<td style="text-align:left; '+borderCSS+'">';
		HTMLCache += '<label for="compoundsTable_'+compound+'">'+compound+'</label>';
		HTMLCache += '</td>';
		HTMLCache += '<td style="text-align:left; ' + borderCSS + '">';
		
		HTMLCache += '<input class="number" type="number" step="0.01" id="concentration_' + compound + '" value="' + concentration + '" onchange="calculatePeaks();" />';
		HTMLCache += '</td>';
		HTMLCache += '</tr>';
	}
	
	document.getElementById("all_compounds_table").style = "width:100%;";
	
	document.getElementById("all_compounds_table").innerHTML = HTMLCache;
}


var logCounter = 1;

function getCurrentTime(){
	var d = new Date();
	var hr = d.getHours();
	hr = Number(hr) + 1;
	var min = d.getMinutes();
	var sec = d.getSeconds();
	var msec = d.getMilliseconds();
	var timeStamp = hr + ":" + min + ":" + sec + "." + msec;
	return timeStamp;
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function log(msg){
	//var debugLog = document.getElementById("showDebuggingLog").checked;
	var debugLog = false;
	if(debugLog == true){
		var logCache = "";
		var t = getCurrentTime();
		logCache += logCounter + ") " + t + " -\n\t" + msg;
		logCache += "\n--------------------------------------------------------------------------------\n";
		//console.log(logCache);
		logCounter++;
	}
}

function showCustom(){
	var state = document.getElementById("add_custom_compound_table").hidden;
	if(state == true){
		document.getElementById("add_custom_compound_table").hidden = false;
	} else {
		document.getElementById("add_custom_compound_table").hidden = true;
		
		document.getElementById("add_custom_compound_name").value = "";
	
		document.getElementById("add_custom_compound_lnkw_int_ACN").value = "";
		document.getElementById("add_custom_compound_lnkw_slope_ACN").value = "";
		document.getElementById("add_custom_compound_s_int_ACN").value = "";
		document.getElementById("add_custom_compound_s_slope_ACN").value = "";
	
		document.getElementById("add_custom_compound_lnkw_int_MeOH").value = "";
		document.getElementById("add_custom_compound_lnkw_slope_MeOH").value = "";
		document.getElementById("add_custom_compound_s_int_MeOH").value = "";
		document.getElementById("add_custom_compound_s_slope_MeOH").value = "";
	}
}

function checkCustom(){
	var name = document.getElementById("add_custom_compound_name").value;
	
	var lnkwIntACN = document.getElementById("add_custom_compound_lnkw_int_ACN").value;
	var lnkwSlopeACN = document.getElementById("add_custom_compound_lnkw_slope_ACN").value;
	var SIntACN = document.getElementById("add_custom_compound_s_int_ACN").value;
	var SSlopeACN = document.getElementById("add_custom_compound_s_slope_ACN").value;
	
	var lnkwIntMeOH = document.getElementById("add_custom_compound_lnkw_int_MeOH").value;
	var lnkwSlopeMeOH = document.getElementById("add_custom_compound_lnkw_slope_MeOH").value;
	var SIntMeOH = document.getElementById("add_custom_compound_s_int_MeOH").value;
	var SSlopeMeOH = document.getElementById("add_custom_compound_s_slope_MeOH").value;
	
	if(lnkwIntACN != "" && lnkwSlopeACN != "" && SIntACN != "" && SSlopeACN != "" && lnkwIntMeOH != "" && lnkwSlopeMeOH != "" && SIntMeOH != "" && SSlopeMeOH != "" && name != "" && typeof name == "string"){
		//enable submit button
		document.getElementById("add_custom_compound_submit_button").disabled = false;
	} else {
		//disable submit button
		document.getElementById("add_custom_compound_submit_button").disabled = true;
	}
}

function addCustom(){
	var name = document.getElementById("add_custom_compound_name").value;
	
	var lnkwIntACN = Number(document.getElementById("add_custom_compound_lnkw_int_ACN").value);
	var lnkwSlopeACN = Number(document.getElementById("add_custom_compound_lnkw_slope_ACN").value);
	var SIntACN = Number(document.getElementById("add_custom_compound_s_int_ACN").value);
	var SSlopeACN = Number(document.getElementById("add_custom_compound_s_slope_ACN").value);
	
	var lnkwIntMeOH = Number(document.getElementById("add_custom_compound_lnkw_int_MeOH").value);
	var lnkwSlopeMeOH = Number(document.getElementById("add_custom_compound_lnkw_slope_MeOH").value);
	var SIntMeOH = Number(document.getElementById("add_custom_compound_s_int_MeOH").value);
	var SSlopeMeOH = Number(document.getElementById("add_custom_compound_s_slope_MeOH").value);
	
	calcGradientACN[name] = [lnkwIntACN, lnkwSlopeACN, SIntACN, SSlopeACN];
	calcGradientMeOH[name] = [lnkwIntMeOH, lnkwSlopeMeOH, SIntMeOH, SSlopeMeOH];
	
	showCustom();
	
	/*compounds = compoundList;
	
	document.getElementById("preloaded_dropdown").innerHTML = "";
		
	for (i = 0; i < compounds.length; i++) {
		var html = document.getElementById("preloaded_dropdown").innerHTML;
		document.getElementById("preloaded_dropdown").innerHTML = html + "<a id="+ compounds[i].replace(/ /g,"_") +"_menu_option onclick=addCompoundToList('" + compounds[i] + "') class='dropbutton'>"+ compounds[i] +"</a>"
	}
	log("preloaded_dropdown innerHTML has been updated!");
	for (i = 0; i < compounds.length; i++) {
		var save = compounds[i].replace(/ /g,"_");
		document.getElementById(save+"_menu_option").onClick = "select_option('"+ compounds[i] +"', 'preloaded')";
	}*/
	//log("save+'_menu_option' onClick has been initiated!");
	//refreshNowloadedCompounds();
	//refreshPreloadedCompounds();
	compoundList[compoundList.length] = name;
	if(document.getElementById("solvent_b_text").innerHTML == "Methanol"){
		updateCompoundsTable("MeOH");
	} else if(document.getElementById("solvent_b_text").innerHTML == "Acetonitrile"){
		updateCompoundsTable("ACN");
	}
	displayTable();
	calculatePeaks();
}

function setLanguage(){
	/*
	var wordJSON = {};
	wordJSON.menu = {};
	if (document.getElementById("german_radio").checked) {
		//Selected Language is german
		//alert("Selected language has been switched to German.");
		wordJSON.menu.languages = "Sprachen";
		wordJSON.menu.manageCompounds = "Verbindungen verwalten";
		wordJSON.menu.mobilePhaseComposition = "Zusammensetzung der mobilen Phase";
		wordJSON.menu.chromatographicProperties = "Chromatographische Eigenschaften";
		wordJSON.menu.generalProperties = "Allgemeine Eigenschaften (Beta)";
		wordJSON.menu.columnProperties = "Spalteneigenschaften";
	} else if (document.getElementById("spanish_radio").checked) {
		//Selected Language is spanish
		//alert("Selected language has been switched to Spanish.");
		wordJSON.menu.languages = "Languages";
		wordJSON.menu.manageCompounds = "Manage Compounds";
		wordJSON.menu.mobilePhaseComposition = "Mobile Phase Composition";
		wordJSON.menu.chromatographicProperties = "Chromatographic Properties";
		wordJSON.menu.generalProperties = "General Properties";
		wordJSON.menu.columnProperties = "Column Properties";
	} else if (document.getElementById("french_radio").checked) {
		//Selected Language is french
		//alert("Selected language has been switched to French.");
		wordJSON.menu.languages = "Languages";
		wordJSON.menu.manageCompounds = "Manage Compounds";
		wordJSON.menu.mobilePhaseComposition = "Mobile Phase Composition";
		wordJSON.menu.chromatographicProperties = "Chromatographic Properties";
		wordJSON.menu.generalProperties = "General Properties";
		wordJSON.menu.columnProperties = "Column Properties";
	} else {
		//Selected Language is english
		//alert("Selected language has been switched to English.");
		wordJSON.menu.languages = "Languages";
		wordJSON.menu.manageCompounds = "Manage Compounds";
		wordJSON.menu.mobilePhaseComposition = "Mobile Phase Composition";
		wordJSON.menu.chromatographicProperties = "Chromatographic Properties";
		wordJSON.menu.generalProperties = "General Properties";
		wordJSON.menu.columnProperties = "Column Properties";
	}
	updateWords(wordJSON);
	//console.log(JSON.stringify(wordJSON));
	*/
}

function updateWords(wordJSON){
	document.getElementById("languages_button").innerHTML = wordJSON.menu.languages;
	document.getElementById("add_compound_button").innerHTML = wordJSON.menu.manageCompounds;
	document.getElementById("mobile_phase_button").innerHTML = wordJSON.menu.mobilePhaseComposition;
	document.getElementById("chromatographic_properties_button").innerHTML = wordJSON.menu.chromatographicProperties;
	document.getElementById("general_properties_button").innerHTML = wordJSON.menu.generalProperties;
	document.getElementById("column_properties_button").innerHTML = wordJSON.menu.columnProperties;
}

function updateShowDebugLog(){
	var enable = document.getElementById("showDebuggingLog").checked;
	
	console.API;
	if (typeof console._commandLineAPI !== 'undefined') {
		console.API = console._commandLineAPI; //chrome
	} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
		console.API = console._inspectorCommandLineAPI; //Safari
	} else if (typeof console.clear !== 'undefined') {
		console.API = console;
	}
	console.API.clear();
	
	if(enable){
		//console.log("Console logging has been enabled.");
	} else {
		//console.log("Console logging has been disabled.");
		logCounter = 1;
	}
}

function loadAllCompounds(){
	
	document.getElementById("gradient_radio").checked = true;
	
	document.getElementById("Gradient_Time").value = 60;
	document.getElementById("Gradient_Phi_Init").value = 0;
	
	document.getElementById("temperature_chrom").value = 150;
	document.getElementById('temperature_slider').value = 150;
	
	document.getElementById("flow_rate_chrom").value = 0.5;
	
	select_option('Acetonitrile', 'solvent_b');
	
	compounds = Object.keys(calcGradientACN);
	
	compoundList = compounds;
	
	document.getElementById("preloaded_dropdown").innerHTML = "";
		
	for (i = 0; i < compounds.length; i++) {
		var html = document.getElementById("preloaded_dropdown").innerHTML;
		document.getElementById("preloaded_dropdown").innerHTML = html + "<a id="+ compounds[i].replace(/ /g,"_") +"_menu_option onclick=addCompoundToList('" + compounds[i] + "') class='dropbutton'>"+ compounds[i] +"</a>"
	}
	log("preloaded_dropdown innerHTML has been updated!");
	for (i = 0; i < compounds.length; i++) {
		var save = compounds[i].replace(/ /g,"_");
		document.getElementById(save+"_menu_option").onClick = "select_option('"+ compounds[i] +"', 'preloaded')";
	}
	//log("save+'_menu_option' onClick has been initiated!");
	refreshNowloadedCompounds();
	refreshPreloadedCompounds();
	displayTable();
	calculatePeaks();
}

function toggleShowDebuggingLog(){
	var ele = document.getElementById("showDebuggingLog");
	if(ele.checked == true){
		ele.checked = false;
	} else {
		ele.checked = true;
	}
}

function checkIfCompoundIsListed(compound){
	log("Running 'checkIfCompoundIsListed("+compound+")'...");
	var j = compoundList.length;
	var listed = false;
	for(i = 0; i < j; i++){
		if(compoundList[i] == compound){
			listed = true;
			break;
		}
	}
	return listed;
}

/*function refreshPreloadedCompounds(){
	log("Running 'refreshPreloadedCompounds()'...");
	var raw_compounds = Object.keys(calcGradientACN);
	var compounds = [];
	for(k = 0; k < raw_compounds.length; k++){
		var listed = checkIfCompoundIsListed(raw_compounds[k]);
		if(listed == false){
			var arrayPos = compounds.length;
			compounds[arrayPos] = raw_compounds[k];
		}
	}
		
	document.getElementById("preloaded_dropdown").innerHTML = "";
			
	for (i = 0; i < compounds.length; i++) {
		var html = document.getElementById("preloaded_dropdown").innerHTML;
		document.getElementById("preloaded_dropdown").innerHTML = html + "<a id="+ compounds[i].replace(/ /g,"_") +"_menu_option onclick=addCompoundToList('" + compounds[i] + "') class='dropbutton'>"+ compounds[i] +"</a>"
	}
	for (i = 0; i < compounds.length; i++) {
		var save = compounds[i].replace(/ /g,"_");
		document.getElementById(save+"_menu_option").onClick = "select_option('"+ compounds[i] +"', 'preloaded')";
	}
}*/

/*function refreshNowloadedCompounds(){
	log("Running 'refreshNowloadedCompounds()'...");
	var compounds = compoundList;
	
	document.getElementById("now_loaded_dropdown").innerHTML = "";
			
	for (i = 0; i < compounds.length; i++) {
		var html = document.getElementById("now_loaded_dropdown").innerHTML;
		document.getElementById("now_loaded_dropdown").innerHTML = html + "<a id="+ compounds[i].replace(/ /g,"_") +"_menu_option onclick=setManageCompound('" + compounds[i] + "') class='dropbutton'>"+ compounds[i] +"</a>"
	}
	for (i = 0; i < compounds.length; i++) {
		var save = compounds[i].replace(/ /g,"_");
		document.getElementById(save+"_menu_option").onClick = "select_option('"+ compounds[i] +"', 'now_loaded')";
	}
}*/

/*function setManageCompound(compound){
	log("Running 'setManageCompound("+compound+")'...");
	document.getElementById("manageCompound_compound").innerHTML = compound;
	document.getElementById("manageCompound").hidden = false;
	show('now_loaded');
}*/

/*function removeCompoundFromList(){
	log("Running 'removeCompoundFromList()'...");
	var compound = document.getElementById("manageCompound_compound").innerHTML;
	var newArray = [];
	for(i = 0; i < compoundList.length; i++){
		if(compoundList[i] == compound){
			//Do Nothing
		} else {
			var pos = newArray.length;
			newArray[pos] = compoundList[i];
		}
	}
	compoundList = newArray;
	document.getElementById("manageCompound").hidden = true;
	displayTable();
	applyHighlightCode();
	calculatePeaks();
	refreshPreloadedCompounds();
	
	if(compoundList.length <= 1){
		document.getElementById("now_loaded").disabled = true;
	} else {
		document.getElementById("now_loaded").disabled = false;
	}
	document.getElementById("preloaded").disabled = false;
}*/

/*function addCompoundToList(compound){
	log("Running 'addCompoundToList("+compound+")'...");
	show('preloaded');
	if(compoundList.length < M.length){
		var j = compoundList.length;
		var valid = true;
		for(i = 0; i < j; i++){
			if(compoundList[i] == compound){
				valid = false;
				break;
			}
		}
		if(valid == true){
			compoundList[j] = compound;
			refreshPreloadedCompounds();
			refreshNowloadedCompounds();
			displayTable();
			applyHighlightCode();
			calculatePeaks();
		}
	} else {
		alert("compoundList is full. Please remove a compound.");
	}
	
	if(compoundList.length >= M.length){
		document.getElementById("preloaded").disabled = true;
	} else {
		document.getElementById("preloaded").disabled = false;
	}
	document.getElementById("now_loaded").disabled = false;
}*/

function hideGradientElutionStuffs(bool){
	log("Running 'hideGradientElutionStuffs("+bool+")'...");
	//True = Isocratic Mode; False = Gradient Mode
	if(bool == "true"){
		//document.getElementById("Solvent_B_Fraction_text").hidden = false;
		//document.getElementById("Solvent_B_Fraction_td").hidden = false;
		document.getElementById("Gradient_Settings_Table").hidden = true;
		document.getElementById("Gradient_Settings_Table_AddRow").hidden = true;
		document.getElementById("Gradient_Settings_Table_RemoveRow").hidden = true;
		document.getElementById("Gradient_PreColumn_Volume").hidden = true;
	} else if(bool == "false"){
		//document.getElementById("Solvent_B_Fraction_text").hidden = true;
		//document.getElementById("Solvent_B_Fraction_td").hidden = true;
		document.getElementById("Gradient_Settings_Table").hidden = false;
		document.getElementById("Gradient_Settings_Table_AddRow").hidden = false;
		document.getElementById("Gradient_Settings_Table_RemoveRow").hidden = false;
		document.getElementById("Gradient_PreColumn_Volume").hidden = false;
	}
}

function resetMenus(){
	log("Running 'resetMenus()'...");
	
	//Mobile Phase Composition
	//select_option('Acetonitrile', 'solvent_b');
	document.getElementById("solvent_b").value = "Acetonitrile";
	compoundList = ["phenol", "benzonitrile", "p-chlorophenol", "acetophenone", "nitrobenzene"];
	updateCompoundsTable("ACN");
	document.getElementById("isocratic_radio").checked = true;
	document.getElementById("gradient_radio").checked = false;
	document.getElementById("solvent_fraction_slider").value = 40;
	document.getElementById("solvent_fraction_comp").value = 40;
	
	//Chromatographic Properties
	document.getElementById("temperature_slider").value = 40;
	document.getElementById("temperature_chrom").value = 40;
	document.getElementById("injection_volume_chrom").value = "5.0";
	document.getElementById("flow_rate_chrom").value = "2.0";	
	
	//General Properties
	document.getElementById("signal_offset_general").value = 0;
	document.getElementById("noise_general").value = 0;
	document.getElementById("auto_time_check").checked = true;
	document.getElementById("initial_time_general").value = 0;
	document.getElementById("plot_points_general").value = 6000;
	document.getElementById("detectorFrequency_general").value = 2;
	document.getElementById("renderGraph_dots_check").checked = false;
	
	//Column Properties
	//select_option('Agilent SB-C18', 'stationary_phase');
	document.getElementById("stationary_phase").value = "Agilent SB-C18";
	toggleColumnProperties('Agilent SB-C18');
	document.getElementById("length_column").value = 100.0;
	document.getElementById("inner_diameter_column").value = 4.6;
	document.getElementById("particle_size_column").value = 3.0;
	document.getElementById("interparticle_porosity_column").value = 0.4;
	document.getElementById("intraparticle_porosity_column").value = 0.4;
	document.getElementById("A_column").value = 1.0;
	document.getElementById("B_column").value = 5.0;
	document.getElementById("C_column").value = 0.05;
	
	document.getElementById("dataTable").className = "";
	
	//compoundList
	displayTable();
	applyHighlightCode();
	//refreshPreloadedCompounds();
	//refreshNowloadedCompounds();
	//Apply Changes
	calculatePeaks();
}

function closeAllOpenDropdownMenus(exception){
	//console.log("exception = " + exception);
	//console.log("--------------------");
	var elementArray = document.getElementsByClassName("dropdown-content_show");
	for(i = 0; i < elementArray.length; i++){
		var id = elementArray[i].id.replace("_dropdown", "");
		if(id != exception){
			//console.log(id);
			//console.log("Hiding the '"+id+"' dropdown menu...");
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
	}
	//console.log("----------------------------------------");
}

//On element blur
function isMouseOverDropdownMenu(){
	//get currently focused element className
	var x = document.activeElement.className;
	//console.log("activeElement className = " + x);
	if (x != "dropbutton"){
		closeAllOpenDropdownMenus("");
	}
}

function show(id) {
	log("Running 'show("+id+")'...");
	closeAllOpenDropdownMenus(id);
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
	log("Running 'enableEdit()'...");
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
	log("Running 'openMenu("+id+")'...");
	/*
	var dropdowns = document.getElementsByClassName("menu_section");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
	  var openMenu = dropdowns[i];
	  if (openMenu.classList.contains('show')) {
	  	if (openMenu != document.getElementById(id)){
	  		//openMenu.classList.remove('show');
	  	}
	  }
	}
	document.getElementById(id).classList.toggle("show");
	*/
	if(document.getElementById(id).style.display == "none"){
		document.getElementById(id).style.display = "grid";
	} else {
		document.getElementById(id).style.display = "none";
	}
}

function openMenu_ALL(){ //Added by Thomas Lauer on 08/30/2017
	log("Running 'openMenu_ALL()'...");
	openMenu('manage_compound');
	openMenu('mobile_phase_comp');
	//openMenu('plot_options');
	openMenu('chromatographic_properties');
	openMenu('general_properties');
	openMenu('column_properties');
	//openMenu('languages');
	//openMenu('other');
}

function generateRandomExperiment(){ //Added by Thomas Lauer on 08/30/2017
	log("Running 'generateRandomExperiment()'...");
	var solventBFraction = Math.round(Math.random()*100);
	var temperature = Math.round(Math.random()*150);
	var injectionVolume = Number(((Math.random()*9)+1).toFixed(1));
	var flowRate = Number(((Math.random()*4.9)+0.1).toFixed(1));
	var columnLength = Number(((Math.random()*180)+20).toFixed(1));
	var columnInnerDiameter = Number(((Math.random()*4.3)+0.7).toFixed(1));
	var columnParticleSize = Number(((Math.random()*2.8)+0.2).toFixed(1));
	
	document.getElementById("isocratic_radio").checked = true;
	document.getElementById("solvent_fraction_comp").value = solventBFraction;
	document.getElementById("solvent_fraction_slider").value = solventBFraction;
	document.getElementById("temperature_chrom").value = temperature;
	document.getElementById("temperature_slider").value = temperature;
	document.getElementById("injection_volume_chrom").value = injectionVolume;
	document.getElementById("flow_rate_chrom").value = flowRate;
	select_option('Generate Random Column', 'stationary_phase');
	document.getElementById("length_column").value = columnLength;
	document.getElementById("inner_diameter_column").value = columnInnerDiameter;
	document.getElementById("particle_size_column").value = columnParticleSize;
	document.getElementById("interparticle_porosity_column").value = "0.36";
	document.getElementById("intraparticle_porosity_column").value = "0.4";
	document.getElementById("A_column").value = "1.0";
	document.getElementById("B_column").value = "5.0";
	document.getElementById("C_column").value = "0.05";
	
	calculatePeaks();
}

function setDesc(obj, msg){
	/*
	log("Running 'setDesc("+obj+", "+msg+")'...");
	if(typeof obj == "string" && typeof msg == "string"){
		if(obj == "" && msg == ""){
			document.getElementById("Description").innerHTML = "Descriptions: <div>Mouse over an element to view a description of it!</div>";
		} else if(msg == "") {
			document.getElementById("Description").innerHTML = obj + ": <div>Description Pending...</div>";
		} else {
			document.getElementById("Description").innerHTML = obj + ": <div>" + msg + "</div>";
		}
	} else {
		//Do Nothing. Typeof did not return "string" for both variables;
	}
	*/
}

function toggleColumnProperties(input){ //Added by Thomas Lauer on 08/30/2017
	//log("Running 'toggleColumnProperties("+input+")'...");
	//Check if the value of 'input' is a string.
	if(typeof input == "string"){
		
		//select_option('Acetonitrile', 'solvent_b');
		document.getElementById("solvent_b").value = "Acetonitrile";
		
		if(input == "Agilent SB-C18"){
			calcGradientACN = calcGradientACN_Agilent_SBC18;
			calcGradientMeOH = calcGradientMeOH_Agilent_SBC18;
			document.getElementById("temperature_slider").disabled = false;
			document.getElementById("temperature_chrom").disabled = false;
			//document.getElementById("temperature_disabled_text").hidden = true;
			//document.getElementById("temperature_input_rowOne").hidden = false;
			//document.getElementById("temperature_input_rowTwo").hidden = false;
		} else if(input == "Agilent SB-C8") {
			calcGradientACN = calcGradientACN_Agilent_SBC8;
			calcGradientMeOH = calcGradientMeOH_Agilent_SBC8;
			document.getElementById("temperature_slider").disabled = true;
			document.getElementById("temperature_chrom").disabled = true;
			document.getElementById("temperature_slider").value = 40;
			document.getElementById("temperature_chrom").value = 40;
			//document.getElementById("temperature_disabled_text").hidden = false;
			//document.getElementById("temperature_input_rowOne").hidden = true;
			//document.getElementById("temperature_input_rowTwo").hidden = true;
		}
		updateCompoundsTable("ACN");
		//Finally, run the function 'calculatePeaks()' to update the graph.
		calculatePeaks();
	} else {
		//Do Nothing. typeof != 'string'.
	}
}

function select_option(selected, menu) {
	log("Running 'select_option("+selected+", "+menu+")'...");
	document.getElementById(menu + "_text").innerHTML = selected;
}

function loadSlider(id) {
	log("Running 'loadSlider("+id+")'...");
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

function tableID(x,y){
	return 10 * (y + 1 ) + x
}

function renderGraph(data, renderGraphDots) {
	log("Running 'renderGraph(data)'...");
	//console.log("Running 'renderGraph(data)'...")
	var masterlist = [];
	//console.log(data);
	for (i = 0; i < data.length; i++) {
		masterlist = masterlist.concat(data[i]);
	}
	//console.log(masterlist);

	d3.select("#graph_svg").remove(); //grab the '#graph_svg' tag and remove 

	//document.getElementById("graph").innerHTML = "<svg id='graph_svg' width='1400' height='500'></svg>"; //Create a new SVG with a width of 1400 and height of 500
	
	var div_width = document.getElementById("graph").offsetWidth;
	var div_height = document.getElementById("graph").offsetHeight;

	document.getElementById("graph").innerHTML = "<svg id='graph_svg' width='"+div_width+"' height='"+div_height+"'></svg>"; //Create a new SVG
	
	var svg = d3.select("#graph_svg"), //grab the '#graph_svg' tag and bind it to the variable svg
	    margin = {top: 20, right: 20, bottom: 30, left: 50}, //create a JSON containing the margins
	    width = div_width - margin.left - margin.right, //create a variable containing the usable width
	    height = div_height - margin.top - margin.bottom, //create a variable containing the usable height
	    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //grab the '#graph_svg' tag, append a 'g' tag, assign attribute 'transform'; move the contents of the grouping

	var x = d3.scaleLinear()
	    .rangeRound([0, width]); //create a variable 'x' to set the scale’s range to the specified two-element array of numbers while also enabling rounding. equivalent to: .range(range).round(true);

	var y = d3.scaleLinear()
	    .rangeRound([height, 0]); //create a variable 'y' to set the scale’s range to the specified two-element array of numbers while also enabling rounding. equivalent to: .range(range).round(true);

	//var megan = d3.scaleLinear()
	//    .rangeRound([height, 0]);
		
	// Determines the highest retention time
	tR_max = 0;
	for (i = 0; i < data.length; i++){
		tR = document.getElementById(tableID(4,i)).innerHTML;
		tR = 5;
		if (tR_max < tR){
			tR_max = tR;
		}
	}

	// Creates a list (new_data) of one or two data signals:
		// First signal: signal that combines all the gaussian curves.
		// Second signal: individual signal (activated when highlighted).
	new_data = [];
	new_data[0] = aggregateSignal(data);
	
	document.getElementById("detectorFrequency_general_numPoints").innerHTML = new_data[0].length;
	
	var domainData = aggregateSignal(data);
	//domainData[0].Ct = 0;
	
	createDataExportFile_Full(new_data[0]);
	
	if (document.getElementById("dataTable").className != ""){
		new_data[1] = data[document.getElementById("dataTable").className];
		createDataExportFile_Selected(new_data[1], compoundList[document.getElementById("dataTable").className]);
	} else {
		exportFileData_Selected = "";
		exportFileData_SelectedCompound = "";
	}

	x.domain(d3.extent(new_data[0], function(d) { return d.t; }));
	//y.domain(d3.extent(new_data[0], function(d) { return d.Ct; }));
	y.domain(d3.extent(domainData, function(d) { return d.Ct; }));
	//megan.domain([0, 100]);

	g.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(x))
	  .append("text")
	    .attr("fill", "#000")
	    .attr("x", 6)
	    .attr("dx", "62em")
	    .attr("dy", "2.6em")
	    .attr("text-anchor", "middle")
	    .text("time (min)");

	g.append("g")
	    .call(d3.axisLeft(y))
	  .append("text")
	    .attr("fill", "#000")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", "-3.5em")
	    .attr("text-anchor", "end")
		.text("Signal");
	    //.text("Signal (µ moles/liter)");
		
	/*g.append("g")
	    .call(d3.axisRight(megan))
	  .append("text")
	    .attr("fill", "#000")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", "60em")
	    .attr("text-anchor", "end")
		.text("I say a lot of things");*/

	for (i = 0; i < new_data.length; i++) {
		//var line = d3.line()
		//    .curve(d3.curveBasis)
		//    .x(function(d) { return x(d.t); })
		//    .y(function(d) { return y(d.Ct); });
			
		var line = d3.line()
		    .x(function(d) { return x(d.t); })
		    .y(function(d) { return y(d.Ct); });

		g.append("path")
		    .datum(new_data[i])
		    .attr("fill", "none")
		    .attr("id", i)
		    .attr("stroke", (i == 0 ? "steelblue" : "orange"))
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("stroke-width", 1.5)
		    .attr("d", line);
		
		if(renderGraphDots){
			g.append("g")
			.selectAll("dot")
			.data(new_data[i])
			.enter()
			.append("circle")
				.attr("cx", function(d) { return x(d.t) })
				.attr("cy", function(d) { return y(d.Ct); })
				.attr("r", 1.5)
				.attr("fill", (i == 0 ? "#007aa2" : "#ff0000"));
		}
	}
}

function renderGraph_new(data, renderGraphDots) {
	console.log("Running 'renderGraph_new(data, renderGraphDots)'...")
	var masterlist = [];
	//console.log(data);
	for (i = 0; i < data.length; i++) {
		masterlist = masterlist.concat(data[i]);
	}
	//console.log(masterlist);

	d3.select("#graph_svg").remove(); //grab the '#graph_svg' tag and remove 

	document.getElementById("graph").innerHTML = "<svg id='graph_svg' width='1400' height='500'></svg>"; //Create a new SVG with a width of 1400 and height of 500
	
	var svg = d3.select("#graph_svg"), //grab the '#graph_svg' tag and bind it to the variable svg
	    margin = {top: 20, right: 20, bottom: 30, left: 50}, //create a JSON containing the margins
	    width = 700 - margin.left - margin.right, //create a variable containing the usable width
	    height = 500 - margin.top - margin.bottom, //create a variable containing the usable height
	    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //grab the '#graph_svg' tag, append a 'g' tag, assign attribute 'transform'; move the contents of the grouping

	var x = d3.scaleLinear()
	    .rangeRound([0, width]); //create a variable 'x' to set the scale’s range to the specified two-element array of numbers while also enabling rounding. equivalent to: .range(range).round(true);

	var y = d3.scaleLinear()
	    .rangeRound([height, 0]); //create a variable 'y' to set the scale’s range to the specified two-element array of numbers while also enabling rounding. equivalent to: .range(range).round(true);

	//var megan = d3.scaleLinear()
	//    .rangeRound([height, 0]);
		
	// Determines the highest retention time
	tR_max = 0;
	for (i = 0; i < data.length; i++){
		tR = document.getElementById(tableID(4,i)).innerHTML;
		tR = 5;
		if (tR_max < tR){
			tR_max = tR;
		}
	}
}

function createDataExportFile_Full(data){
	//console.log(data);
	var fileData = "t, Ct";
	for(i=0; i<data.length; i++){
		fileData += "\n"+data[i].t.toFixed(2)+", "+data[i].Ct;
	}
	//console.log(fileData);
	exportFileData_Full = fileData;
}

function createDataExportFile_Selected(data, compound){
	//console.log(data);
	exportFileData_SelectedCompound = compound;
	var fileData = "t, "+compound;
	for(i=0; i<data.length; i++){
		fileData += "\n"+data[i].t.toFixed(2)+", "+data[i].Ct;
	}
	//console.log(fileData);
	exportFileData_Selected = fileData;
}

function interpolate(x1_ref, y1_ref, x3_ref, y3_ref, x2_target){
	y2 = (x2_target - x1_ref) * (y3_ref - y1_ref) / (x3_ref - x1_ref);
	y2 += y1_ref;

	return y2
}

function maximum_t(data) {
	log("Running 'maximum_t(data)'...");
	max = 0;
	for (i = 0; i < data.length; i++){
		last_point = data[i][data[i].length-1].t;
		if (last_point > max){
			max = last_point
		}
	}
	return max
}

function localInterpolation(data,x0){
	max = data[data.length-1].t;
	min = 0;
	// First locates the closest time points (for interpolation).
	for (i = 0; i < data.length; i++){
		if (typeof data[i+1] != "undefined"){
			if (data[i].t <= x0 && x0 <= data[i+1].t){
				p1 = data[i];
				p2 = data[i+1];
				return interpolate(p1.t, p1.Ct, p2.t, p2.Ct, x0)
			}
		} else {
			return 0
		}
	}
}

function getDetectorTimeStep(){
	var detectorFrequency_min = 0.1;
	var detectorFrequency_max = -1;
	
	var detectorFrequency = parseFloat(document.getElementById("detectorFrequency_general").value).toFixed(5);
	if((detectorFrequency_min != -1) && (detectorFrequency < detectorFrequency_min)){
		document.getElementById("detectorFrequency_general").value = detectorFrequency_min; detectorFrequency = detectorFrequency_min;
	} else if((detectorFrequency_max != -1) && (detectorFrequency > detectorFrequency_max)){
		document.getElementById("detectorFrequency_general").value = detectorFrequency_max; detectorFrequency = detectorFrequency_max;
	}
	var step = ((1/detectorFrequency)/60);
	
	return step;
}

function aggregateSignal(data){
	log("Running 'aggregateSignal(data)'...");
	base_data = data[0];
	max_t = maximum_t(data);
	
	if(document.getElementById("signal_offset_general").value == ""){ document.getElementById("signal_offset_general").value = 0; }
	if(document.getElementById("noise_general").value == ""){ document.getElementById("noise_general").value = 0; }
	
	var signalOffset = parseFloat(document.getElementById("signal_offset_general").value);
	var noise = parseFloat(document.getElementById("noise_general").value);
	
	//step = .01;
	//var step = parseFloat(((60)/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));
	//var detectorFrequency = parseFloat(document.getElementById("detectorFrequency_general").value).toFixed(5);
	//var step = ((1/detectorFrequency)/60);
	var step = getDetectorTimeStep();
	
	//document.getElementById("plot_points_general_detectorFrequency").innerHTML = (1/((60/document.getElementById("plot_points_general").value)*60)).toFixed(3) + " Hz";
	
	//var timeStart = 0;
	var timeStart = parseFloat((parseFloat(document.getElementById("initial_time_general").value)/(60)).toFixed(3));
	aggregate_signal = [];

	var index = 0;
	for (j = timeStart; j < max_t ; j += step) { //j = 0; j < max_t ; j += step
		//index = Math.round(j/step);
		x_targ = j;
		signal = 0;
		for (k = 0; k < data.length; k++){
			y_targ = localInterpolation(data[k], x_targ);
			signal += y_targ;
		}
		
		var noiseValue = (Math.random()*noise)-(noise/2);
		
		aggregate_signal[index] = {
					"t" : j,
					"Ct" : signal+signalOffset+noiseValue,
					"c" : "steelblue"
		}
		
		index += 1;
	}
	
	//aggregate_signal[0].Ct = 0;
	
	return aggregate_signal;
}

function printList(list){
	log("Running 'printList("+list+")'...");
	for (i = 0; i < list.length; i++){
		document.write(i + "- " + list[i].t + ": " +list[i].Ct + "\n");
	}
}

//Check whether the specified values are blank OR zero
//If they are, return a 'default' value for the variable
//If they are not, return the original value
function checkIfValid(variable, value) {
	log("Running 'checkIfValid("+variable+", "+value+")'...");
	//value = value of iD from HTML input
	//variable = variable testing for incase a 'default' value is needed
	var result;
	if(value == "" || parseFloat(value) == 0){
		if(variable == "iD"){
			result = 5.0;
			document.getElementById("inner_diameter_other").value = "5.0";
		} else if(variable == "d"){
			result =  2.1;
			document.getElementById("inner_diameter_column").value = "2.1";
		} else if(variable == "L"){
			result =  20.0;
			document.getElementById("length_column").value = "20.0";
		} else if(variable == "Vinj"){
			result =  5.0;
			document.getElementById("injection_volume_chrom").value = "5.0";
		} else if(variable == "fR"){
			result =  2.5;
			document.getElementById("flow_rate_chrom").value = "2.5";
		} else if(variable == "Ee"){
			result = 0.36;
			document.getElementById("interparticle_porosity_column").value = "0.36";
		} else if(variable == "El"){
			result = 0.4;
			document.getElementById("intraparticle_porosity_column").value = "0.4";
		} else if(variable == "dP"){
			result = 1.9;
			document.getElementById("particle_size_column").value = "1.9";
		} else if(variable == "A"){
			result = 1.0;
			document.getElementById("A_column").value = "1.0";
		} else if(variable == "B"){
			result = 5.0;
			document.getElementById("B_column").value = "5.0";
		} else if(variable == "C"){
			result = 0.05;
			document.getElementById("C_column").value = "0.05";
		} else if(variable == "tau"){
			result = 0.1;
			document.getElementById("time_constant_general").value = "0.1";
		}
	} else {
		result = parseFloat(value);
	}
	return result;
}

function checkIfValid_blank(variable, value){
	log("Running 'checkIfValid_blank("+variable+", "+value+")'...");
	var result;
	if(value == ""){
		if(variable == "l"){
			result = 0.0;
			document.getElementById("other_length").value = "0.0";
		} else if(variable == "T"){
			result = 60;
			document.getElementById("temperature_chrom").value = "60";
		} else if(variable == "phi"){
			result = 30;
			document.getElementById("solvent_fraction_comp").value = "30";
		}
	} else {
		result = parseFloat(value);
	}
	return result;
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

//Reduced plate height

function theoreticalPlates(h, dP, L) {
	log("Running 'theoreticalPlates("+h+", "+dP+", "+L+")'...");
	//h = reduced plate height
	//dP = diameter of stationary phase particles
	//L = column length
	//HETP = height equivalent to a theoretical plate
	// ADDRESS THIS
	//h=2.021449731771019;
	var HETP = h*(dP/10000);
	var N = (L/10)/HETP;
	return [HETP, N];
}

//Isocratic elution mode

//isocratic retention factors
function isocraticRetentionFactor(T, A, B, a, b, phi) {
	log("Running 'isocraticRetentionFactor("+T+", "+A+", "+B+", "+a+", "+b+", "+phi+")'...");
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
	log("Running 'retentionTime("+t0+", "+k+")'...");
	//t0 = void time
	//k = isocratic retention factor
	var tR = t0/(1+k);
	return tR;
}

//isocratic peak width
function isocraticPeakWidth(tR, N, Vinj, F, tau) {
	log("Running 'isocraticPeakWidth("+tR+", "+N+", "+Vinj+", "+F+", "+tau+")'...");
	//tR = retention time of each compound
	//N = theoretical plate number
	//Vinj = injection volume
	//F = volumetric flow rate
	//tau = detector line constant
	var omegaT = Math.pow(Math.pow(tR/Math.pow(N, 1/2), 2) + Math.pow(tau, 2) + 1/12*Math.pow(Vinj/F, 2), 1/2);
	return omegaT;
}

function tubingVolume(length, diameter) {
	log("Running 'tubingVolume("+length+", "+diameter+")'...");
    var volume = (length / 100) * (Math.PI * Math.pow((diameter * 0.0000254) / 2, 2) * 1000000000);
    return volume;
}

/*function isocraticRetentionFactor(compoundName, solvent) {
	log("Running 'isocraticRetentionFactor("+compoundName+", "+solvent+")'...");
	if (solvent == "Methanol") {
		return (calcKMeOH[compoundName]);
	} else {
		return (calcKACN[compoundName]);
	}	
}*/

/*function solventSensitivityFactor(compoundName, solvent) {
	log("Running 'solventSensitivityFactor("+compoundName+", "+solvent+")'...");
	if (solvent == "Methanol") {
		return (calcSMeOH[compoundName]);
	} else {
		return (calcSACN[compoundName]);
	}
}*/

/*function getMolarVolume(compound) {
	log("Running 'getMolarVolume("+compound+")'...");
	var MolarVolumeArray = {
		"N-benzylformamide" : 156.1,
		"benzylalcohol" : 125.6,
		"phenol" : 103.4,
		"3-phenylpropanol" : 170,
		"acetophenone" : 140.4,
		"benzonitrile" : 122.7,
		"p-chlorophenol" : 124.3,
		"nitrobenzene" : 122.7,
		"methylbenzoate" : 151.2,
		"anisole" : 128.1,
		"benzene" : 96,
		"p-nitrotoluene" : 144.9,
		"p-nitrobenzylchloride" : 165.8,
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
}*/

/*function calctR(t0, T, phi, compoundName, solvent) {
	log("Running 'calctR("+t0+", "+T+", "+phi+", "+compoundName+", "+solvent+")'...");
	var Tconst = isocraticRetentionFactor(compoundName, solvent);
	var Sconst = solventSensitivityFactor(compoundName, solvent);
	var S = -1*(Sconst[0] + Sconst[1]*T);
	var logkw = Tconst[0] + Tconst[1]*T;
	var k = Math.pow(10, (logkw - S*phi));
	//check with Dwight, should be division?
	return t0*(1+k);
}*/

function calcKprime(t0, T, phi, compoundName, solvent){
	log("Running 'calcKprime(t0 = "+t0+", T = "+T+", phi = "+phi+", compound = "+compoundName+", solvent = "+solvent+")'...");
	if (solvent == "Methanol") {
		var lnkwint = calcGradientMeOH[compoundName][0];
		var lnkwslope = calcGradientMeOH[compoundName][1];
		var Sint = calcGradientMeOH[compoundName][2];
		var Sslope = calcGradientMeOH[compoundName][3];
	} else {
		var lnkwint = calcGradientACN[compoundName][0];
		var lnkwslope = calcGradientACN[compoundName][1];
		var Sint = calcGradientACN[compoundName][2];
		var Sslope = calcGradientACN[compoundName][3];
	}
	
	var tKelvin = T + 273.15;
	
	var lnkw = (lnkwslope * tKelvin) + lnkwint;
	//console.log("lnkw = " + lnkw);
	
	var S = (Sslope * tKelvin) + Sint;
	//console.log("S = " + S);
	
	var lnk = lnkw - (S*(phi));
	//console.log("lnk = " + lnk);
	
	var k = Math.exp(lnk);
	//console.log("k = " + k);
	
	//var k = Math.pow(10, (logkw - S*phi));
	//console.log("k = " + k);
	
	var arr = [lnkw, S, k];
	
	return arr;
}


function isocraticSigma (tR, N, tau, Vinj, F, UsT) {
	log("Running 'isocraticSigma ("+tR+", "+N+", "+tau+", "+Vinj+", "+F+", "+UsT+")'...");
	var t1 = Math.pow((tR*60 / Math.pow(N, 1/2)), 2);
	var t2 = Math.pow(tau, 2);
		var t3 = (1/12)*Math.pow((Vinj/1000) / (F/60), 2);
	return Math.pow(t1 + t2 + t3 + UsT, 1/2);
}

function tubingTimeBroadening(volume, diameter, length, flowRate, diffusionCoefficient) {
	log("Running 'tubingTimeBroadening("+volume+", "+diameter+", "+length+", "+flowRate+", "+diffusionCoefficient+")'...");
	var tubingRadius = (diameter*0.000254)/2;
	var tubingOpenTubeVelocity = (flowRate / 60) / (Math.PI * Math.pow(tubingRadius, 2));
	var tubingZBroadening = (2 * diffusionCoefficient * length / tubingOpenTubeVelocity) + ((Math.pow(tubingRadius, 2) * length * tubingOpenTubeVelocity) / (24 * diffusionCoefficient));
	var tubingVolumeBroadening = Math.pow(Math.sqrt(tubingZBroadening) * Math.PI * Math.pow(tubingRadius, 2), 2);
	var tubingTimeBroadening = Math.pow((Math.sqrt(tubingVolumeBroadening) / flowRate) * 60, 2);
	return tubingTimeBroadening;
}

function isocraticElutionMode(t0, T, phi, N, tau, Vinj, F, solvent, compoundList, v, d, l, De) {
	var compoundName = Object.keys(compoundList);
	
	//console.log("Isocratic Elution Mode");
	
	compoundName = compoundList; // Change implemented by Ray Sajulga 6/2/17

	var graphData = [];
	var tF = 0.0;

	if (!document.getElementById("auto_time_check").checked) { tF = (parseFloat(document.getElementById("final_time_general").value))/60; }
	
	//console.log("tF = "+tF);
	
	var tableArray = new Array();
	var previous_tR = 0;

	var table = [];
	
	var max_final_time = 0;
	
	var resolution_maxTime = 1000;

	if (tF <= 0.0) {
		//time is determined automatically
		//var step = parseFloat((30/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3)); // OLD STEP SIZE EQUATION USING PLOT POINTS
		//var step = parseFloat(((60)/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3)); // NEW STEP SIZE EQUATION USING PLOT POINTS
		//console.log("step = "+step);
		
		// New Step Size Equation Using Detector Frequency
		//var detectorFrequency = parseFloat(document.getElementById("detectorFrequency_general").value).toFixed(5);
		//var step = ((1/detectorFrequency)/60);
		var step = getDetectorTimeStep();
		//console.log("detectorFrequency = "+detectorFrequency+" Hz");
		//console.log("step = "+(step*60)+" seconds");
		
		//step = .01;
		for (i = 0; i < compoundName.length; i++) {
			var cmpdData = [];
 
			var k = calcKprime(t0, T, phi, compoundName[i], solvent)[2];
			var tR = (t0/60)*(1+k);
			
			var UsT = tubingTimeBroadening(v, d, l, tR, De);
			
			var sigma = isocraticSigma(tR, N, tau, Vinj, F, UsT);

			var W = parseFloat(((Vinj/1000000)*(M[i])).toFixed(15));
			//W *= 1000000; 
			//var t = 0;
			//var t = (tR-(8*(sigma/60)));
			//t = Number((Math.floor(t/step)*step).toFixed(5));
			var t = Number((Math.floor((tR-(8*(sigma/60)))/step)*step).toFixed(5)); if (t < 0) { t = 0; }
			var tF = Number((Math.ceil((tR+(8*(sigma/60)))/step)*step).toFixed(5));
			//console.log("t = "+t); console.log("tF = "+tF); console.log(" ");

			var j = 0;
			//var check = true;
			//var check2 = true;
			//var loops = 0;
			var infinite_loop_breaker = false;
			//var tF = 0;
			

			var compoundArray = new Array();
			compoundArray[0] = compoundName[i];
			compoundArray[1] = k.toFixed(4);
			compoundArray[2] = tR;
			compoundArray[3] = sigma;
			compoundArray[4] = Math.exp(calcKprime(t0, T, phi, compoundName[i], solvent)[0]);
			compoundArray[5] = calcKprime(t0, T, phi, compoundName[i], solvent)[1].toFixed(4);
			tableArray[i] = compoundArray;

			table[i] = [];
			table[i][0] = compoundName[i];
			
			if(tF > max_final_time){
				max_final_time = tF;
			}
			
			while (t <= tF) {
				var Ct = 1000000*(W/1000000)/(Math.pow((2*Math.PI), 0.5)*(sigma/60)*(F/(60*1000)))*Math.exp(-Math.pow((t-tR),2)/(2*Math.pow((sigma/60), 2)));
				
				cmpdData[j] = {
					"t" : t,
					"Ct" : Ct
				};
				
				table[i][j+1]=Ct;
				t += step;
				j++;
				//loops++;
				
				/*if (loops > 10000000) {
					//alert("infinite loop");
					//alert(compoundName[i]+" did not elute!");
					console.log(compoundName[i]+" did not elute!");
					infinite_loop_breaker = true;
					break;
				}*/
				
				/*if (Ct > 0.01) {
					check = false;
				}*/
				
				/*if (check || Ct > 0.01) {
					tF += step;
				}*/
				
				/*if(check == false && Ct <= 0.01 && check2 == true){
					tF += (0.02 * tF);
					check2 = false;
				}*/
				
			}
			//console.log("tF = "+tF);
			//console.log("[automatic] loops = "+loops);
			//graphData[i] = cmpdData;
			if(infinite_loop_breaker){
				cmpdData = [];
				cmpdData[0] = {
					"t" : 0,
					"Ct" : 0
				};
			}
			//console.log(cmpdData);
			graphData[i] = cmpdData;
		}
		//for(i = 0; i < graphData.length; i++){
		//	console.log("graphData["+i+"].length = "+graphData[i].length);
		//}
		
		document.getElementById("initial_time_general").value = 0;
		document.getElementById("final_time_general").value = ((max_final_time*60)+0).toFixed(1);
		resolution_maxTime = (max_final_time*60)+0;
	} else {
		//time is set manually
		//var step = parseFloat(((60)/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));
		//var step = parseFloat((30/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));
		
		//var detectorFrequency = parseFloat(document.getElementById("detectorFrequency_general").value).toFixed(5);
		//var step = ((1/detectorFrequency)/60);
		var step = getDetectorTimeStep();
		
		for (i = 0; i < compoundName.length; i++) {
			var cmpdData = [];
 
			var k = calcKprime(t0, T, phi, compoundName[i], solvent)[2];
			var tR = (t0/60)*(1+k);
			
			var UsT = tubingTimeBroadening(v, d, l, tR, De);
			
			var sigma = isocraticSigma(tR, N, tau, Vinj, F, UsT);

			var W = parseFloat(((Vinj/1000000)*(M[i])).toFixed(15));
			//W *= 1000000; 
			var t = (parseFloat(document.getElementById("initial_time_general").value))/60;
			var j = 0;
			//var check = true;
			//var loops = 0;
			var infinite_loop_breaker = false;
			var running = true;
			//var tF = 0;

			var compoundArray = new Array();
			compoundArray[0] = compoundName[i];
			compoundArray[1] = k.toFixed(4);
			compoundArray[2] = tR;
			compoundArray[3] = sigma;
			compoundArray[4] = Math.exp(calcKprime(t0, T, phi, compoundName[i], solvent)[0]);
			compoundArray[5] = calcKprime(t0, T, phi, compoundName[i], solvent)[1].toFixed(4);
			tableArray[i] = compoundArray;

			table[i] = [];
			table[i][0] = compoundName[i];

			while (t <= tF && running) {
				//console.log("t = "+t)
				var Ct = 1000000*(W/1000000)/(Math.pow((2*Math.PI), 0.5)*(sigma/60)*(F/(60*1000)))*Math.exp(-Math.pow((t-tR),2)/(2*Math.pow((sigma/60), 2)));
				
				cmpdData[j] = {
					"t" : t,
					"Ct" : Ct
				};
				
				/*if (loops > 10000000) {
					//alert("infinite loop");
					//alert(compoundName[i]+" did not elute!");
					console.log(compoundName[i]+" did not elute!");
					infinite_loop_breaker = true;
					break;
				}
				if (Ct > 0.01) {
					check = false;
				}
				
				if (check || Ct > 0.01) {
					//running = true;
				} else {
					//running = false;
				} */
				
				table[i][j+1]=Ct;
				t += step;
				j++;
				//loops++;
			}
			//console.log("[manual] loops = "+loops);
			//graphData[i] = cmpdData;
			if(infinite_loop_breaker){
				cmpdData = [];
				cmpdData[0] = {
					"t" : 0,
					"Ct" : 0
				};
			}
			//console.log(cmpdData);
			graphData[i] = cmpdData;
		}
	}
	//console.log("----------");
	tableArray = tableArray.sort(compareSecondColumn);
	updateTable(tableArray);
	calcResolution(phi,T,resolution_maxTime,tableArray);
	graphData = updateGraphData(compoundName, tableArray, graphData);
	return graphData;
}

function compareSecondColumn(a, b) {
    if (Number(a[2]) === Number(b[2])) {
		return 0;
	} else {
		return (Number(a[2]) < Number(b[2])) ? -1 : 1;
	}
}

function updateGraphData(compoundName, tableArray, graphData){
	var newGraphData = [];
	for(i = 0; i < compoundName.length; i++){
		var compound = compoundName[i];
		var newPos = 0;
		for(j = 0; j < tableArray.length; j++){
			if(tableArray[i][0] == compoundName[j]){
				newPos = j;
				break;
			}
		}
		newGraphData[i] = graphData[newPos];
	}
	return newGraphData;
}

function gradient_calck(kw, S, phi){
	log("Running 'gradient_calck("+kw+", "+S+", "+phi+")'...");
	var lnk = Math.log(kw)-(S * phi);
	var k = Math.exp(lnk);
	return k;
}

function gradient_calcPhiAtTime(phi_i, phi_f, tG, t){
	log("Running 'gradient_calcPhiAtTime("+phi_i+", "+phi_f+", "+tG+", "+t+")'...");
	var slope = (phi_f - phi_i)/(tG);
	var phi_t = (slope*t)+phi_i;
	return phi_t;
}

function gradientElutionMode(solvent, T, phi_i, phi_f, tD, F, d, L, Et, tG, t0, N, tau, Vinj, V0){
	log("Running 'gradientElutionMode("+solvent+", "+T+", "+phi_i+", "+phi_f+", "+tD+", "+F+", "+d+", "+L+", "+Et+", "+tG+", "+t0+", "+N+", "+tau+", "+Vinj+", "+V0+")'...");
	var logProcess = true;
	if(logProcess){
		
	}
	
	Et /= 1000;
	t0 /= 60;
	var deltaPhi = (phi_f - phi_i)/100;
	phi_i /= 100;
	phi_f /= 100;
	
	var gradientSlope = deltaPhi/tG;
	
	//console.log("--------------------");
	
	//console.log("phi_i:\n"+phi_i);
	//console.log("phi_f:\n"+phi_f);
	//console.log("deltaPhi:\n"+deltaPhi);
	//console.log("tG:\n"+tG);
	
	//console.log("gradientSlope:\n"+gradientSlope);
	
	//console.log("phi_e = "+gradientSlope+"(tR-"+tD+"-"+t0+")+"+phi_i);
	
	//console.log("--------------------");
	
	var tKelvin = T + 273.15;
	
	var graphData = [];
	var tableArray = new Array();
	var previous_tR = 0;
	var table = [];
	
	//var step = .01;
	//var step = parseFloat(((60)/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));
	
	var tF_max = 0;
	
	var tF = 0.0;
	if (!document.getElementById("auto_time_check").checked) { tF = (parseFloat(document.getElementById("final_time_general").value))/60; }
	
	if (tF <= 0.0) {
		//time is determined automatically
		
		//var step = parseFloat(((60)/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));
		
		//var detectorFrequency = parseFloat(document.getElementById("detectorFrequency_general").value).toFixed(5);
		//var step = ((1/detectorFrequency)/60);
		var step = getDetectorTimeStep();
		
		for(i = 0; i < compoundList.length; i++){
			var cmpdData = [];
			var UsT = 0;
			var W = parseFloat(((Vinj/1000000)*(M[i])).toFixed(15));
			var cache = "";
			var compoundName = compoundList[i];
		
			var compound = compoundList[i];
		
			if(solvent == "Methanol"){
				var lnkw = (calcGradientMeOH[compound][1]*tKelvin)+calcGradientMeOH[compound][0];
				var S = (calcGradientMeOH[compound][3]*tKelvin)+calcGradientMeOH[compound][2];
			} else {
				var lnkw = (calcGradientACN[compound][1]*tKelvin)+calcGradientACN[compound][0];
				var S = (calcGradientACN[compound][3]*tKelvin)+calcGradientACN[compound][2];
			}
		
			var lnk0 = lnkw - (S*(phi_i));
			var k0 = Math.exp(lnk0);
    
			var b = (S*(phi_f-phi_i)*V0)/(F*tG);
    
			var step1 = k0-(tD/t0);
			var step2 = b * step1 + 1;
			var step3 = (t0/b)*Math.log(step2);
			var tR = t0 + tD + step3;
		
			var kw = Math.exp(lnkw);
			//var phi_e = (1/S)*Math.log((S*(deltaPhi/tG)*kw*t0*(k0-tD/t0)+1)/k0);
		
			if((tR-tD-t0) < 0 || (tR-tD-t0) > tG){
				var phi_e = phi_i;
			} else {
				var phi_e = gradientSlope*(tR-tD-t0)+phi_i;
			}
		
			var lnke = lnkw - (S*(phi_e));
			var ke = Math.exp(lnke);
		
			var sigma = Math.sqrt(Math.pow((t0*60)*((1+ke)/(Math.sqrt(N))), 2)+Math.pow(tau, 2));
		
			//var t = 0;
			//var t = tR - (8 * (sigma / 60));
			
			var t = Number((Math.floor((tR-(8*(sigma/60)))/step)*step).toFixed(5)); if(t < 0) { t = 0; }
			var tF = Number((Math.ceil((tR+(8*(sigma/60)))/step)*step).toFixed(5));
			//console.log("t = "+t); console.log("tF = "+tF); console.log(" ");
			
			var j = 0;
			//var check = true;
			//var loops = 0;
			//var tF = 0;
		
			var compoundArray = new Array();
			compoundArray[0] = compoundList[i];
			compoundArray[1] = ke.toFixed(4);
			compoundArray[2] = tR;
			compoundArray[3] = sigma;
			compoundArray[4] = Math.exp(lnkw);;
			compoundArray[5] = S.toFixed(4);
			tableArray[i] = compoundArray;
    
			table[i] = [];
			table[i][0] = compoundList[i];
		
			var finalRun = false;
		
			while (t <= tF) {
				var Ct = 1000000*(W/1000000)/(Math.pow((2*Math.PI), 0.5)*(sigma/60)*(F/(60*1000)))*Math.exp(-Math.pow((t-tR),2)/(2*Math.pow((sigma/60), 2)));
				
				cmpdData[j] = {
					"t" : t,
					"Ct" : Ct
				};
				
				/*if (loops > 10000000) {
					alert("infinite loop");
					break;
				}
				if (Ct > 0.00001) {
					check = false;
				}
				
				if(check == false && finalRun == false){
					//tF += 1;
					tF += (0.02 * tF);
					finalRun = true;
				}
				
				if (check || Ct > 0.00001) {
					tF += step;
				}*/
				
				table[i][j+1]=Ct;
				t += step;
				j++;
				//loops++;
			}
			if(tF > tF_max){
				tF_max = tF;
			}
		
			graphData[i] = cmpdData;
		}
	} else {
		//time is set manually
		
		//var step = parseFloat(((60)/parseFloat(document.getElementById("plot_points_general").value)).toFixed(3));
		
		//var detectorFrequency = parseFloat(document.getElementById("detectorFrequency_general").value).toFixed(5);
		//var step = ((1/detectorFrequency)/60);
		var step = getDetectorTimeStep();
		
		for(i = 0; i < compoundList.length; i++){
			var cmpdData = [];
			var UsT = 0;
			var W = parseFloat(((Vinj/1000000)*(M[i])).toFixed(15));
			var cache = "";
			var compoundName = compoundList[i];
		
			var compound = compoundList[i];
		
			if(solvent == "Methanol"){
				var lnkw = (calcGradientMeOH[compound][1]*tKelvin)+calcGradientMeOH[compound][0];
				var S = (calcGradientMeOH[compound][3]*tKelvin)+calcGradientMeOH[compound][2];
			} else {
				var lnkw = (calcGradientACN[compound][1]*tKelvin)+calcGradientACN[compound][0];
				var S = (calcGradientACN[compound][3]*tKelvin)+calcGradientACN[compound][2];
			}
		
			var lnk0 = lnkw - (S*(phi_i));
			var k0 = Math.exp(lnk0);
    
			var b = (S*(phi_f-phi_i)*V0)/(F*tG);
    
			var step1 = k0-(tD/t0);
			var step2 = b * step1 + 1;
			var step3 = (t0/b)*Math.log(step2);
			var tR = t0 + tD + step3;
		
			var kw = Math.exp(lnkw);
			//var phi_e = (1/S)*Math.log((S*(deltaPhi/tG)*kw*t0*(k0-tD/t0)+1)/k0);
		
			if((tR-tD-t0) < 0 || (tR-tD-t0) > tG){
				var phi_e = phi_i;
			} else {
				var phi_e = gradientSlope*(tR-tD-t0)+phi_i;
			}
		
			var lnke = lnkw - (S*(phi_e));
			var ke = Math.exp(lnke);
		
			var sigma = Math.sqrt(Math.pow((t0*60)*((1+ke)/(Math.sqrt(N))), 2)+Math.pow(tau, 2));
		
			//var t = 0;
			var t = (parseFloat(document.getElementById("initial_time_general").value))/60;
			var j = 0;
			//var check = true;
			//var loops = 0;
			//var tF = 0;
		
			var compoundArray = new Array();
			compoundArray[0] = compoundList[i];
			compoundArray[1] = ke.toFixed(4);
			compoundArray[2] = tR;
			compoundArray[3] = sigma;
			compoundArray[4] = Math.exp(lnkw);;
			compoundArray[5] = S.toFixed(4);
			tableArray[i] = compoundArray;
    
			table[i] = [];
			table[i][0] = compoundList[i];
		
			var finalRun = false;
		
			while (t <= tF) {
				var Ct = 1000000*(W/1000000)/(Math.pow((2*Math.PI), 0.5)*(sigma/60)*(F/(60*1000)))*Math.exp(-Math.pow((t-tR),2)/(2*Math.pow((sigma/60), 2)));
				
				cmpdData[j] = {
					"t" : t,
					"Ct" : Ct
				};
				
				/*if (loops > 10000000) {
					alert("infinite loop");
					break;
				}
				if (Ct > 0.00001) {
					check = false;
				}
				
				if(check == false && finalRun == false){
					//tF += 1;
					//tF += (0.02 * tF);
					finalRun = true;
				}
				
				
				if (check || Ct > 0.00001) {
					//tF += step;
				} */
				
				table[i][j+1]=Ct;
				t += step;
				j++;
				//loops++;
			}
			if(tF > tF_max){
				tF_max = tF;
			}
		
			graphData[i] = cmpdData;
		}
		
	}
	
	
	
	var percentB = [];
		
	for(t = 0; t <= tF_max; t+= step){
		
		if((t-tD-t0) < 0 || (t-tD-t0) > tG){
			var Ct = phi_i;
		} else {
			var Ct = gradientSlope*(t-tD-t0)+phi_i;
		}
		
		percentB[percentB.length] = {
			"t" : t,
			"Ct" : Ct
		};
	}
	
	console.log("tF_max = "+tF_max);
	
	//console.log(percentB);
	
	tableArray = tableArray.sort(compareSecondColumn);
	updateTable(tableArray);
	return graphData;
}

function testTable(data){
	log("Running 'testTable("+data+")'...");
	var myTable="<table id='testTable'>"
	row_length = data[0].length;
	max = 0;
	for (i = 0; i < data.length; i++){
		last_point = data[i].length;
		if (last_point > max){
			max = last_point
		}
	}
	for (i = 0; i < max; i++){
		myTable += "<tr>"
		for (j = 0; j < data.length; j++){
			if (typeof data[j][i] != "undefined"){
				myTable+= "<td>" + data[j][i] + "</td>";
			} else {
				myTable+= "<td></td>";
			}
		}
		myTable += "</tr>"
	}
	document.write(myTable);
}

function print(string){
	log("Running 'print("+string+")'...");
	document.write(" " + string + "<p></p>");
}

function updateTable(tabularData){
	log("Running 'updateTable("+tabularData+")'...");
	for (var y=0; y<compoundList.length; y++) {
  		for (var x=0; x<6; x++) {
  			if (2 <= x && x <5){
  				tabularData[y][x] = tabularData[y][x].toFixed(4);
  			}
  			id = "" + (y + 1) + "" + (x + 1);
    		document.getElementById(id).innerHTML = tabularData[y][x];
    	}
    }
}

function clickTable(item){
	/*
	if(item.className == "highlight"){
		var alreadyHighlighted = true;
	} else {
		var alreadyHighlighted = false;
	}
	if(document.getElementsByClassName("highlight").length > 0){
		document.getElementsByClassName("highlight")[0].className = "";
	}
	if(alreadyHighlighted == false){
		item.className = "highlight";
	}
	calculatePeaks();
	var selected = item.hasClass("highlight");
	$("#dataTable tbody tr").removeClass("highlight");
	$("#dataTable").removeClass();
	if(!selected){
		item.addClass("highlight");
		$('#dataTable').addClass(item.attr("id"));
	}
	*/
	console.log("Row "+ item.id +"Clicked!");
}

function displayTable(tabularData){
	log("Running 'displayTable("+tabularData+")'...");
	var myTable= "";
	for (var y=0; y<compoundList.length; y++) {
		myTable+="<tr id=" + y + ">";
		for (var x=0; x<6; x++) {
			myTable+="<td id=" + (y + 1) + "" + (x + 1) + "> </td>";
		}
		myTable+="</tr>";
	}
	document.getElementById("dataTable").innerHTML = myTable;
}

var optimize_max_resolution = 0;
var optimize_maxRs_phi = 0;
var optimize_maxRs_T = 0;
var optimize_min_time = 1000;

function calcResolution(Rs_solventBFraction, Rs_temperature, Rs_time, tableArray){
	//console.log("calcResolution(tableArray)");
	//console.log("----------");
	//console.log(tableArray);
	//console.log("Compound, k', tR(min), σ(s), kw, S\n");
	for(var tableArrayPos=0; tableArrayPos<(tableArray.length-1); tableArrayPos++){
		//console.log(tableArray[tableArrayPos]);
		//console.log("----------");
		//console.log("Compounds --> "+tableArray[tableArrayPos][0]+" & "+tableArray[tableArrayPos+1][0]);
		//console.log("tR1(min) --> "+tableArray[tableArrayPos][2]);
		//console.log("σ1(s) --> "+tableArray[tableArrayPos][3]);
		//console.log("tR2(min) --> "+tableArray[tableArrayPos+1][2]);
		//console.log("σ2(s) --> "+tableArray[tableArrayPos+1][3]);
		var trA = tableArray[tableArrayPos][2];
		var trB = tableArray[tableArrayPos+1][2];
		var wA = 4*(tableArray[tableArrayPos][3] / 60);
		var wB = 4*(tableArray[tableArrayPos+1][3] / 60);
		//console.log(trA+", "+trB+", "+wA+", "+wB);
		var resolution = 2*(trB-trA)/(wA+wB);
		//console.log(","+Rs_solventBFraction+","+Rs_temperature+","+resolution+","+Rs_time+",");
		
		if(Rs_time < optimize_min_time){
			if(resolution > optimize_max_resolution){
				optimize_max_resolution = resolution;
				optimize_maxRs_phi = Rs_solventBFraction;
				optimize_maxRs_T = Rs_temperature;
				optimize_min_time = Rs_time;
			}
		}
	}
	//console.log("----------");
}

function optimize(){
	optimize_max_resolution = 0;
	optimize_maxRs_phi = 0;
	optimize_maxRs_T = 0;
	var optimize_phi_initial = document.getElementById('solvent_fraction_comp').value;
	for(optimize_phi=0; optimize_phi<=100; optimize_phi++){
		document.getElementById('solvent_fraction_comp').value = optimize_phi;
		for(optimize_T=10; optimize_T<=150; optimize_T++){
			document.getElementById('temperature_chrom').value = optimize_T;
			calculatePeaks();
		}
	}
	document.getElementById('solvent_fraction_comp').value = optimize_phi_initial;
	calculatePeaks();
	console.log("Max Rs = "+optimize_max_resolution+" @ phi = "+optimize_maxRs_phi+" & T = "+optimize_maxRs_T+", time = "+optimize_min_time);
}

//consolidate calculations
function calculatePeaks() {
	
	//var calculatePeaks_Start = new Date();
	//var calculatePeaks_Start = performance.now();
	
	if(document.getElementById("plot_points_general").value < 100 || document.getElementById("plot_points_general").value == ""){ document.getElementById("plot_points_general").value = 100; }
	//Find Elution Mode
	var mode;
	if (document.getElementById("isocratic_radio").checked) {
		mode = "isocratic";
		hideGradientElutionStuffs("true");
		//document.getElementById("headerTable_k").innerHTML = "k&#39;";
		document.getElementById("headerTable_k").innerHTML = "k";
	} else {
		mode = "gradient";
		hideGradientElutionStuffs("false");
		document.getElementById("headerTable_k").innerHTML = "k<sub>e</sub>";
	}
	
	//Run value validation
	//if(document.getElementById("Gradient_MixingVolume").value == ""){ document.getElementById("Gradient_MixingVolume").value = 200; }
	//if(document.getElementById("Gradient_NonMixingVolume").value == ""){ document.getElementById("Gradient_NonMixingVolume").value = 200; }
	if(document.getElementById("Gradient_Delay_Volume").value == ""){ document.getElementById("Gradient_MixingVolume").value = 400; }
	
	if(document.getElementById('solvent_fraction_comp').value > 100){ document.getElementById('solvent_fraction_comp').value = 100; }
	if(document.getElementById('solvent_fraction_comp').value < 0){ document.getElementById('solvent_fraction_comp').value = 0; }
	
	if(document.getElementById("Gradient_Phi_Init").value > 100){ document.getElementById("Gradient_Phi_Init").value = 100; }
	if(document.getElementById("Gradient_Phi_Init").value < 0){ document.getElementById("Gradient_Phi_Init").value = 0; }
	
	if(document.getElementById("Gradient_Phi_Final").value > 100){ document.getElementById("Gradient_Phi_Final").value = 100; }
	if(document.getElementById("Gradient_Phi_Final").value < 0){ document.getElementById("Gradient_Phi_Final").value = 0; }
	
	if(document.getElementById('temperature_chrom').value > 150){ document.getElementById('temperature_chrom').value = 150; }
	if(document.getElementById('temperature_chrom').value < 10){ document.getElementById('temperature_chrom').value = 10; }
	
	if(document.getElementById("flow_rate_chrom").value > 8){ document.getElementById("flow_rate_chrom").value = 8; }
	if(document.getElementById("flow_rate_chrom").value < 0.05){ document.getElementById("flow_rate_chrom").value = 0.05; }
	
	if(document.getElementById("length_column").value < 1){ document.getElementById("length_column").value = 1; }
	
	if(document.getElementById("inner_diameter_column").value < 1){ document.getElementById("inner_diameter_column").value = 1; }
	
	if(document.getElementById("injection_volume_chrom").value < 0.1){ document.getElementById("injection_volume_chrom").value = 0.1; }
//============================================================================================================================================
	//Collect inputs from the user interface
	
	//var solvent = document.getElementById("solvent_b_text").innerHTML; //Organic Modifier
	var solvent = document.getElementById("solvent_b").value;
	
	var d = checkIfValid("d", document.getElementById('inner_diameter_column').value);	//*column diameter
	var L = checkIfValid("L", document.getElementById('length_column').value);	//*column length
	var Vinj = checkIfValid("Vinj", document.getElementById('injection_volume_chrom').value); //*injection volume
	var fR = checkIfValid("fR", document.getElementById("flow_rate_chrom").value); //flow rate
	
	//var gradient_mixingVolume = document.getElementById("Gradient_MixingVolume").value;
	//var gradient_nonMixingVolume = document.getElementById("Gradient_NonMixingVolume").value;
	
	var gradient_mixingVolume = document.getElementById("Gradient_Delay_Volume").value / 2;
	var gradient_nonMixingVolume = document.getElementById("Gradient_Delay_Volume").value / 2;
	
	var phi_i = document.getElementById("Gradient_Phi_Init").value;
	var phi_f = document.getElementById("Gradient_Phi_Final").value;
	
	var tG = document.getElementById("Gradient_Time").value;
	
	var Ee = checkIfValid("Ee", document.getElementById('interparticle_porosity_column').value); //interparticlePorosity(Ve, V);	//fraction of volume in column between stationary phase particles
	var El = checkIfValid("El", document.getElementById('intraparticle_porosity_column').value); //intraparticlePorosity(Vp, Vl);	//fraction of stationary phase particles occupied by eluent
	
	var dP = checkIfValid("dP", document.getElementById('particle_size_column').value);	//diameter of stationary phase particles
	
	var T = checkIfValid_blank("T", document.getElementById('temperature_chrom').value);	//temperature
	var phi = checkIfValid_blank("phi", document.getElementById('solvent_fraction_comp').value) / 100;		//volume fraction of organic modifier
	
	var A = checkIfValid("A", document.getElementById("A_column").value);	//*van Deemter coefficient
	var B = checkIfValid("B", document.getElementById("B_column").value);	//*van Deemter coefficient
	var C = checkIfValid("C", document.getElementById("C_column").value);	//*van Deemter coefficient
	
	var tau = checkIfValid("tau", document.getElementById("time_constant_general").value);
	
	var iD = checkIfValid("iD", document.getElementById("inner_diameter_other").value);	//inner diameter
	var l = checkIfValid_blank("l", document.getElementById("other_length").value);	//post column tubing
	var v = tubingVolume(l, iD);
	//document.getElementById("volume_other").innerHTML = v.toFixed(5);
	
//============================================================================================================================================
	//Run calculations and update user interface
	
	/*console.log("phi = "+phi);
	if(phi < 0.3){
		console.log("phi << 0.3");
		console.log("plot points = "+(phi*10000));
		document.getElementById("plot_points_general").value = (phi*10000).toFixed(0);
	} else {
		console.log("phi >= 0.3");
		console.log("plot points = 3000");
		document.getElementById("plot_points_general").value = 3000;
	}*/
	
	var VD = Number(gradient_mixingVolume) + Number(gradient_nonMixingVolume); //Dwell volume
	var tD = (((Number(gradient_mixingVolume)/1000) + (Number(gradient_nonMixingVolume)/1000))/Number(fR)); //Dwell time
	//document.getElementById("Gradient_PreColumn_Volume_DwellVolume").innerHTML = VD;
	document.getElementById("Gradient_PreColumn_Volume_DwellTime").innerHTML = tD.toFixed(2);
	
	if(tG <= 0){ tG = 0.01; document.getElementById("Gradient_Time").value = 0.01; } //Gradient Time
	
	var Et = Ee + El*(1-Ee); //total porosity
	document.getElementById("total_porosity_column").innerHTML = Et.toFixed(4);
	
	var V0 = Math.PI*Math.pow(((d/10)/2), 2)*(L/10)*Et; //void volume
	var t0 = V0/fR*60; //void time
	document.getElementById("void_volume_column").innerHTML = V0.toFixed(4);
	document.getElementById("void_time_column").innerHTML = t0.toFixed(4);

	if(mode == "isocratic"){
		if(solvent == "Acetonitrile"){
			var n = Math.exp(phi*(-3.476+( 726/(T+273.15)))+(1-phi)*(-5.414+(1566/(T+273.15)))+phi*(1-phi)*(-1.762+( 929/(T+273.15)))); //viscosity - acetonitrile
		} else if(solvent == "Methanol"){
			var n = Math.exp(phi*(-4.597+(1211/(T+273.15)))+(1-phi)*(-5.961+(1736/(T+273.15)))+phi*(1-phi)*(-6.215+(2809/(T+273.15)))); //viscosity - methanol
		}
	} else if(mode == "gradient"){
		var n = 0;
		var phi_Tmp_count = 0;
		//console.log("phi_i = " + phi_i);
		//console.log("phi_f = " + phi_f);
		for(phi_Tmp = phi_i/100; phi_Tmp <= phi_f/100; phi_Tmp+=0.01){
			if(solvent == "Acetonitrile"){
				n += Math.exp(phi_Tmp*(-3.476+( 726/(T+273.15)))+(1-phi_Tmp)*(-5.414+(1566/(T+273.15)))+phi_Tmp*(1-phi_Tmp)*(-1.762+( 929/(T+273.15)))); //viscosity - acetonitrile
			} else if(solvent == "Methanol"){
				n += Math.exp(phi_Tmp*(-4.597+(1211/(T+273.15)))+(1-phi_Tmp)*(-5.961+(1736/(T+273.15)))+phi_Tmp*(1-phi_Tmp)*(-6.215+(2809/(T+273.15)))); //viscosity - methanol
			}
			phi_Tmp_count += 1;
		}
		//console.log("n = " + n);
		//console.log("phi_Tmp_count = " + phi_Tmp_count);
		n = n / phi_Tmp_count;
		//console.log("n = " + n);
	}
	
	//console.log("n = " + n);
	document.getElementById("eluent_viscosity_general").innerHTML = n.toFixed(4);
	
	var associationParameter = ((1 - phi) * (2.6 - 1.9)) + 1.9;	//association parameter
	
	var Morg;	//molecular weight of the organic modifier
	if (solvent == "Methanol") { Morg = 32.04; /*Methanol*/ } else { Morg = 41.05; /*Acetonitrile*/ }
	
	var Msolv = phi * (Morg - 18) +18; //molecular weight of the solvent
	
	var Vm = 200; //molar volume of the solute
	//Currently, 200 g/mol is just a representitive value. Will add full functionality soon. -Thomas Lauer 03/06/2018
	
	var De = 0.000000074*(((T + 273.15)*Math.sqrt(associationParameter*Msolv))/(n*Math.pow(Vm, 0.6))); //average analyte diffusion coefficient
	document.getElementById("avg_diffusion_coefficient_general").innerHTML = De.toExponential(4);
	
	var Us = (fR/60)/((Math.PI * Math.pow((d/10), 2))/4); //open tube flow velocity
	var Ue = Us/Ee; //interstitial flow velocity
	var U = Us/Et; //chromatographic flow velocity
	var V = Ue*(dP/10000)/De; //reduced velocity
	document.getElementById("open_tube_flow_velocity").innerHTML = Us.toFixed(4);
	document.getElementById("intersitial_flow_velocity").innerHTML = Ue.toFixed(4);
	document.getElementById("chromatographic_flow_velocity").innerHTML = U.toFixed(4);
	document.getElementById("reduced_flow_velocity").innerHTML = V.toFixed(4);
	
	var deltaP = 180*((Us*n*(L/10)*Math.pow((1-Ee), 2))/(Math.pow(Ee, 3)*Math.pow(dP, 2)));		//backpressure
	document.getElementById("backpressure_chrom").innerHTML = (deltaP).toFixed(2);
	
	var h = A+(B/V)+(C*V);	//reduced plate height
	document.getElementById("reduced_plate_height_column").innerHTML = parseFloat(h).toFixed(4);
	
	var NHETP = theoreticalPlates(h, dP, L);	//theoretical plate number
	document.getElementById("HETP_chrom").innerHTML = NHETP[0] .toExponential(4);
	
	var N = NHETP[1]; //number of theoretical plates
	document.getElementById("theoretical_plates_chrom").innerHTML = Math.floor(N);
	
//============================================================================================================================================
	//Run elution mode specific calculations
	
	var data;
	if (mode == "isocratic") {
		data = isocraticElutionMode(t0, T, phi, N, tau, Vinj, fR, solvent, compoundList, v, d, l, De);
	} else {
		data = gradientElutionMode(solvent, T, phi_i, phi_f, tD, fR, d, L, Et, tG, t0, N, tau, Vinj, V0);
	}
	
//============================================================================================================================================
	//Render the graph and run final user interface updates
	
	var renderGraphDots = document.getElementById("renderGraph_dots_check").checked;
	renderGraph(data, renderGraphDots);
	//var useNewRenderGraphFunction = document.getElementById("renderGraph_newFunction_check").checked;
	
	/*if(useNewRenderGraphFunction){
		renderGraph_new(data, renderGraphDots);
	} else {
		renderGraph(data, renderGraphDots);
	}*/
	
	
	//document.getElementById('GenRandExpBtn').disabled = false;
	
	//refreshPreloadedCompounds();
	//refreshNowloadedCompounds();
	
	if(compoundList.length == Object.keys(calcGradientACN).length){
		//document.getElementById("loadAllCompounds_button").disabled = true;
		//document.getElementById("preloaded").disabled = true;
	} else {
		//document.getElementById("loadAllCompounds_button").disabled = false;
		//document.getElementById("preloaded").disabled = false;
	}
	
	if(compoundList.length <= 1){
		//document.getElementById("now_loaded").disabled = true;
	} else {
		//document.getElementById("now_loaded").disabled = false;
	}
	
	//var calculatePeaks_End = new Date();
	//var calculatePeaks_End = performance.now();
	
	//var calculatePeaks_Duration = (calculatePeaks_End.getTime() - calculatePeaks_Start.getTime());
	//var calculatePeaks_Duration = (calculatePeaks_End - calculatePeaks_Start);
	
	//console.log("calculatePeaks runtime = "+calculatePeaks_Duration+" milliseconds"); console.log(" ");
	//console.log(calculatePeaks_Duration);
} 

function measureCalcDuration(numRepeats){
	//Without points
	console.log("Running 'Without points'...");
	document.getElementById("renderGraph_dots_check").checked = false;
	var durationArray_withoutPoints = []; var durationSum_withoutPoints = 0;
	for(var i = 0; i < numRepeats; i++){
		//console.log(""+(i+1)+"/"+numRepeats);
		
		var calculatePeaks_Start = performance.now();
		calculatePeaks();
		var calculatePeaks_End = performance.now();
		
		durationArray_withoutPoints[i] = (calculatePeaks_End - calculatePeaks_Start);
		durationSum_withoutPoints += (calculatePeaks_End - calculatePeaks_Start);
	}
	console.log(durationArray_withoutPoints); console.log(" ");
	
	//With points
	console.log("Running 'With points'...");
	document.getElementById("renderGraph_dots_check").checked = true;
	var durationArray_withPoints = []; var durationSum_withPoints = 0;
	for(var i = 0; i < numRepeats; i++){
		//console.log(""+(i+1)+"/"+numRepeats);
		
		var calculatePeaks_Start = performance.now();
		calculatePeaks();
		var calculatePeaks_End = performance.now();
		
		durationArray_withPoints[i] = (calculatePeaks_End - calculatePeaks_Start);
		durationSum_withPoints += (calculatePeaks_End - calculatePeaks_Start);
	}
	console.log(durationArray_withPoints); console.log(" ");
	
	console.log(" ");
	
	console.log("Without points Avg = "+average(durationArray_withoutPoints)+" milliseconds");
	console.log("Without points StDev = "+standardDeviation(durationArray_withoutPoints)+" milliseconds");
	console.log(" ");
	console.log("With points Avg = "+average(durationArray_withPoints)+" milliseconds");
	console.log("With points StDev = "+standardDeviation(durationArray_withPoints)+" milliseconds");
	
	
}

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function load() {
	
	calcGradientACN = calcGradientACN_Agilent_SBC18;
	calcGradientMeOH = calcGradientMeOH_Agilent_SBC18;
	
	log("Running 'load()'...");
	var sliders = document.getElementsByClassName("slider_ticks");
	var i;
	for (i = 0; i < sliders.length; i++) {
		loadSlider(sliders[i].id);
	}
	var raw_compounds = Object.keys(calcGradientACN);
	var compounds = [];
	for(k = 0; k < raw_compounds.length; k++){
		var listed = checkIfCompoundIsListed(raw_compounds[k]);
		if(listed == false){
			var arrayPos = compounds.length;
			compounds[arrayPos] = raw_compounds[k];
		}
	}
			
	//document.getElementById("preloaded_dropdown").innerHTML = "";
		
	/*for (i = 0; i < compounds.length; i++) {
		var html = document.getElementById("preloaded_dropdown").innerHTML;
		document.getElementById("preloaded_dropdown").innerHTML = html + "<a id="+ compounds[i].replace(/ /g,"_") +"_menu_option onclick=addCompoundToList('" + compounds[i] + "') class='dropbutton'>"+ compounds[i] +"</a>"
	}*/
	//log("preloaded_dropdown innerHTML has been updated!");
	/*for (i = 0; i < compounds.length; i++) {
		var save = compounds[i].replace(/ /g,"_");
		document.getElementById(save+"_menu_option").onClick = "select_option('"+ compounds[i] +"', 'preloaded')";
	}*/
	//refreshNowloadedCompounds();
	
	updateCompoundsTable("ACN");
	
	displayTable();
	calculatePeaks();
}



