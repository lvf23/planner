class Iterator {
  hasNext() {
    throw new Error("Método hasNext() deve ser implementado pela subclasse");
  }
  next() {
    throw new Error("Método next() deve ser implementado pela subclasse");
  }
  peek() {
    throw new Error("Método peek() deve ser implementado pela subclasse");
  }
  reset() {
    throw new Error("Método reset() deve ser implementado pela subclasse");
  }
}

export { Iterator };
