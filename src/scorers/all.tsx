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
    "U": 0.8,
    "U'": 0.8,
    "R": 0.8,
    "R'": 0.8,
    "L": 0.8,
    "L'": 0.8,
    "B": 1.5,
    "B'": 1.5,
  }
  let lBalance = 0;
  let rBalance = 0;
  let uBalance = 0;
  let cost = 0;

  return alg.moves.reduce((acc, move) => {
    cost = moveCosts[move]
    if (move === "U" || move === "U'") {
      uBalance += move === "U" ? 1 : -1;
      if (Math.abs(rBalance) > 0 && Math.abs(lBalance) > 0) {
        cost += 1;
      }
    } else if (move === "R" || move === "R'") {
      rBalance += move === "R" ? 1 : -1;
      if (Math.abs(rBalance) > 1) {
        cost += 1;
        rBalance = 0;
      }
    } else if (move === "L" || move === "L'") {
      lBalance += move === "L" ? 1 : -1;
      if (Math.abs(lBalance) > 1) {
        cost += 1.5;
        lBalance = 0;
      }
    } else if (move === "B" || move === "B'") {
      if (lBalance == 1 && rBalance == -1) {
        cost += 0.5;
      }
    }

    return acc + cost;
  }, 0);
}

export const scorers: { [key: string]: (alg: Alg) => number } = {
  lengthScorer,
  naiveScorer,
  homeGripScorer,
}