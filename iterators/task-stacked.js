import { Counter } from "#utils/counter";

import { TaskIteratorStack } from "#helpers/task-iterator-stack";

class TaskStackedIterator extends Iterator {
  #subject;
  #iteratorStack;
  #filter;
  #counter;

  constructor(subject) {
    super();

    this.#subject = subject;
    this.#iteratorStack = new TaskIteratorStack(subject);
    this.#counter = new Counter();
  }

  getTasksCount() {
    return this.#counter.getCounter();
  }

  hasNext() {
    const stack = this.#iteratorStack.getStack();

    return !stack.isEmpty();
  }

  next() {
    const stack = this.#iteratorStack.getStack();

    const taskIterator = stack.peek();
    const task = taskIterator.next();

    if (taskIterator.hasNext()) {
      this.#iteratorStack.checkChildrenIterators();
    } else {
      this.#iteratorStack.advanceParentIterator();
    }

    this.#counter.increment();

    return task;
  }

  peek() {
    const stack = this.#iteratorStack.getStack();
    if (stack.isEmpty()) {
      return null;
    }

    const taskIterator = stack.peek();

    const task = taskIterator.peek();

    return task;
  }

  toArray() {
    const tasks = [];

    const taskIterator = new TaskStackedIterator(this.#subject, this.#filter);

    while (taskIterator.hasNext()) {
      const task = taskIterator.next();

      tasks.push(task);
    }

    return tasks;
  }
}

export { TaskStackedIterator };
