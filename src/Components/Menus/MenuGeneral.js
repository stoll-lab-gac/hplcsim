import { OutputNumber } from '../Outputs/OutputNumber';

export function MenuGeneral({
  eluentViscosity,
  diffusionCoefficient
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
        label='Avg. Diffusion Coeff.'
        unit='cm²/s'
        formatting='.4e'
        value={diffusionCoefficient}
        />
    </>
  );
}