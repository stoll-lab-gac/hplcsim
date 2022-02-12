export function InputSelect({
  label,
  values,
  selectedValue,
  onChange,
  disabled=false
}) {

  const options = values.map((value)=>
    <option value={value} key={value}>{value}</option>
  );

  //onChange={(e) => onChange({tag}, e.target.value)}
  return (
    <div className='InputSelect' style={
      { 
        display: 'grid', 
        // a b c
        gridTemplateAreas: "'a b b'",
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
        height: '100%',
        width: '100%',
        marginBottom: '5px'
      }}>
      <span style={{ gridArea: 'a', textAlign: 'center'}}>{label} </span>
      <select style={{ gridArea: 'b', width: '95%'}}
        value={values[selectedValue]}
        onChange={onChange}
        disabled={disabled}
      >
        {options}
      </select>
    </div>
  );

}