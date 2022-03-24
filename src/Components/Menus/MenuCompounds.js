import { InputNumber } from '../Inputs/InputNumber';

export function MenuCompounds({
  compounds,
  compoundList,
  onChangeConcentration
}) {

  const compoundNames = Object.keys(compounds);

  let compoundTable = [];

  console.log(compoundNames);
  for(let i = 0; i < compoundNames.length; i++) {
    const compoundName = compoundNames[i];
    const compound = compounds[compoundName];

    let compoundRowCheckbox = (<input type="checkbox"></input>);
    if(compoundList.includes(compoundNames[i])){
      compoundRowCheckbox = (<input type="checkbox" checked></input>);
    }
    

    compoundTable.push(
    <div style={{
      display: 'grid', 
        gridTemplateColumns: '1fr 5fr 3fr',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderBottom: '1px solid black',
        marginTop: '5px'
    }}>
      <div>
        {compoundRowCheckbox}
      </div>
      <div>{compoundNames[i]}</div>
      <div>
        <InputNumber
          value={compound.M}
          onChange={conc=>onChangeConcentration(compoundName, conc)}
        />
      </div>
    </div>
    );
  }

  return (
    <>
    <div style={{width: '100%'}}>
      {compoundTable}
    </div>
    </>
  );
}