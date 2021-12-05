import fs from "fs"

const readInput = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const formattedInput = readInput.trim().split('\n');



export const countIncrement = (depths) => {
  let increment = 0

  for (let i = 0; i < depths.length - 1; i++) {
    if (Number(depths[i]) < Number(depths[i + 1])) {
      increment += 1
    }
  }

  return increment
}

export const countGroupedIncrement = (depths) => {
  let groups = []

  for (let i = 0; i < depths.length - 2; i++) {
    groups.push(depths.slice(i, i + 3))
  }

  const reducer = (previousValue, currentValue) => Number(previousValue) + Number(currentValue);

  const groupSum = groups.map(groupItem => groupItem.reduce(reducer, 0))

  return countIncrement(groupSum)
}

console.log("The number of increments is: ", countIncrement(formattedInput))
console.log("The number of grouped increments is: ", countGroupedIncrement(formattedInput))
