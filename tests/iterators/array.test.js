import { ArrayIterator } from "#iterators/array";

describe("Array Iterator Class", () => {
  describe("Iteration mode", () => {
    describe("Linear", () => {
      test("automatic", () => {
        const fruits = ["banana", "apple", "pear", "grapes"];

        const arrayIterator = new ArrayIterator(fruits);
        const collectedItems = [];

        while (arrayIterator.hasNext()) {
          collectedItems.push(arrayIterator.next());
        }

        expect(collectedItems).toStrictEqual(fruits);
      });

      test("manual", () => {
        const letters = ["A", "B", "C", "Z"];

        const arrayIterator = new ArrayIterator(letters);
        const collectedItems = [];

        while (arrayIterator.hasNext()) {
          collectedItems.push(arrayIterator.peek());

          arrayIterator.next();
        }

        expect(collectedItems).toStrictEqual(letters);
      });
    });
  });

  test("toArray", () => {
    const arrayIterator = new ArrayIterator(["jan", "ken", "pon"]);

    expect(arrayIterator.toArray()).toStrictEqual(["jan", "ken", "pon"]);
  });
});
