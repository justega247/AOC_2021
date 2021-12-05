import fs from "fs"

const readInput = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const formattedInput = readInput.trim().split('\n');

export const multiplyDisplacements = (displacements) => {
  let horizontalDisplacement = 0;
  let verticalDisplacement = 0;

  const add = (displacement, value) => displacement + value;
  const subtract = (displacement, value) => displacement - value;

  for (let displacementValue of displacements) {
    const [direction, value] = displacementValue.split(" ")

    if (direction === "forward") {
      horizontalDisplacement = add(horizontalDisplacement, Number(value))
    }
    else if (direction === "down") {
      verticalDisplacement = add(verticalDisplacement, Number(value))
    } else {
      verticalDisplacement = subtract(verticalDisplacement, Number(value))
    }
  }

  return horizontalDisplacement * verticalDisplacement
}

export const multiplyAimDisplacements = (displacements) => {
  let horizontalDisplacement = 0;
  let depthDisplacement = 0;
  let aim = 0;

  const add = (displacement, value) => displacement + value;
  const subtract = (displacement, value) => displacement - value;

  for (let displacementValue of displacements) {
    const [direction, value] = displacementValue.split(" ")

    if (direction === "forward") {
      horizontalDisplacement = add(horizontalDisplacement, Number(value))
      depthDisplacement = add(depthDisplacement, (Number(value) * aim))
    }
    else if (direction === "down") {
      aim += Number(value)
    } else {
      aim -= Number(value)
    }
  }

  return horizontalDisplacement * depthDisplacement
}

console.log("The result of multiplying the displacements is: ", multiplyDisplacements(formattedInput))
console.log("The result of multiplying the displacements is: ", multiplyAimDisplacements(formattedInput))
