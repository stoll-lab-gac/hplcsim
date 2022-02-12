import { LabeledInput } from '../Inputs/LabeledInput';
//import { format } from 'd3-format';


export function MenuColumn({
  columns,
  selectedColumn,
  length,
  innerDiameter,
  particleSize,
  epsilonI,
  epsilonE,
  vanDeemterA,
  vanDeemterB,
  vanDeemterC,
  onChange
}) {

  const columnOptions = columns.map((value)=>
    <option value={value} key={value}>{value}</option>
  );

  return (
    <>
      <span>Stationary Phase </span>
      <select
        value={columns[selectedColumn]}
        onChange={(e) => onChange('selected-column', e.target.value)}
        >
        {columnOptions}
      </select>
      <br />
      <br />
      <LabeledInput
        label='Length'
        unit='mm'
        value={length}
        verify={a => a >= 1 && a <= 1000}
        onChange={(val)=>onChange('length', val)}  />
      <LabeledInput
        label='Inner Diameter'
        unit='mm'
        value={innerDiameter}
        verify={a => a >= 1 && a <= 1000}
        onChange={(val)=>onChange('inner-diameter', val)}  />
      <LabeledInput
        label='Particle Size'
        unit='µm'
        value={particleSize}
        verify={a => a >= 1 && a <= 1000}
        onChange={(val)=>onChange('particle-size', val)}  />
      <LabeledInput
        label='Interparticle Porosity'
        unit=''
        value={epsilonI}
        verify={a => a >= 0 && a <= 1}
        onChange={(val)=>onChange('epsiloni', val)}  />
      <LabeledInput
        label='Intraparticle Porosity'
        unit=''
        value={epsilonE}
        verify={a => a >= 0 && a <= 1}
        onChange={(val)=>onChange('epsilone', val)}  />
      <br />
      <LabeledInput
        label='VanDeemter A'
        unit=''
        value={vanDeemterA}
        verify={a => a >= 0.01 && a <= 10}
        onChange={(val)=>onChange('vanDeemter-A', val)}  />
      <LabeledInput
        label='VanDeemter B'
        unit=''
        value={vanDeemterB}
        verify={a => a >= 0.01 && a <= 10}
        onChange={(val)=>onChange('vanDeemter-B', val)}  />
      <LabeledInput
        label='VanDeemter C'
        unit=''
        value={vanDeemterC}
        verify={a => a >= 0.01 && a <= 10}
        onChange={(val)=>onChange('vanDeemter-C', val)}  />
      <br />
    </>
  );
}