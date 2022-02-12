import { InputNumber } from '../Inputs/InputNumber';
import { InputSelect } from '../Inputs/InputSelect';
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

  return (
    <>
      <InputSelect
        label='Stationary Phase'
        values={columns}
        selectedValue={selectedColumn}
        onChange={(e) => onChange('selected-column', e.target.value)}
      />
      <br />
      <InputNumber
        label='Length'
        unit='mm'
        value={length}
        verify={a => a >= 1 && a <= 1000}
        onChange={(val)=>onChange('length', val)}  />
      <InputNumber
        label='Inner Diameter'
        unit='mm'
        value={innerDiameter}
        verify={a => a >= 1 && a <= 1000}
        onChange={(val)=>onChange('inner-diameter', val)}  />
      <InputNumber
        label='Particle Size'
        unit='µm'
        value={particleSize}
        verify={a => a >= 1 && a <= 1000}
        onChange={(val)=>onChange('particle-size', val)}  />
      <InputNumber
        label='Interparticle Porosity'
        unit=''
        value={epsilonI}
        verify={a => a >= 0 && a <= 1}
        onChange={(val)=>onChange('epsiloni', val)}  />
      <InputNumber
        label='Intraparticle Porosity'
        unit=''
        value={epsilonE}
        verify={a => a >= 0 && a <= 1}
        onChange={(val)=>onChange('epsilone', val)}  />
      <br />
      <InputNumber
        label='VanDeemter A'
        unit=''
        value={vanDeemterA}
        verify={a => a >= 0.01 && a <= 10}
        onChange={(val)=>onChange('vanDeemter-A', val)}  />
      <InputNumber
        label='VanDeemter B'
        unit=''
        value={vanDeemterB}
        verify={a => a >= 0.01 && a <= 10}
        onChange={(val)=>onChange('vanDeemter-B', val)}  />
      <InputNumber
        label='VanDeemter C'
        unit=''
        value={vanDeemterC}
        verify={a => a >= 0.01 && a <= 10}
        onChange={(val)=>onChange('vanDeemter-C', val)}  />
      <br />
    </>
  );
}