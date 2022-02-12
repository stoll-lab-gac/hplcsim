import { LabeledInput } from './LabeledInput';
import { format } from 'd3-format';


export function MenuChromatographic({
  temperature,
  injectionVolume,
  flowRate,
  onChange
}) {

  return (
    <>
    <LabeledInput
        label='Temperature'
        unit='°C'
        value={temperature}
        verify={a => a >= 10 && a <= 150}
        onChange={(val)=>onChange('temperature', val)}  />
    <br />
    <LabeledInput
        label='Injection Volume'
        unit='µL'
        value={injectionVolume}
        verify={a => a >= 1 && a <= 100}
        onChange={(val)=>onChange('injection-volume', val)}  />
    <br />
    <LabeledInput
        label='Flow Rate'
        unit='mL/min'
        value={flowRate}
        verify={a => a >= 0.1 && a <= 10}
        onChange={(val)=>onChange('flow-rate', val)}  />
    </>
  );
}