import { format } from 'd3-format';

export function OutputNumber({ label, unit, formatting, value }){

  let returnLabel = (<><span style={{ gridArea: 'a', textAlign: 'center'}}></span></>);
  if(label){ returnLabel = (<><span style={{ gridArea: 'a', textAlign: 'center', fontSize: 'var(--fontSize)', fontWeight: 'bold'}}><label htmlFor={label}>{label} </label></span></>); }

  let returnUnit = (<><span style={{ gridArea: 'c'}}></span></>);
  if(unit){ returnUnit = (<><span style={{ gridArea: 'c', fontSize: 'var(--fontSize)'}}>{unit}</span></>); }

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
      <span style={{ gridArea: 'b', width: '90%', fontSize: 'var(--fontSize)'}}>{value ? (formatting ? format(formatting)(value) : value) : "Loading..."}</span>
      {unit && returnUnit}
    </div>
  )
}