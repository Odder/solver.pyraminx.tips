

function cartesian(...args: any[]) {
  const r: any[] = []
  const max = args.length - 1;
  const helper = (arr: any[], i: number) => {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max)
        r.push(a);
      else
        helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

export const generateSet = (pyra: any, setState: { eo: number[], co: number[], ep: number[] }, stateIdx: number) => {
  const startCase = pyra.idToState(stateIdx);
  const eoSet: number[][] = [];
  const coSet: number[][] = [];
  const epSet: number[][] = [];
  setState.ep = [0, 1, 2, 3, 4, 5].map((i) => setState.ep[i] > -1 ? startCase.ep[i] : -1);
  setState.eo = [0, 1, 2, 3, 4, 5].map((i) => setState.ep[i] > -1 ? startCase.eo[i] : -1);
  setState.co = [0, 1, 2, 3].map((i) => setState.co[i] > -1 ? startCase.co[i] : -1);

  pyra.eo.forEach((eoCase: number[]) => {
    for (let i = 0; i < 6; i++) {
      if (setState.eo[i] > -1 && setState.eo[i] != eoCase[i]) {
        return;
      }
    }
    eoSet.push(eoCase);
  })

  pyra.co.forEach((coCase: number[]) => {
    for (let i = 0; i < 4; i++) {
      if (setState.co[i] > -1 && setState.co[i] != coCase[i]) {
        return;
      }
    }
    coSet.push(coCase);
  })

  pyra.ep.forEach((epCase: number[]) => {
    for (let i = 0; i < 6; i++) {
      if (setState.ep[i] > -1 && setState.ep[i] != epCase[i]) {
        return;
      }
    }
    epSet.push(epCase);
  })

  const cases = cartesian(eoSet, coSet, epSet).map((state: any) => {
    return pyra.stateToId({
      eo: state[0],
      co: state[1],
      ep: state[2],
    });
  })

  return cases;
}

export const groupBySymmetries = (px: any, cases: number[]): any => {
  const groups: { [key: number]: number[] } = {}
  cases.forEach((stateIdx: number) => {
    const alg = px.search(stateIdx, 0, 1)[0][0];
    const symmetries: number[] = [alg, `U ${alg} U'`, `U' ${alg} U` /*, `R ${alg} R'`, `R' ${alg} R`, `L ${alg} L'`, `L' ${alg} L`, `B ${alg} B'`, `B' ${alg} B` */].map((a) => px.scrambleToState(a));
    const groupId = Math.min(...symmetries.filter((s) => cases.includes(s)));
    if (groups[groupId]) {
      groups[groupId].push(stateIdx);
    }
    else {
      groups[groupId] = [stateIdx];
    }
  });
  return Object.values(groups);
}