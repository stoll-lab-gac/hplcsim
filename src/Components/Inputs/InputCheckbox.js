export function InputCheckbox({
  label,
  isChecked=true,
  onChange,
  disabled=false
}) {

  let labelSpan = [];
  if(disabled) {
    labelSpan.push(<span key={0} style={{ gridArea: 'b', textAlign: 'left', fontSize: 'var(--fontSize)', fontWeight: 'bold', width: '95%', textDecoration: 'line-through'}}>{label} </span>);
    //text-decoration: line-through
  } else {
    labelSpan.push(<span key={0} style={{ gridArea: 'b', textAlign: 'left', fontSize: 'var(--fontSize)', fontWeight: 'bold', width: '95%'}}>{label} </span>);
  }

  return (
    <>
    <div className='InputCheckbox' style={
      { 
        display: 'grid', 
        // a b c
        gridTemplateAreas: "'a b b'",
        gridTemplateColumns: '1fr 2fr 2fr',
        gridTemplateRows: 'auto',
        alignItems: 'center',
        justifyItems: 'center',
        height: 'auto',
        width: '100%',
        marginBottom: '5px'
      }}>
      {labelSpan}
      <input style={{ gridArea: 'a'}}
        type="checkbox"
        checked={isChecked}
        onChange={val=>onChange(!isChecked)}
        disabled={disabled}
      />
    </div>
    
    </>
  );

}