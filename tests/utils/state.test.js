import { State } from "#utils/state";

describe("State", () => {
  const initial = { count: 0, name: "test" };
  let state;

  beforeEach(() => {
    state = new State(initial);
  });

  test("get", () => {
    expect(state.get("count")).toBe(0);
    expect(state.get("name")).toBe("test");
  });

  test("getState", () => {
    const currentState = state.getState();
    expect(currentState).toEqual(initial);
    expect(currentState).not.toBe(state);
  });

  test("set", () => {
    state.set("count", 5);
    expect(state.get("count")).toBe(5);
  });

  test("setState", () => {
    state.setState({ count: 10 });
    expect(state.get("count")).toBe(10);
    expect(state.get("name")).toBe("test");
  });

  test("replaceState", () => {
    const newState = { count: 99, extra: true };
    state.replaceState(newState);
    expect(state.getState()).toEqual(newState);
  });

  test("reset", () => {
    state.set("count", 5);
    state.set("name", "changed");
    state.reset();
    expect(state.getState()).toEqual(initial);
  });
});
