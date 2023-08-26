import { Graph } from './pyraminx'

export default () => {
  const movesMap = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"]

  const search = (idx: number, maxSlack = 0, maxSolutions = 10000) => {
    const solutions = []
    const queue: any[] = []

    let k = 0

    queue.push([idx, [], [idx], 0])

    while (queue.length > 0) {
      const [idx, moves, visited, slack] = queue.shift()
      const depth = Graph[idx][0]
      let nextIdx
      let nextSlack
      k++

      if (depth > 0) {
        for (let i = 1; i < 9; i++) {
          if (moves.length > 0 && Math.floor((i - 1) / 2) == Math.floor((moves[moves.length - 1] - 1) / 2)) {
            continue
          }
          nextIdx = Graph[idx][i]
          nextSlack = slack + Graph[nextIdx][0] - depth + 1
          if (nextSlack <= maxSlack) {
            queue.push([nextIdx, moves.concat([i]), visited.concat([nextIdx]), nextSlack])
          }
        }
      }
      else {
        solutions.push([parseMoves(moves), moves.length, visited])
        if (solutions.length >= maxSolutions) {
          break
        }
      }
    }

    return solutions
  }

  const scrambleToState = (scramble: string) => {
    const cleanScramble = scramble.replace(/\s+/g, ' ')
    const moves = cleanScramble.split(' ')
    // console.info('scrambleToState', cleanScramble, moves)
    let moveIdx
    let idx = 0
    for (const move of moves) {
      moveIdx = movesMap.indexOf(move) + 1
      idx = Graph[idx][moveIdx]
      // console.info('move', move, moveIdx, idx)
    }

    return idx
  }

  const searchScramble = (scramble: string, maxSlack = 0) => {
    if (scramble === '') return []
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
    scrambleToState,
    searchScramble,
  }
}
