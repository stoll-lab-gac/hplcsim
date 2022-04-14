export function ResultsTable({
  compoundResultsObject,
  useGradient
}) {

  let compoundResults = [];

  let compoundResultsObjectKeys = Object.keys(compoundResultsObject);
  for(let i = 0; i < compoundResultsObjectKeys.length; i++) {
    const compoundName = compoundResultsObjectKeys[i];
    let tmpCompoundResults = compoundResultsObject[compoundName];
    tmpCompoundResults.compoundName = compoundName;
    compoundResults.push(tmpCompoundResults);
  }

  compoundResults.sort(function (a, b) { return a.retentionTime - b.retentionTime; });

  console.log(compoundResults);

  let resultsRows = [];
  if(useGradient){
    resultsRows.push(<tr>
      <th>Compound</th>
      <th>k<sub>e</sub></th>
      <th>t<sub>R</sub> (min)</th>
      <th>σ (s)</th>
      <th>k<sub>w</sub></th>
      <th>S</th>
    </tr>);
  } else {
    resultsRows.push(<tr>
      <th>Compound</th>
      <th>k</th>
      <th>t<sub>R</sub> (min)</th>
      <th>σ (s)</th>
      <th>k<sub>w</sub></th>
      <th>S</th>
    </tr>);
  }
  
  for(let i = 0; i < compoundResults.length; i++) {
    const tmpCompoundResults = compoundResults[i];
    resultsRows.push(<tr>
      <td>{tmpCompoundResults.compoundName}</td>
      <td>{tmpCompoundResults.retentionFactor.toFixed(4)}</td>
      <td>{(tmpCompoundResults.retentionTime/60).toFixed(4)}</td>
      <td>{tmpCompoundResults.peakWidth.toFixed(4)}</td>
      <td>{Math.exp(tmpCompoundResults.lnRetentionFactorWater).toFixed(4)}</td>
      <td>{tmpCompoundResults.solventSensitivityFactor.toFixed(4)}</td>
    </tr>);
  }

  return (
    <table style={{
      textAlign: 'center'
    }}>
      {resultsRows}
    </table>
  );

}