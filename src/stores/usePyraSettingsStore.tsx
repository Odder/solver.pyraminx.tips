import { create } from 'zustand'
import PyraState from '../services/pyrastate/pyrastate';

const defaultParams = {
  fixedEdges: [1, 1, 1, 1, 1, 1],
  fixedCenters: [1, 1, 1, 1],
  slack: 0,
  setup: '',
  scorer: 'Home Grip',
  filterComputerSolves: false,
  filterBadAlgs: false,
}

const urlParams = new URLSearchParams(window.location.search);
const initialParams = urlParams.get('state') ? PyraState.decode(urlParams.get('state') as string) : defaultParams;

type State = {
  setup: string,
  slack: number,
  scorer: string,
  filterComputerSolves: boolean,
  filterBadAlgs: boolean,
  setSetup: (setup: string) => void,
  setSlack: (slack: number) => void,
  setScorer: (scorer: string) => void,
  setFilterComputerSolves: (filterComputerSolves: boolean) => void,
  setFilterBadAlgs: (filterBadAlgs: boolean) => void,
}

const usePyraSettingsStore = create<State>((set) => {
  return ({
    setup: initialParams.setup,
    slack: initialParams.slack,
    scorer: initialParams.scorer,
    filterComputerSolves: initialParams.filterComputerSolves,
    filterBadAlgs: initialParams.filterBadAlgs,

    setSetup: (setup: string) => set({ setup }),
    setSlack: (slack: number) => set({ slack }),
    setScorer: (scorer: string) => set({ scorer }),
    setFilterComputerSolves: (filterComputerSolves: boolean) => set({ filterComputerSolves }),
    setFilterBadAlgs: (filterBadAlgs: boolean) => set({ filterBadAlgs }),
  });
});

export default usePyraSettingsStore;