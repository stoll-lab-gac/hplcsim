import { InputNumber } from '../Inputs/InputNumber';
import { InputCheckbox } from '../Inputs/InputCheckbox';
import { OutputNumber } from '../Outputs/OutputNumber';

export function MenuGeneral({
  eluentViscosity,
  diffusionCoefficient,
  detectorFrequency=1,
  plotCompounds=false,
  plotPumpSolventB=false,
  plotColumnSolventB=false,
  useGradient=false,
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
        label='Plot Compounds'
        isChecked={plotCompounds}
        onChange={val=>onChange('plotCompounds', val)}
      />
      <hr />
      <InputCheckbox
        label='Plot %B Column'
        isChecked={plotColumnSolventB}
        onChange={val=>onChange('plotColumnSolventB', val)}
      />
      <InputCheckbox
        label='Plot %B Pump'
        isChecked={useGradient && plotPumpSolventB}
        onChange={val=>onChange('plotPumpSolventB', val)}
        disabled={!useGradient}
      />
    </>
  );
}