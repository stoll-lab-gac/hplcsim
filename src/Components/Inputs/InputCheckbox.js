export function InputCheckbox({
  label,
  isChecked=true,
  onChange,
  disabled=false
}) {

  return (
    <>
    <div className='InputSelect' style={
      { 
        display: 'grid', 
        // a b c
        gridTemplateAreas: "'a b b'",
        gridTemplateColumns: '1fr 2fr 2fr',
        gridTemplateRows: 'auto',
        alignItems: 'center',
        justifyItems: 'center',
        height: '100%',
        width: '100%',
        marginBottom: '5px'
      }}>
      <span style={{ gridArea: 'b', textAlign: 'left', fontSize: 'var(--fontSize)', fontWeight: 'bold', width: '95%'}}>{label} </span>
      <input style={{ gridArea: 'a'}}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
    
    </>
  );

}