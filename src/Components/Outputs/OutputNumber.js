export function OutputNumber({ label, unit, value }){

  let returnLabel = (<><span style={{ gridArea: 'a', textAlign: 'center'}}></span></>);
  if(label){ returnLabel = (<><span style={{ gridArea: 'a', textAlign: 'center'}}><label htmlFor={label}>{label} </label></span></>); }

  let returnUnit = (<><span style={{ gridArea: 'c'}}></span></>);
  if(unit){ returnUnit = (<><span style={{ gridArea: 'c'}}>{unit}</span></>); }

  return (
    <div className='InputNumber' style={
      { 
        display: 'grid', 
        // a b c
        gridTemplateAreas: "'a b c'",
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginBottom: '5px'
      }}>
      {label && returnLabel}
      <span style={{ gridArea: 'b', width: '90%'}}>{value}</span>
      {unit && returnUnit}
    </div>
  )
}