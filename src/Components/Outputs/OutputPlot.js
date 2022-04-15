import { useState, useEffect, useRef } from "react";
import Plot from 'react-plotly.js';

export const OutputPlot = ({plotData, timeMax, heightMax}) => {
  const divRef = useRef();

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const getDivSize = () => {
    const newWidth = divRef.current.clientWidth;
    setWidth(newWidth);

    const newHeight = divRef.current.clientHeight;
    setHeight(newHeight);
  };

  useEffect(() => {
    getDivSize();
  }, [plotData]);

  useEffect(() => {
    window.addEventListener("resize", getDivSize);
  }, []);

  console.log("Width: " + width);
  console.log("Height: " + height);

  return (
    <div id="graph" ref={divRef}>
      <Plot
        data={plotData}
        layout={{
          autosize: true,
          width: width,
          height: height,
          margin: {
            l: 80,
            r: 80,
            b: 50,
            t: 20,
            pad: 5
          },
          xaxis: {
            range: [0, timeMax/60],
            title: 'Time (min)',
          },
          yaxis: {
            range: [0, heightMax],
            title: 'Signal (mAU)',
          },
          yaxis2: {
            range: [0, 100],
            title: 'Solvent B Fraction (% v/v)',
            overlaying: 'y',
            side: 'right'
          }
        }}
      />
      </div>
  );
}