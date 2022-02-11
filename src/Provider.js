import { useReducer, useEffect } from 'react';
import { App } from './App'
import { Alert } from 'react-st-modal';
import { version } from '../package.json';

function init(){

  const state = {
    firstDimInputs: {
      injectionVolume: 5,     // injection volume (microliters)
      flowRate: 2.0,          // flow rate (mL/min)
      mobileA: 'Water',
      mobileType: 'ACN',      // ACN or MeOH
      phi0: 0.4,              // initial phi [0-1] 
      useGradient: false,     // to use gradient or not
      phiFinal: 0.4,          // final phi [0-1]
      gradientTime: 5.0,      // gradient time (min)
      deadVolume: 10,         // volume of mobile phase in column (mL)
      deadTime: 5,            // time for mobile phase to go through column (min)
      delayTimeToCol: 5,      // time from pump to head of column, aka gradient delay (min)
      delayTimeFromInj: 0,    // extra-column time (min)
      delayVolToCol: 200,     // volume from pump to head of column (µL)
      delayVolFromInj: 0,     // extra-column volume (µL)
      dphi: 0                 // change in organic, calculated
    }
  };

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

  return state;
}

function reducer(state, action){
  switch(action.type){
    case 'edit-first-inputs': {
      const newInputs = action.payload;
      const oldInputs = state.firstDimInputs;
      const conditions = {...oldInputs, ...newInputs};
      //const calculated = getCalculatedValues(conditions);
      //const newConditions = {...conditions, ...calculated};
      //const heartcuts = getUpdatedHeartcuts(state.heartcuts, 
      //  newConditions.flowRate, 
      //  state.secondDimInputs.injectionVolume, 
      //  state.interfaceConditions.dilutionFactor);
      return {...state, firstDimInputs: conditions};
    }

    case 'set-sim-conditions': {
      const simConditions = action.payload;
      return {...state, simConditions};
    }

    case 'reset': {
      return init();
    }

    case 'reset-conditions': {
      const firstDimInputs = init().firstDimInputs;
      const secondDimInputs = init().secondDimInputs;
      return {...state, firstDimInputs, secondDimInputs};
    }

    default:
      throw Error(`unhandled action type: ${action.type}`);
  }
}

export function Provider() {
  const [state, dispatch] = useReducer(reducer, {}, init);

  
  return (
    <>
      <App state={state} dispatch={dispatch} />
    </>
  );
}