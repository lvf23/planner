class State {
  #state;
  #initialState;

  constructor(initialState) {
    this.#initialState = { ...initialState };
    this.#state = { ...this.#initialState };
  }

  get(key) {
    return this.#state[key];
  }

  getState() {
    return { ...this.#state };
  }

  replaceState(newState) {
    this.#state = { ...newState };
  }

  reset() {
    this.#state = { ...this.#initialState };
  }

  set(key, value) {
    this.#state[key] = value;
  }

  setState(partial) {
    this.#state = { ...this.#state, ...partial };
  }
}

export { State };
