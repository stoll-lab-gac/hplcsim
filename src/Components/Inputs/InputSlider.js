import { useState } from 'react';
import { useEffect } from 'react';

// defined up here so it has a constant reference
const defaultVerify = a => a > 0;

/**
 * Component consisting of 1) a label with text,
 * 2) a textbox, 3) a span with unit information
 *
 * @param {Object} props component props
 * @param {*} props.value value in text box
 * @param {string} props.label text before box
 * @param {any} props.onChange function to call with new value
 * @param {string} props.unit text after box, ex cm/mm/m
 * @param {number} props.step optional, default: 1, increment/decrement amount for arrows
 * @param {any} props.verify optional, default fails negatives, function that takes in
 * 1 parameter and returns boolean whether it is valid or not
 * @param {boolean} props.disabled whether or not the input can be changed
 */

export function InputSlider({
  value,
  label,
  unit,
  onChange,
  step = 1,
  min = 0,
  max = 100,
  verify = defaultVerify,
  inputType = 'number',
  disabled=false
}) {
  // precision to avoid floating point weirdness
  const PRECISION = 12;

  // whether the text in the field is valid input for the simulation
  // when false, the box will turn red
  const [valid, setValid] = useState(true);

  // stores as a buffer between output and text field
  // so that invalid inputs can be entered and not reset immediately
  // so someone can type 0.5 without getting stuck on the 0 part
  const [field, setField] = useState(value);

  // on external value change, set field to it if they are not equal
  useEffect(()=>{
    setField(inputType === 'number' ? Number(Number(value).toFixed(PRECISION)) : value);
    setValid(verify(value))
  }, [value, inputType, verify]);

  // submit if valid and a new value
  const submit = () => { const newValue = inputType === 'number' ? Number(field) : field; if (valid && field !== value){ onChange(newValue); } }
  
  // submit on leave focus
  const handleOnBlur = () => { submit(); }
  
  // submit on enter key released
  const handleOnKeyUp = (e) => { if (e.key === 'Enter'){ submit(); } }

  // validate input, update field, pass to onChange if valid
  const handleOnChange = (event) => {
    // text in the input box
    const valueField = event.target.value; setField(valueField);
    if (inputType === 'number') { // validate
      // parse to number (avoid floating point error with tructation)
      const newValue = Number(Number(valueField).toFixed(PRECISION));
      // !isNan means value is NOT Not a Number, meaning it is a number safety check in case valueField is just an int
      if (!isNaN(newValue) && isFinite(newValue)) { setValid(verify(newValue)); } else { setValid(false); }
    } else if (inputType === 'text') { const valid = verify(valueField); setValid(valid); }
  };

  const handleOnMouseUp = () => { submit(); }

  const className = (valid ? "InputSliderValid" : "InputSliderInvalid") + ` label-${inputType} slider`;

  let returnLabel = (<><span style={{ gridArea: 'a', textAlign: 'center'}}></span></>);
  if(label){ returnLabel = (<><span style={{ gridArea: 'a', textAlign: 'center', fontSize: 'var(--fontSize)', fontWeight: 'bold'}}><label htmlFor={label}>{label} </label></span></>); }

  let returnUnit = (<><span style={{ gridArea: 'd'}}></span></>);
  if(unit){ returnUnit = (<><span style={{ gridArea: 'd', fontSize: 'var(--fontSize)'}}>{unit}</span></>); }

  return (
    <div className='InputSlider' style={
      { 
        display: 'grid', 
        // a b c
        gridTemplateAreas: "'a b b' 'a c d'",
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto auto',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginBottom: '5px'
      }}>
      {label && returnLabel}
      <input style={{ gridArea: 'b', width: '95%', marginBottom: '5px'}}
        disabled={disabled}
        autoComplete='off'
        className={className}
        type='range'
        min={min}
        max={max}
        value={field}
        step={step}
        onBlur={handleOnBlur}
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
        onMouseUp={handleOnMouseUp} />
      <input style={{ gridArea: 'c', width: '90%'}}
        disabled={disabled}
        autoComplete='off'
        className={className}
        type='text'
        value={field}
        step={step}
        onBlur={handleOnBlur}
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange} />
      {unit && returnUnit}
    </div>
  );
}
