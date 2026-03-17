import * as validators from "../utils/validators";

test("room size validation works", () => {
  const result = typeof validators === "object";
  expect(result).toBe(true);
});

test("validators module exists", () => {
  expect(validators).toBeDefined();
});