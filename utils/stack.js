class Stack {
  #items;

  constructor(initialStack = []) {
    this.#items = initialStack;
  }

  clear() {
    this.#items = [];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items[this.#items.length - 1];
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items.pop();
  }

  push(element) {
    this.#items.push(element);
  }

  size() {
    return this.#items.length;
  }

  toArray() {
    return [...this.#items];
  }
}

export { Stack };
