import { ArrayIterator } from "#iterators/array";
import { getTasks } from "#services/task";

import { Stack } from "#utils/stack";

class TaskIteratorStack {
  #subject;
  #stack;

  constructor(subject) {
    this.#subject = subject;
    this.#stack = new Stack();

    const subjectTasks = getTasks({
      subjectId: subject.id,
    });

    this.#pushTaskIterator(subjectTasks);
  }

  advanceParentIterator() {
    if (this.#stack.isEmpty()) {
      return;
    }

    const taskIterator = this.#stack.peek();

    if (!taskIterator.hasNext()) {
      this.#stack.pop();
      this.advanceParentIterator();
      return;
    }

    taskIterator.next();

    if (!taskIterator.hasNext()) {
      this.advanceParentIterator();
      return;
    }

    const parentTask = taskIterator.peek();

    const tasks = getTasks({
      parentId: parentTask.id,
    });

    this.#pushTaskIterator(tasks);
  }

  checkChildrenIterators() {
    if (this.#stack.isEmpty()) {
      return;
    }

    const taskIterator = this.#stack.peek();

    const task = taskIterator.peek();

    const childrenTasks = getTasks({
      parentId: task.id,
    });

    if (childrenTasks.length) {
      this.#pushTaskIterator(childrenTasks);
    }
  }

  #pushTaskIterator(tasks) {
    if (!tasks.length) {
      return;
    }

    const taskIterator = new ArrayIterator(tasks);

    this.#stack.push(taskIterator);

    const task = taskIterator.peek();

    const childrenTasks = getTasks({
      parentId: task.id,
    });

    if (childrenTasks.length) {
      this.#pushTaskIterator(childrenTasks);
    }
  }

  getStack() {
    return this.#stack;
  }
}

export { TaskIteratorStack };
