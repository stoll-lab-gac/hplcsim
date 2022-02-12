import { InputNumber } from '../Inputs/InputNumber';
import { InputSlider } from '../Inputs/InputSlider';

import { OutputNumber } from '../Outputs/OutputNumber';

export function MenuChromatographic({
  temperature,
  injectionVolume,
  flowRate,
  fVel_OpenTube,
  fVel_Interstitial,
  fVel_Chromatographic,
  fVel_Reduced,
  plateHeight,
  plateNumber,
  backpressure,
  onChange
}) {

  return (
    <>
    <InputSlider
        label='Temperature'
        unit='°C'
        min={10}
        max={150}
        value={temperature}
        verify={a => a >= 10 && a <= 150}
        onChange={(val)=>onChange('temperature', val)}  />
    <br />
    <InputNumber
        label='Injection Volume'
        unit='µL'
        value={injectionVolume}
        verify={a => a >= 1 && a <= 100}
        onChange={(val)=>onChange('injection-volume', val)}  />
    <InputNumber
        label='Flow Rate'
        unit='mL/min'
        value={flowRate}
        verify={a => a >= 0.1 && a <= 10}
        onChange={(val)=>onChange('flow-rate', val)}  />
    <br />
    <OutputNumber
        label='Open Tube'
        unit='cm / s'
        formatting='.4f'
        value={fVel_OpenTube}
        />
    <OutputNumber
        label='Interstitial'
        unit='cm / s'
        formatting='.4f'
        value={fVel_Interstitial}
        />
    <OutputNumber
        label='Chromatographic'
        unit='cm / s'
        formatting='.4f'
        value={fVel_Chromatographic}
        />
    <OutputNumber
        label='Reduced'
        formatting='.4f'
        value={fVel_Reduced}
        />
    <br />
    <OutputNumber
        label='H (plate height)'
        unit='cm'
        formatting='.4f'
        value={plateHeight}
        />
    <OutputNumber
        label='N (plate number)'
        formatting='.0f'
        value={plateNumber}
        />
    <OutputNumber
        label='Backpressure'
        unit='bar'
        formatting='.2f'
        value={backpressure}
        />
    </>
  );
}