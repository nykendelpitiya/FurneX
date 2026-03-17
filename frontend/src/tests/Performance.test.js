test("performance test", () => {
  const start = performance.now();

  for (let i = 0; i < 10000; i++) {
    Math.sqrt(i);
  }

  const end = performance.now();

  expect(end - start).toBeLessThan(100);
});