import { multiplyDisplacements, multiplyAimDisplacements } from "./answer";

test("Calculates the correct multiplication value", () => {
  const input = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
  expect (multiplyDisplacements(input)).toBe(150);
});

test("Calculates the correct aim related multiplication value", () => {
  const input = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
  expect (multiplyAimDisplacements(input)).toBe(900);
});
