export function createPlotDataObject(inputObj) {
  let plotDataObj = { type: 'scatter', marker: {}, line: {} };

  if(!inputObj.xValues) { throw new Error("Input object must have a value for 'xValues'"); } plotDataObj.x = inputObj.xValues;
  if(!inputObj.yValues) { throw new Error("Input object must have a value for 'yValues'"); } plotDataObj.y = inputObj.yValues;

  if(inputObj.name) { plotDataObj.name = inputObj.name; }
  if(inputObj.color) { plotDataObj.marker.color = inputObj.color; plotDataObj.line.color = inputObj.color; }

  plotDataObj.showlegend = false; if(inputObj.showlegend) { plotDataObj.showlegend = inputObj.showlegend; }
  plotDataObj.legendrank = false; if(inputObj.legendrank) { plotDataObj.legendrank = inputObj.legendrank; }
  plotDataObj.mode = 'lines'; if(inputObj.mode) { plotDataObj.mode = inputObj.mode; }
  plotDataObj.yaxis = 'y'; if(inputObj.yaxis) { plotDataObj.yaxis = inputObj.yaxis; }
  plotDataObj.marker.size = 3; if(inputObj.markerSize) { plotDataObj.marker.size = inputObj.markerSize; }
  plotDataObj.line.width = 2; if(inputObj.lineWidth) { plotDataObj.line.width = inputObj.lineWidth; }

  return plotDataObj;
};