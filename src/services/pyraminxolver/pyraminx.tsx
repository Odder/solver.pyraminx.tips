const permutator = (inputArr: any) => {
  let result: any[] = [];

  const permute = (arr: any[], m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next: any = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
}

function product(iterables: any, repeat: number) {
  var argv = Array.prototype.slice.call([iterables, repeat]), argc = argv.length;
  if (argc === 2 && !isNaN(argv[argc - 1])) {
    var copies = [];
    for (var i = 0; i < argv[argc - 1]; i++) {
      copies.push(argv[0].slice()); // Clone
    }
    argv = copies;
  }
  return argv.reduce(function tl(accumulator, value) {
    var tmp: any[] = [];
    accumulator.forEach(function (a0: any) {
      value.forEach(function (a1: any) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}

export default () => {
  const ep: number[][] = []
  const eo: number[][] = []
  const co: number[][] = []

  const epDict: { [key: string]: number; } = {}
  const eoDict: { [key: string]: number; } = {}
  const coDict: { [key: string]: number; } = {}

  const setup = () => {
    setupEP()
    setupEO()
    setupCO()
  }

  const setupEP = () => {
    permutator([0, 1, 2, 3, 4, 5]).forEach((perm: any) => {
      ep.push(perm)
    })
    for (let i = 0; i < ep.length; i++) {
      epDict[ep[i].toString()] = i
    }
  }

  const setupEO = () => {
    product([0, 1], 6).forEach((orient: number[]) => {
      if ((orient.reduce((a: number, b: number) => a + b, 0)) % 2 == 0) {
        eo.push(orient)
      }
    })
    for (let i = 0; i < eo.length; i++) {
      eoDict[eo[i].toString()] = i
    }
  }

  const setupCO = () => {
    product([0, 1, 2], 4).forEach((orient: number[]) => {
      co.push(orient)
    })
    for (let i = 0; i < co.length; i++) {
      coDict[co[i].toString()] = i
    }
  }

  const stateToId = (state: any) => {
    let idx = 0
    idx += epDict[state.ep]
    idx += coDict[state.co] * 360
    idx += eoDict[state.eo] * 29160
    return idx
  }

  setup()
  return {
    stateToId
  }
}
