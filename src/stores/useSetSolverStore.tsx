import { create } from 'zustand'
import PyraState from '../services/pyrastate/pyrastate';

const defaultParams = {
  fixedEdges: [1, 1, 1, 1, 1, 1],
  fixedCenters: [1, 1, 1, 1],
}

const urlParams = new URLSearchParams(window.location.search);
const initialParams = urlParams.get('state') ? PyraState.decode(urlParams.get('state') as string) : defaultParams;

type State = {
  fixedEdges: Array<number>,
  fixedCenters: Array<number>,
  stateIdx: number,
  cases: Array<number>,
  caseMask: string,
  setFixedEdges: (fixedEdges: Array<number>) => void,
  setFixedCenters: (fixedCenters: Array<number>) => void,
  setStateIdx: (stateIdx: number) => void,
  setCases: (cases: Array<number>) => void,
  setCaseMask: (caseMask: string) => void,
}

const useSetSolverStore = create<State>((set) => {
  return ({
    fixedEdges: initialParams.fixedEdges,
    fixedCenters: initialParams.fixedCenters,
    stateIdx: 0,
    cases: [],
    caseMask: '',
    setFixedEdges: (fixedEdges: Array<number>) => set({ fixedEdges }),
    setFixedCenters: (fixedCenters: Array<number>) => set({ fixedCenters }),
    setStateIdx: (stateIdx: number) => set({ stateIdx }),
    setCases: (cases: Array<number>) => set({ cases }),
    setCaseMask: (caseMask: string) => set({ caseMask }),
  });
});

export default useSetSolverStore;