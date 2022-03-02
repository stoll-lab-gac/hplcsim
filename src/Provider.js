//import { useReducer, useEffect } from 'react';
import { useReducer } from 'react';
import { App } from './App'
//import { Alert } from 'react-st-modal';
//import { version } from '../package.json';

import { getCalculatedValues } from './calculations.js';

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
    flowVelocity_openTube: 0,
    flowVelocity_intersitial: 0,
    flowVelocity_chromatographic: 0,
    flowVelocity_reduced: 0,
  };

  const state = {...stateInputs, ...stateOutputs};
  const calculated = getCalculatedValues(state, stateInputs);

  // get calculated values
  //const firstCalculated = getCalculatedValues(defaults.firstDimInputs);
  //const secondCalculated = getCalculatedValues(defaults.secondDimInputs);
  //const firstConditions = { ...defaults.firstDimInputs, ...firstCalculated };
  //const secondConditions = { ...defaults.secondDimInputs, ...secondCalculated };

  // if there are other processing to be done merge them here
  //const updated = {
  //  ...defaults,
  //  firstDimInputs: firstConditions,
  //  secondDimInputs: secondConditions
  //};

  return {...state, ...calculated};
}

function reducer(state, action){
  switch(action.type){
    case 'edit-inputs': {
      const conditions = {...state, ...action.payload};
      //const calculated = getCalculatedValues(state, conditions);
      //const newConditions = {...conditions, ...calculated};
      return {...state, ...conditions};
      //return {...state, ...calculated};
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