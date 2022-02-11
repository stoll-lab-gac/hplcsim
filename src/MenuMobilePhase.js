
import { LabeledInput } from './LabeledInput';
/*
* for info on number formattting codes used in this code, see
* https://github.com/d3/d3-format#locale_format
*/
import { format } from 'd3-format';

MenuMobilePhase.EVENTS = {
  SOLVENT_A_CHANGE: 'solvent-A',
  SOLVENT_B_CHANGE: 'solvent-B',
  ISOCRATIC_RADIO: 'isocratic-radio',
  GRADIENT_RADIO: 'gradient-radio',
  PHI_SAMPLE_CHANGE: 'phi-sample',
  PHI_INITIAL_CHANGE: 'phi-initial',
  PHI_FINAL_CHANGE: 'phi-final',
  GRADIENT_TIME_CHANGE: 'gradient-time'
}
/**
 * display component for mobile phase params
 * @param {object} props
 * @param {boolean} props.useGradient
 * @param {?number} [props.samplePhi=null] sample phi [0-1] or undefined for message about previous dimension
 * @param {number} props.phi0 initial phi [0-1]
 * @param {number} props.phif final phi [0-1]
 * @param {number} props.tg
 * @param {number} props.selectedSolventA
 * @param {number} props.selectedSolventB
 * @param {Array<string>} props.solventAs
 * @param {Array<string>} props.solventBs
 * @param {function} props.onChange
 */ 
export function MenuMobilePhase(
  {
    useGradient,
    samplePhi=null,
    phi0,
    phif,
    tg,
    solventAs,
    solventBs,
    selectedSolventA,
    selectedSolventB,
    onChange
  }) {

  const beta = (phif-phi0) / tg;

  const gradientModeMenu = (
    <>
      <LabeledInput
        label='Phi Final'
        unit='%'
        value={phif*100}
        verify={a => a >= phi0 && a <= 100}
        onChange={(val)=>onChange('phi-final', val/100)}  />
      {phi0 > phif && <p style={{color: 'red', fontWeight: 'bold'}}>Phi Initial is greater than Phi Final!</p>}
      <LabeledInput
        label='Gradient Time'
        unit='min'
        value={tg}
        verify={a => a >= 0.01}
        onChange={val=>onChange('gradient-time', val)}
        step={0.1} />
      <p>Gradient Slope (ß): {format('.4f')(beta)}</p>
    </>
  );

  const solventAOptions = solventAs.map((value)=>
    <option value={value} key={value}>{value}</option>
  );

  const solventBOptions = solventBs.map((value)=>
    <option value={value} key={value}>{value}</option>
  );

  return (
    <>
      <span>Solvent A </span>
      <select
        value={solventAs[selectedSolventA]}
        onChange={(e) => onChange('solvent-A', e.target.value)}
      >
        {solventAOptions}
      </select>
      <br />
      <span>Solvent B </span>
      <select
        value={solventBs[selectedSolventB]}
        onChange={(e) => onChange('solvent-B', e.target.value)}
      >
        {solventBOptions}
      </select>
      <br />
      <label>
        <input type='radio'
          checked={!useGradient}
          onChange={(e) => onChange('isocratic-radio', e.target.value)} />
        Isocratic
      </label>
      <label>
        <input type='radio'
          checked={useGradient}
          onChange={(e) => onChange('gradient-radio', e.target.value)} />
        Gradient
      </label>
      {samplePhi !== null &&
        <LabeledInput
          label='Sample Phi'
          unit='%'
          value={samplePhi * 100}
          onChange={val => onChange('phi-sample', val / 100)}
          verify={a => a >= 0.0 && a <= 100} />
      }
      {!samplePhi && samplePhi !== 0 && <p>Sample Phi determined by phi elute in 1D</p>}
      <LabeledInput
        label={useGradient ? 'Phi Initial' : 'Mobile Phi'}
        unit='%'
        value={phi0 * 100}
        onChange={val => onChange('phi-initial', val / 100)}
        verify={a => a >= 0.0 && a <= 100} />
      {useGradient && gradientModeMenu}
    </>
  );
}
