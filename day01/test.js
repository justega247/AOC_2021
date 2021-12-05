import { countIncrement, countGroupedIncrement } from "./answer"

test("Calculates the correct number of increment", () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
  expect (countIncrement(input)).toBe(7);
});

test("Calculates the correct number of grouped increment", () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
  expect (countGroupedIncrement(input)).toBe(5);
});
