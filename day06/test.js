import { countLanternFish } from "./answer";

test("Calculates the correct number of lantern fish after a number of days", () => {
  const input = [3,4,3,1,2]
  const days01 = 18
  const days02 = 80

  expect (countLanternFish(input, days01)).toBe(26);
  expect (countLanternFish(input, days02)).toBe(5934);
});
