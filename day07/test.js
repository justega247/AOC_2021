import { calculateCrabFuel, calculateFuel } from "./answer";

test("Calculates the correct amount of fuel used", () => {
  const input = [16,1,2,0,4,2,7,1,2,14]

  expect (calculateFuel(input)).toBe(37);
});

test("Calculates the correct amount of fuel used with crab engineering", () => {
  const input = [16,1,2,0,4,2,7,1,2,14,5]

  expect (calculateCrabFuel(input)).toBe(168);
});
