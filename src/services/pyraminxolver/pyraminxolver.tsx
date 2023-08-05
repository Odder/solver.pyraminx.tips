import graph from './graph'

export default () => {
  const movesMap = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"]

  const search = (idx: number, maxSlack = 0) => {
    const solutions = []
    const queue: any[] = []

    let k = 0

    queue.push([idx, [], [idx], 0])

    while (queue.length > 0) {
      const [idx, moves, visited, slack] = queue.shift()
      const depth = graph[idx][0]
      let nextIdx
      let nextSlack
      k++

      if (depth > 0) {
        for (let i = 1; i < 9; i++) {
          if (moves.length > 0 && Math.floor((i - 1) / 2) == Math.floor((moves[moves.length - 1] - 1) / 2)) {
            continue
          }
          nextIdx = graph[idx][i]
          nextSlack = slack + graph[nextIdx][0] - depth + 1
          if (nextSlack <= maxSlack) {
            queue.push([nextIdx, moves.concat([i]), visited.concat([nextIdx]), nextSlack])
          }
        }
      }
      else {
        solutions.push([parseMoves(moves), moves.length])
      }
    }

    return solutions
  }

  const scrambleToState = (scramble: string) => {
    const moves = scramble.split(' ')
    let moveIdx
    let idx = 0
    for (const move of moves) {
      moveIdx = movesMap.indexOf(move) + 1
      idx = graph[idx][moveIdx]
    }

    return idx
  }

  const searchScramble = (scramble: string, maxSlack = 0) => {
    const idx = scrambleToState(scramble)
    return search(idx, maxSlack)
  }

  const parseMoves = (moves: number[]) => {
    const parsedMoves = []
    for (let i = 0; i < moves.length; i++) {
      parsedMoves.push(movesMap[moves[i] - 1])
    }
    return parsedMoves.join(' ')
  }

  return {
    search,
    searchScramble
  }
}
