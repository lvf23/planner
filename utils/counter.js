class Counter {
  #counter;
  #initialCounter;

  constructor(initialCounter = 0) {
    this.#counter = initialCounter;
    this.#initialCounter = initialCounter;
  }

  decrement() {
    this.#counter--;
  }

  getCounter() {
    return this.#counter;
  }

  greaterThan(value) {
    return this.#counter > value;
  }

  greaterThanEqual(value) {
    return this.#counter >= value;
  }

  increment() {
    this.#counter++;
  }

  isEqual(value) {
    return this.#counter == value;
  }

  reset() {
    this.#counter = this.#initialCounter;
  }

  setCounter(value) {
    this.#counter = value;
  }
}

export { Counter };
