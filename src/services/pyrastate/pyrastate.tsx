import { scorers } from "../../scorers/all";


const movesMap = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"];
const movesTable = movesMap.reduce(
  (acc: any, c: string, i: number) => {
    acc[c] = i;
    return acc;
  }
  , {});

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
// from python:  table = {c: i for (i, c) in enumerate(ALPHABET)}
const table = alphabet.split('').reduce(
  (acc: any, c: string, i: number) => {
    acc[c] = i;
    return acc;
  }
  , {});

const encode = (x: Array<number>) => {
  let result = '';
  for (let i = 0; i < x.length; i++) {
    result += alphabet[x[i]];
  }
  return result;
}

const decode = (x: string) => {
  let result: Array<number> = [];
  for (let i = 0; i < x.length; i++) {
    result.push(table[x[i]]);
  }
  return result;
}

type state = {
  setup: string,
  ep: Array<number>,
  co: Array<number>,
  slack: number,
  scorer: string,
}

const decoder = (rawState: string): state => {
  if (rawState.length < 3) {
    throw new Error("Invalid PyraState");
  }

  const state = decode(rawState);

  const getSetup = () => {
    if (state.length < 5) return '';
    const moves = ["R", "R'", "L", "L'", "U", "U'", "B", "B'"];
    const setup = [moves[state[4] >> 3]];
    let a = '';
    let b = '';

    for (let i = 0; i < state[4] % 8; i++) {
      a = moves[state[5 + i] % 8];
      b = moves[state[5 + i] >> 3];
      setup.push(a);
      if (a != b) {
        setup.push(b)
      }
    }

    return setup.join(' ');
  };

  return {
    ep: [0, 1, 2, 3, 4, 5].map(x => state[1] & (1 << x) ? 1 : 0),
    co: [0, 1, 2, 3].map(x => state[2] & (1 << x) ? 1 : 0),
    slack: (state[2] >> 4) % (2 ** 2),
    scorer: Object.keys(scorers)[state[3] % 2 ** 3],
    setup: getSetup(),
  };
}

const encoder = (rawState: state) => {
  const state = [];
  const moves = ["R", "R'", "L", "L'", "U", "U'", "B", "B'"];

  state.push(0);
  state.push(rawState.ep.reduce((acc, x, i) => acc + (x << i), 0));
  state.push(rawState.co.reduce((acc, x, i) => acc + (x << i), 0) + (rawState.slack << 4));
  state.push(Object.keys(scorers).indexOf(rawState.scorer));
  if (rawState.setup && rawState.setup != '') {
    let moveCount = 0;
    let moveBuffer = Math.floor((rawState.setup.split(' ').length) / 2);
    rawState.setup.split(' ').map(move => {
      if (moves.indexOf(move) === -1) return;
      if (moveCount % 2 === 0) {
        state.push(moveBuffer + (moves.indexOf(move) << 3));
      } else {
        moveBuffer = moves.indexOf(move);
      }
      moveCount++;
    });

    if (moveCount % 2 === 0) {
      state.push(moveBuffer + (moveBuffer << 3));
    }
  }

  return encode(state);
}

const PyraState = {
  encode: encoder,
  decode: decoder,
};

export default PyraState;
