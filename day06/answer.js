import fs from "fs"

const readInput = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const regex = /\n/g;

const formattedInput = readInput.trim().replace(regex, '').split(',').map(x => Number(x));

const readyBaseData = (input) => {

  let mappedInput = input.reduce((obj, b) => {
      obj[b] = ++obj[b] || 1;
      return obj;
  }, {});

  let checkData = Array(9).fill(0)

  for (let entry in mappedInput) {
      let intValue = Number(entry)

      checkData[intValue] = mappedInput[entry]

  }

  return checkData
}


const generateNext = (data) => {
  let zeroCount = data[0]

  let sliced = data.slice(1)

  data.splice(0, 8, ...sliced)
  data[6] += zeroCount
  data[8] = zeroCount

  return data
}



export const countLanternFish = (input, days) => {

  const data = readyBaseData(input)

  while (days > 0) {

      input = generateNext(data)
      days -= 1
  }

  const reducer = (previousValue, currentValue) => Number(previousValue) + Number(currentValue);

  const numberOfFish = input.reduce(reducer, 0)


  return numberOfFish
}

console.log("The number of lanternfish after 80 days is: ", countLanternFish(formattedInput, 80))
console.log("The number of lanternfish after 256 days is: ", countLanternFish(formattedInput, 256))

// Inspired by pascal22p's code approach to solving it
