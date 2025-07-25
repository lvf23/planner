class ArrayDB {
  #originalArray;
  #currentArray;

  constructor(array) {
    this.#originalArray = [...array];

    this.#currentArray = [...this.#originalArray];
  }

  find(query = {}) {
    this.#currentArray = this.#currentArray.filter(this.#translateQuery(query));

    return this;
  }

  findOne(query = {}) {
    return this.#currentArray.find(this.#translateQuery(query));
  }

  reset() {
    this.#currentArray = [...this.#originalArray];
    return this;
  }

  sort(query = {}) {
    this.#currentArray = this.#currentArray
      .slice(0)
      .sort(this.#translateSort(query));

    return this;
  }

  #translateQuery(query = {}) {
    if (typeof query == "object" && Object.keys(query).length === 0) {
      return () => true;
    }

    return (item) => {
      return Object.entries(query)
        .filter(([key, value]) => value !== undefined)
        .every(([key, value]) => item[key] === value);
    };
  }

  #translateSort(sort = {}) {
    const entries = Object.entries(sort);

    if (entries.length === 0) {
      return () => 0;
    }

    return (a, b) => {
      for (const [key, order] of entries) {
        const dir = order === -1 ? -1 : 1;
        if (a[key] < b[key]) return -1 * dir;
        if (a[key] > b[key]) return 1 * dir;
      }
      return 0;
    };
  }

  value() {
    return this.#currentArray;
  }
}

export { ArrayDB };
