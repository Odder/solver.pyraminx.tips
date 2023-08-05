type Alg = {
  moves: Move[];
}

type Move = "U" | "U'" | "R" | "R'" | "L" | "L'" | "B" | "B'"

export const parseAlg = (alg: string): Alg => {
  if (!alg) return { moves: [] };
  const moves = alg.split(' ');
  return { moves: moves as Move[] };
}

export const algToString = (alg: Alg): string => {
  return alg.moves.join(' ');
}

const lengthScorer = (alg: Alg): number => {
  return alg.moves.length;
}

const naiveScorer = (alg: Alg): number => {
  const moveCosts = {
    "U": 0.7,
    "U'": 0.7,
    "R": 0.8,
    "R'": 0.8,
    "L": 0.8,
    "L'": 0.8,
    "B": 1.2,
    "B'": 1.2,
  }
  return alg.moves.reduce((acc, move) => acc + moveCosts[move], 0);
}

const homeGripScorer = (alg: Alg): number => {
  const moveCosts = {
    "U": 0.7,
    "U'": 0.7,
    "R": 0.8,
    "R'": 0.8,
    "L": 0.8,
    "L'": 0.8,
    "B": 3,
    "B'": 3,
  }
  let lBalance = 0;
  let rBalance = 0;
  let uBalance = 0;
  let cost = 0;

  return alg.moves.reduce((acc, move) => {
    cost = moveCosts[move]
    if (move === "U" || move === "U'") {
      uBalance += move === "U" ? 1 : -1;
      cost *= (1 + Math.abs(uBalance) * 0.1) ** 2;
    } else if (move === "R" || move === "R'") {
      rBalance += move === "R" ? 1 : -1;
      cost *= (1 + Math.abs(rBalance) * 0.1) ** 3;
    } else if (move === "L" || move === "L'") {
      lBalance += move === "L" ? 1 : -1;
      cost *= (1 + Math.abs(lBalance) * 0.1) ** 3;
    }

    return acc + cost;
  }, 0);
}

export const scorers: { [key: string]: (alg: Alg) => number } = {
  lengthScorer,
  naiveScorer,
  homeGripScorer,
}