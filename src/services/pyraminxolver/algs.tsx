const moves = ['U', 'U\'', 'R', 'R\'', 'L', 'L\'', 'B', 'B\''];

export const inverseAlg = (alg: string) => {
  return alg.split(' ').reverse().map(move => {
    return move.includes('\'') ? move.replace('\'', '') : `${move}\'`;
  }).join(' ');
}