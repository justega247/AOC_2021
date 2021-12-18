import fs from "fs"

const readInput = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const regex = /\n/g;

const formattedInput = readInput.trim().replace(regex, '').split(',').map(x => Number(x));

const readyBaseData = (input) => {

  let mappedInputObj = input.reduce((obj, b) => {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});

  return mappedInputObj
}

export const calculateFuel = (input) => {

  let fuel;

  const dataObj = readyBaseData(input)

  const uniqueInput = [... new Set(input)]

  for (let position of uniqueInput) {
    let fuelUsed = 0
    for (let value of uniqueInput) {
      fuelUsed += Math.abs(position - value) * dataObj[value.toString()]
    }

    fuel = fuel ? Math.min(fuel, fuelUsed) : fuelUsed
  }

  return fuel
}

export const calculateCrabFuel = (input) => {

  let fuel;

  const dataObj = readyBaseData(input)

  const uniqueInput = [... new Set(input)]

  for (let position of uniqueInput) {
    let fuelUsed = 0
    for (let value of uniqueInput) {
      let movementMade = Math.abs(position - value)
      let fuelBurnt = (movementMade * (movementMade + 1)) / 2
      fuelUsed += fuelBurnt * dataObj[value.toString()]
    }

    fuel = fuel ? Math.min(fuel, fuelUsed) : fuelUsed
  }

  return fuel
}

console.log("The cheapest fuel value is: ", calculateFuel(formattedInput))
console.log("The cheapest fuel value with crab engineering is: ", calculateCrabFuel(formattedInput))
