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
  groups: Array<Array<number>>,
  groupBySymmetries: boolean,
  setFixedEdges: (fixedEdges: Array<number>) => void,
  setFixedCenters: (fixedCenters: Array<number>) => void,
  setStateIdx: (stateIdx: number) => void,
  setCases: (cases: Array<number>) => void,
  setGroups: (groups: Array<Array<number>>) => void,
  setCaseMask: (caseMask: string) => void,
  setGroupBySymmetries: (groupBySymmetries: boolean) => void,
}

const useSetSolverStore = create<State>((set) => {
  return ({
    fixedEdges: initialParams.fixedEdges,
    fixedCenters: initialParams.fixedCenters,
    stateIdx: 0,
    cases: [],
    caseMask: '',
    groups: [],
    groupBySymmetries: true,
    setFixedEdges: (fixedEdges: Array<number>) => set({ fixedEdges }),
    setFixedCenters: (fixedCenters: Array<number>) => set({ fixedCenters }),
    setStateIdx: (stateIdx: number) => set({ stateIdx }),
    setCases: (cases: Array<number>) => set({ cases }),
    setGroups: (groups: Array<Array<number>>) => set({ groups }),
    setCaseMask: (caseMask: string) => set({ caseMask }),
    setGroupBySymmetries: (groupBySymmetries: boolean) => set({ groupBySymmetries }),
  });
});

export default useSetSolverStore;