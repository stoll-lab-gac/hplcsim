import { useReducer } from 'react';
import { App } from './App'
//import { version } from '../package.json';

import { compoundParameters, M } from './CompoundParameters'

function init(){

  let compoundParametersNew = compoundParameters;
  let allSolventBs = [];
  const columns = Object.keys(compoundParametersNew);
  for(let i = 0; i < columns.length; i++) {
    const solventBs = Object.keys(compoundParametersNew[columns[i]]);
    for(let j = 0; j < solventBs.length; j++) {
      allSolventBs.push(solventBs[j]);
      const compounds = Object.keys(compoundParametersNew[columns[i]][solventBs[j]]);
      for(let k = 0; k < compounds.length; k++) {
        if(!Object.keys(compoundParametersNew[columns[i]][solventBs[j]][compounds[k]]).includes("M")) {
          const M_Indx = Math.floor(Math.random()*(M.length-1));
          compoundParametersNew[columns[i]][solventBs[j]][compounds[k]]["M"] = M[M_Indx];
        }
      }
    }
  }

  const allSolventAs_unique = ['Water'];
  const allSolventBs_unique = [...new Set(allSolventBs.map(item => item))];

  const stateCompounds = {
    "compoundParameters": compoundParametersNew,
    "compoundList": [
      "phenol",
      "benzonitrile",
      "p-chlorophenol",
      "acetophenone",
      "nitrobenzene"
    ]
  };

  const stateInputs = {
    solventAs: allSolventAs_unique, //['Water'], //['Water','Buffer, 3.2 pH'],
    solventBs: allSolventBs_unique, //['Acetonitrile', 'Methanol'],
    solventA: allSolventAs_unique[0], //'Water',
    solventB: allSolventBs_unique[0], //'Acetonitrile',      // ACN or MeOH
    useGradient: false,     // to use gradient or not
    phi0: 0.4,              // initial phi [0-1] 
    phiFinal: 0.4,          // final phi [0-1]
    gradientTime: 5.0,      // gradient time (min)

    temperature: 40,
    injectionVolume: 5,     // injection volume (microliters)
    flowRate: 2.0,          // flow rate (mL/min)
    
    columns: columns, //['Agilent SB-C18'],
    selectedColumn: columns[0], //'Agilent SB-C18',
    length: 100.0,
    innerDiameter: 4.6,
    particleSize: 3.0,
    epsilonI: 0.4,
    epsilonE: 0.4,
    vanDeemterA: 1.0,
    vanDeemterB: 5.0,
    vanDeemterC: 0.05,

    volumeMolar: 200,

    xOrg: 1.9,
    mOrg: 41.05,
  };

  const stateOutputs = {
    epsilonT: 0,
    voidVolume: 0,
    voidTime: 0,
    eluentViscosity: 0,
    solventAssociationParameter: 0,
    solventMolecularWeight: 0,
    diffusionCoefficient: 0.000011689,
    columnCrossArea: 0,
    flowVelocity_openTube: 0,
    flowVelocity_intersitial: 0,
    flowVelocity_chromatographic: 0,
    flowVelocity_reduced: 0,
    backPressure: 0,
    reducedPlateHeight: 0,
    HETP: 0,
    theoreticalPlateNumber: 0,
    plotData: [],
  };

  const state = {...stateCompounds, ...stateInputs, ...stateOutputs};

  console.log(state);
  
  return state;
}

function reducer(state, action){
  switch(action.type){
    case 'edit-inputs': {
      const conditions = {...state, ...action.payload};
      //console.log(conditions);
      return conditions;
    }

    case 'edit-concentration': {
      let newState = state;
      newState.compoundParameters[action.payload.selectedColumn][action.payload.solventB][action.payload.compound].M = action.payload.conc;
      const conditions = {...state, ...newState};
      //console.log(conditions);
      return conditions;
    }

    case 'edit-compound-list': {
      let newState = state;
      const compoundName = action.payload.compoundName;
      const compoundChecked = action.payload.compoundChecked;

      //console.debug(compoundName + " = " + compoundChecked);

      if(compoundChecked === true){
        newState.compoundList.push(compoundName);
      }
      else
      {
        if(newState.compoundList.length > 1){
          let newCompoundList = [];
          for(let i = 0; i < state.compoundList.length; i++) {
            if(state.compoundList[i] !== compoundName){
              newCompoundList.push(state.compoundList[i]);
            }
          }
          newState.compoundList = newCompoundList;
        }
        else
        {
          console.log(compoundName + " is the only compound remaining in the list! Please add other compounds first!")
        }
      }
      const conditions = {...state, ...newState};
      //console.log(conditions);
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