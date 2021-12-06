import { calculateLifeSupportRating, calculatePower } from "./answer";

test("Calculates the power consumption value", () => {
  const input = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010",
    "01010"]
  expect(calculatePower(input)).toBe(198);
});

test("Calculates the life support rating value", () => {
  const input = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010",
    "01010"]
  expect(calculateLifeSupportRating(input)).toBe(230);
});
