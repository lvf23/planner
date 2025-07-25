import { Iterator } from "#iterators/iterator";

class ArrayIterator extends Iterator {
  #array;
  #index;

  constructor(array) {
    super();

    this.#array = array;
    this.#index = 0;
  }

  get currentItem() {
    return this.peek();
  }

  hasNext() {
    return this.#index < this.#array.length;
  }

  next() {
    if (this.#index >= this.#array.length) {
      return null;
    }

    return this.#array[this.#index++];
  }

  peek() {
    return this.#array[this.#index];
  }

  reset(value = 0) {
    this.#index = value;
  }

  toArray() {
    return [...this.#array];
  }
}

export { ArrayIterator };
