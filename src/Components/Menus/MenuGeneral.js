import { InputNumber } from '../Inputs/InputNumber';
import { InputCheckbox } from '../Inputs/InputCheckbox';
import { OutputNumber } from '../Outputs/OutputNumber';

export function MenuGeneral({
  eluentViscosity,
  diffusionCoefficient,
  detectorFrequency=1,
  plotPumpSolventB=true,
  plotColumnSolventB=true,
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
        step={0.1}
        />
      <hr />
      <InputCheckbox
        label='Plot %B Pump'
        isChecked={plotPumpSolventB}
        onChange={val=>onChange('plot-solventB-pump', val)}
      />
      <InputCheckbox
        label='Plot %B Column'
        isChecked={plotColumnSolventB}
        onChange={val=>onChange('plot-solventB-column', val)}
      />
    </>
  );
}