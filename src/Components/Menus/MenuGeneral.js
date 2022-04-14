import { InputNumber } from '../Inputs/InputNumber';
import { OutputNumber } from '../Outputs/OutputNumber';

export function MenuGeneral({
  eluentViscosity,
  diffusionCoefficient,
  detectorFrequency,
  onChange
}) {

  return (
    <>
      <OutputNumber
        label='Eluent Viscosity'
        unit='cP'
        formatting='.4f'
        value={eluentViscosity}
        />
      <OutputNumber
        label='Avg. Diffusion Coefficient'
        unit='cm²/s'
        formatting='.4e'
        value={diffusionCoefficient}
        />
      <InputNumber
        label='Detector Frequency'
        unit='Hz'
        value={detectorFrequency}
        verify={a => a >= 1 && a <= 10}
        onChange={val=>onChange('detectorFrequency', val)}
        step={0.1} />
    </>
  );
}