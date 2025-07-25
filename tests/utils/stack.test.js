import { Stack } from "#utils/stack";

describe("Stack Utility Class", () => {
  test("isEmpty", () => {
    const stack = new Stack([]);

    expect(stack.isEmpty()).toBeTruthy();
  });

  test("peek", () => {
    const stack = new Stack(["x", "y", "z"]);

    expect(stack.peek()).toBe("z");
    expect(stack.toArray()).toStrictEqual(["x", "y", "z"]);
  });

  describe("pop", () => {
    test("with items", () => {
      const stack = new Stack(["a", "b", "c"]);

      const poppedItem = stack.pop();

      expect(poppedItem).toBe("c");

      expect(stack.toArray()).toStrictEqual(["a", "b"]);
    });

    test("empty", () => {
      const stack = new Stack([]);

      const poppedItem = stack.pop();

      expect(poppedItem).toBeNull();
    });
  });

  test("push", () => {
    const stack = new Stack();

    stack.push("foo");
    stack.push("bar");
    stack.push("baz");

    expect(stack.toArray()).toStrictEqual(["foo", "bar", "baz"]);
  });

  test("toArray", () => {
    const stack = new Stack(["yellow", "blue", "red", "green"]);

    expect(stack.toArray()).toStrictEqual(["yellow", "blue", "red", "green"]);
  });
});
