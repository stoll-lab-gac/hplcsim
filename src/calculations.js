//import { useEffect } from 'react';

function compDeps(statePrev, state, vars) {
  let varsLength = vars.length;
  for(let i = 0; i < varsLength; i++) { if(state[vars[i]] !== statePrev[vars[i]]) { return true; } }
  return false;
}

/**
 * calculate total porosity
 * @param {number} epsilonE interstitual porosity
 * @param {number} epsilonI internal porosity
 * @returns total porosity
 */
export function calcEpsilonTotal(epsilonE, epsilonI) {
  return epsilonE + epsilonI * (1 - epsilonE);
}

export function calcVoidVolume(innerDiameter, length, epsilonT) {
  return Math.PI*Math.pow((innerDiameter/2),2)*length*epsilonT;
}

export function getCalculatedValues(statePrev, state) {
  if(compDeps(statePrev, state, ["epsilonI", "epsilonE"])) {
    state.epsilonT = calcEpsilonTotal(state.epsilonE, state.epsilonI);
    console.log("epsilonT: "+state.epsilonT);
  }

  if(compDeps(statePrev, state, ["innerDiameter","length","epsilonT"])) {
    state.voidVolume = calcVoidVolume(state.innerDiameter, state.length, state.epsilonT);
    console.log("voidVolume: "+state.voidVolume);
  }

  return state;
}