import { useReducer } from 'react';
import { App } from './App'
//import { version } from '../package.json';

function init(){

  const stateInputs = {
    solventAs: ['Water','Buffer, 3.2 pH'],
    solventBs: ['Acetonitrile', 'Methanol'],
    solventA: 'Water',
    solventB: 'Acetonitrile',      // ACN or MeOH
    useGradient: false,     // to use gradient or not
    phi0: 0.4,              // initial phi [0-1] 
    phiFinal: 0.4,          // final phi [0-1]
    gradientTime: 5.0,      // gradient time (min)

    temperature: 40,
    injectionVolume: 5,     // injection volume (microliters)
    flowRate: 2.0,          // flow rate (mL/min)
    
    columns: ['Agilent SB-C18'],
    selectedColumn: 'Agilent SB-C18',
    length: 100.0,
    innerDiameter: 4.6,
    particleSize: 3.0,
    epsilonI: 0.4,
    epsilonE: 0.4,
    vanDeemterA: 1.0,
    vanDeemterB: 5.0,
    vanDeemterC: 0.05
  };

  const stateOutputs = {
    epsilonT: 0,
    voidVolume: 0,
    voidTime: 0,
    columnCrossArea: 0,
    flowVelocity_openTube: 0,
    flowVelocity_intersitial: 0,
    flowVelocity_chromatographic: 0,
    flowVelocity_reduced: 0,
    diffusionCoefficient: 0.000011689,
  };
  const state = {...stateInputs, ...stateOutputs};
  return state;
}

function reducer(state, action){
  switch(action.type){
    case 'edit-inputs': {
      const conditions = {...state, ...action.payload};
      console.log(conditions);
      return conditions;
    }

    case 'update': {
      return state;
    }

    case 'reset': {
      return init();
    }

    default:
      throw Error(`unhandled action type: ${action.type}`);
  }
}

export function Provider() {
  const [state, dispatch] = useReducer(reducer, {}, init);
  return(<><App state={state} dispatch={dispatch} /></>);
}