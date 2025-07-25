import { Counter } from "#utils/counter";

describe("Counter Utility Class", () => {
  let counter;

  describe("when initialized without arguments", () => {
    beforeEach(() => {
      counter = new Counter();
    });

    test("getCounter() should return 0", () => {
      expect(counter.getCounter()).toBe(0);
    });

    test("increment() should increase counter by 1", () => {
      counter.increment();
      expect(counter.getCounter()).toBe(1);
    });

    test("decrement() should decrease counter by 1", () => {
      counter.decrement();
      expect(counter.getCounter()).toBe(-1);
    });

    test("greaterThan() should return correct comparison", () => {
      expect(counter.greaterThan(-1)).toBe(true);
      expect(counter.greaterThan(0)).toBe(false);
    });

    test("greaterThanEqual() should return correct comparison", () => {
      expect(counter.greaterThanEqual(0)).toBe(true);
      expect(counter.greaterThanEqual(1)).toBe(false);
    });

    test("isEqual() should return true when equal", () => {
      expect(counter.isEqual(0)).toBe(true);
    });

    test("reset() should reset counter to initial value", () => {
      counter.increment();
      counter.reset();
      expect(counter.getCounter()).toBe(0);
    });

    test("setCounter() should overwrite counter value", () => {
      counter.setCounter(42);
      expect(counter.getCounter()).toBe(42);
    });
  });

  describe("when initialized with a custom value", () => {
    beforeEach(() => {
      counter = new Counter(10);
    });

    test("getCounter() should return the custom initial value", () => {
      expect(counter.getCounter()).toBe(10);
    });

    test("reset() should return to the initial custom value", () => {
      counter.increment();
      counter.reset();
      expect(counter.getCounter()).toBe(10);
    });
  });
});
