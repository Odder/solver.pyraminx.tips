
import { create } from 'zustand'
import pyraminx from '../services/pyraminxolver/pyraminx'
import pyraminxolver from '../services/pyraminxolver/pyraminxolver'

type State = {
  pyraminx: any,
  pyraminXolver: any,
}

const usePyraminxStore = create<State>(() => {
  return ({
    pyraminx: pyraminx(),
    pyraminXolver: pyraminxolver(),
  });
});

export default usePyraminxStore;