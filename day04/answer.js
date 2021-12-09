import fs from "fs"

const readInput01 = fs.readFileSync(__dirname + '/input02.txt', 'utf-8');

const gameNumbers = readInput01.trim().split(',');

const readInput02 = fs.readFileSync(__dirname + '/input01.txt', 'utf-8')

const formattedInput = readInput02.trim().split('\n\n');

const entries = formattedInput.map(input => input.split('\n'))

const regex = /\s\s/g;

const reformat = (arrString) => arrString.trim().replace(regex, ' ').split(' ')

const createFinalBoard = (boards) => {

  for (let board of boards) {
    for (let i = 0; i < board.length; i++) {
      board[i] = reformat(board[i])
    }
  }

  return boards
}

const gameBoards = createFinalBoard(entries)

const transposeBoard = (matrix) => {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

const flip = (a, b, c, matrix) => {
  return matrix[a][b][c] = true
}

const isAllTrue = (value) => value === true;

const confirmWin = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].every(isAllTrue)) {
      return true
    }
  }
  return false
}

const findWinningBoards = (numbers, allBoards) => {
  let firstWinner;
  let lastWinner;

  let checkBoards = []

  for (let x = 0; x < allBoards.length; x++) {
    const baseCheckArray = Array(5).fill().map(() => Array(5).fill(false))
    checkBoards.push(baseCheckArray)
  }

  for (let number of numbers) {
    for (let i = 0; i < allBoards.length; i++) {

      let aBoard = allBoards[i]

      if (confirmWin(checkBoards[i]) || confirmWin(transposeBoard(checkBoards[i]))) {
        continue
      }

      for (let j = 0; j < aBoard.length; j++) {
        let entries = aBoard[j];

        for (let k = 0; k < entries.length; k++) {
          if (entries[k] === number) {
            flip(i, j, k, checkBoards)

            if (confirmWin(checkBoards[i]) || confirmWin(transposeBoard(checkBoards[i]))) {
              if (!firstWinner) {
                firstWinner = [number, i, checkBoards[i]]
              }
              lastWinner = [number, i, checkBoards[i]]
            }
            break;
          }
        }
        continue;
      }
    }
  }

  return [firstWinner, lastWinner]
}

const calculateWinningValue = (winningNumber, boardIndex, boardChecker, boards) => {

  let winningBoard = boards[boardIndex]

  for (let x = 0; x < boardChecker.length; x++) {
    let boardArray = boardChecker[x]
    for (let y = 0; y < boardArray.length; y++) {
      if (boardChecker[x][y] === true) {
        winningBoard[x][y] = 0
      }
    }
  }

  let flattenedBoard = winningBoard.reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue),
    []
  )

  let totalSum = flattenedBoard.reduce(
    (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
    0
  )

  return totalSum * winningNumber
}

export const calculateFirstFinalScore = (gameNumbers, gameBoards) => {

  const [initialWinner, _] = findWinningBoards(gameNumbers, gameBoards)

  const [firstNumber, firstIndex, firstCheck] = initialWinner

  const result = calculateWinningValue(firstNumber, firstIndex, firstCheck, gameBoards)

  return result
}

export const calculateLastFinalScore = (gameNumbers, gameBoards) => {

  const [_, lastWinner] = findWinningBoards(gameNumbers, gameBoards)

  const [lastNumber, lastIndex, lastCheck] = lastWinner

  const result = calculateWinningValue(lastNumber, lastIndex, lastCheck, gameBoards)

  return result
}

console.log("The first final scores is : ", calculateFirstFinalScore(gameNumbers, gameBoards))
console.log("The last final scores is : ", calculateLastFinalScore(gameNumbers, gameBoards))
