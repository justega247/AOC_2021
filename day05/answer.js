import fs from "fs"

const readInput = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const formattedInput = readInput.trim().split('\n');

const formatEntry = (entry) => {
  const line = entry.split(' -> ')

  const startingPoint = line[0].trim().split(',').map(x => Number(x))
  const endPoint = line[1].trim().split(',').map(y => Number(y))

  return [startingPoint, endPoint]
}

const hasCommonRoot = (start, end) => {
  if (start[0] === end[0] || start[1] === end[1]) {
    return true
  }
  return false
}

const checkUncommonIndex = (start, end) => {
  if (start[0] !== end[0]) {
    return 0
  }
  return 1
}

const findLargest = (arr) => {
  let largest = 0;
  for (let i = 0; i < arr.length; i++) {
    if (largest < arr[i] ) {
        largest = arr[i];
    }
  }
  return largest
}

const getGridRange = (input) => {
  let xEntries = [];
  let yEntries = [];

  for (let entry of input) {
    const [begin, stop] = formatEntry(entry)

    xEntries.push(begin[0])
    yEntries.push(begin[1])
    xEntries.push(stop[0])
    yEntries.push(stop[1])
  }

  const xMax = findLargest(xEntries)
  const yMax = findLargest(yEntries)

  return [xMax, yMax]
}

export const countPointsAboveTwo = (lines) => {

  const [x, y] = getGridRange(lines)

  const grid = Array(x + 1).fill().map(() => Array(y + 1).fill(0))

  for (let lineValue of lines) {
    const [start, end] = formatEntry(lineValue)

    if (!hasCommonRoot(start, end)) {
      continue;
    }

    const index = checkUncommonIndex(start, end)

    const commonIndex = index === 1 ? 0 : 1

    let startIndex = Math.min(start[index], end[index])
    let endIndex = Math.max(start[index], end[index])

    for (let i = startIndex; i <= endIndex; i++) {

      if (commonIndex === 1) {
        grid[start[commonIndex]][i] += 1
      } else {
        grid[i][start[commonIndex]] += 1
      }

    }
  }

  const flattenGrid = grid.reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue),
    []
  )

  const twoOrGreater = flattenGrid.filter( entry => Number(entry) >= 2 )

  return twoOrGreater.length
}


export const countPointsAboveTwoDiagonal = (lines) => {

  const [x, y] = getGridRange(lines)

  const grid = Array(x + 1).fill().map(() => Array(y + 1).fill(0))

  for (let lineValue of lines) {
    const [start, end] = formatEntry(lineValue)

    if (hasCommonRoot(start, end)) {
      const index = checkUncommonIndex(start, end)

      const commonIndex = index === 1 ? 0 : 1

      let startIndex = Math.min(start[index], end[index])
      let endIndex = Math.max(start[index], end[index])

      for (let i = startIndex; i <= endIndex; i++) {

        if (commonIndex === 1) {
          grid[start[commonIndex]][i] += 1
        } else {
          grid[i][start[commonIndex]] += 1
        }
      }
    } else {
      const diff = Math.abs(start[0] - end[0])

      for (let j = 0; j <= diff; j++) {
        if (start[0] < end[0] && start[1] < end[1]) {
          grid[start[1] + j][start[0] + j] += 1
        } else if (start[0] > end[0] && start[1] > end[1]) {
          grid[start[1] - j][start[0] - j] += 1
        } else if (start[0] < end[0] && start[1] > end[1]) {
          grid[start[1] - j][start[0] + j] += 1
        } else if (start[0] > end[0] && start[1] < end[1]) {
          grid[start[1] + j][start[0] - j] += 1
        }
      }
    }
  }

  const flattenGrid = grid.reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue),
    []
  )

  const twoOrGreater = flattenGrid.filter( entry => Number(entry) >= 2 )

  return twoOrGreater.length
}

console.log("The count of points greater than 1 is: ", countPointsAboveTwo(formattedInput))
console.log("The count of points greater than 1 including diagonals is: ", countPointsAboveTwoDiagonal(formattedInput))
