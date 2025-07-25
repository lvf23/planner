import { getTask, getTasks } from "#services/task";

describe("Task Service", () => {
  describe("getTasks", () => {
    test("by subject", () => {
      const tasks = getTasks({
        subjectId: 2,
      });

      expect(tasks.length).toBe(2);
    });

    test("by parent", () => {
      const tasks = getTasks({
        parentId: 1,
      });

      const [task] = tasks;

      expect(tasks.length).toBe(1);
      expect(task.name).toBe("numbers");
    });
  });

  test("getTask", () => {
    const task = getTask({
      id: 1,
    });

    expect(task).toStrictEqual({
      id: 1,
      name: "arithmetic",
      type: "topic",
      localId: 1,
      subjectId: 2,
      parentId: 0,
      done: false,
      doneAt: "",
    });
  });
});
