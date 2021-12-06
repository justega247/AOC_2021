import fs from "fs"

const readInput = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const formattedInput = readInput.trim().split('\n');

export const calculatePower = (diagnosticReport) => {
  let gamma = ""
  let epsilon = ""

  const singleReportLength = diagnosticReport[0].length

  for (let i = 0; i < singleReportLength; i++) {
    let zeroCount = 0
    let oneCount = 0

    for (let j = 0; j < diagnosticReport.length; j++) {
      diagnosticReport[j][i] === "0" ? zeroCount += 1 : oneCount += 1
    }

    if (zeroCount > oneCount) {
      gamma += "0"
      epsilon += "1"
    } else {
      gamma += "1"
      epsilon += "0"
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

export const calculateLifeSupportRating = (diagnosticReport) => {

  let oxygenRating;
  let co2Rating;

  let oxyIndex = 1
  let co2Index = 1


  const selectRating = (values, index) => {

    let zeroCount = 0
    let oneCount = 0

    for (let value of values) {
      value[index] === "0" ? zeroCount += 1 : oneCount += 1
    }

    if (zeroCount > oneCount) {
      oxygenRating = values.filter(val => val[index] === "0")
      co2Rating = values.filter(val => val[index] === "1")
    } else if (zeroCount < oneCount) {
      oxygenRating = values.filter(val => val[index] === "1")
      co2Rating = values.filter(val => val[index] === "0")
    } else {
      oxygenRating = values.filter(val => val[index] === "1")
      co2Rating = values.filter(val => val[index] === "0")
    }
  }

  const initialize = () => selectRating(diagnosticReport, 0)

  initialize()

  while (oxygenRating.length !== 1) {
    selectRating(oxygenRating, oxyIndex)
    oxyIndex += 1
  }

  const finalOxyRating = oxygenRating[0]

  initialize()

  while (co2Rating.length !== 1) {
    selectRating(co2Rating, co2Index)
    co2Index += 1
  }

  const finalCo2Rating = co2Rating[0]

  return parseInt(finalOxyRating, 2) * parseInt(finalCo2Rating, 2)
}

console.log("The power consumption is: ", calculatePower(formattedInput))
console.log("The life support rating is: ", calculateLifeSupportRating(formattedInput))
