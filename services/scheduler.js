import { ArrayIterator } from "#iterators/array";
import { DateIterator } from "#iterators/date";
import { TaskStackedIterator } from "#iterators/task-stacked";

import { getProject, getProjects } from "#services/project";
import { getSubjects } from "#services/subject";
import { getTasks } from "#services/task";

import { Counter } from "#utils/counter";

class Scheduler {
  #scheduler;

  constructor() {
    const projects = getProjects();

    projects.forEach((project) => {
      this.#handleProjectScheduler(project);
    });
  }

  #countProjectLeaves(project) {
    let projectLeavesCount = 0;

    const subjects = getSubjects({
      projectId: project.id,
    });

    subjects.forEach((subject) => {
      projectLeavesCount += this.#countSubjectLeaves(subject);
    });

    return projectLeavesCount;
  }

  #countSubjectLeaves(subject) {
    let subjectLeavesCount = 0;

    const subjectTasks = getTasks({
      subjectId: subject.id,
    });

    subjectTasks.forEach((task) => {
      subjectLeavesCount += this.#countTaskLeaves(task);
    });

    return subjectLeavesCount;
  }

  #countTaskLeaves(task) {
    let taskLeavesCount = 0;

    const childrenTasks = getTasks({
      parentId: task.id,
    });

    if (childrenTasks.length) {
      childrenTasks.forEach((childTask) => {
        taskLeavesCount += this.#countTaskLeaves(childTask);
      });
    } else if (!(task.done && task.doneAt)) {
      taskLeavesCount++;
    }

    return taskLeavesCount;
  }

  getProjectStats(projectData) {
    let project;

    if (typeof projectData !== "object") {
      project = getProject({ id: projectData });
    } else {
      project = projectData;
    }

    const dateIterator = this.#getProjectDateIterator(project);

    const duration = dateIterator.toArray().length;
    const projectLeavesCount = this.#countProjectLeaves(project);

    const tasksPerDay = Math.floor(projectLeavesCount / duration);
    const remainingTasks = projectLeavesCount % duration;
    const daysPerRemainingTask = Math.floor(duration / remainingTasks);

    return {
      tasks: projectLeavesCount,
      days: duration,
      tasksPerDay,
      remainingTasks,
      daysPerRemainingTask,
    };
  }

  getScheduler() {
    return this.#scheduler;
  }

  #getProjectDateIterator(project) {
    const skipWeekends = ({ date }) => {
      const day = date.getDay();

      if (day == 0 || day == 6) {
        return false;
      }

      return true;
    };

    const dateIterator = new DateIterator(
      project.start,
      project.end,
      skipWeekends,
      true
    );

    return dateIterator;
  }

  #handleDoneTasks(project, subjects) {
    const subjectIterator = new ArrayIterator(subjects);
    const doneTasks = (task) => {
      return task.done && task.doneAt;
    };

    while (subjectIterator.hasNext()) {
      const subject = subjectIterator.next();

      const taskIterator = new TaskStackedIterator(subject);

      while (taskIterator.hasNext()) {
        const task = taskIterator.next();

        if (doneTasks(task)) {
          this.#scheduleDoneTask(project, task);
        }
      }
    }
  }

  #handleProjectScheduler(project) {
    const subjects = getSubjects({
      projectId: project.id,
    });

    this.#handleDoneTasks(project, subjects);
    this.#handleTodoTasks(project, subjects);
  }

  #handleRemainingTasks(
    project,
    dateIterator,
    taskIterator,
    tasksCounter,
    remainingTasksCounter,
    daysPerRemainingTask
  ) {
    if (!remainingTasksCounter.getCounter()) {
      return;
    }

    const daysCount = dateIterator.count();

    if (daysCount % daysPerRemainingTask == 0) {
      if (taskIterator.hasNext()) {
        const task = taskIterator.next();

        const { formattedDate } = dateIterator.peek();

        this.#scheduleTodoTask(project, task, formattedDate);
        tasksCounter.increment();
        remainingTasksCounter.decrement();
      }
    }
  }

  #handleTodoTasks(project, subjects) {
    const dateIterator = this.#getProjectDateIterator(project);

    const dailyTasksCounter = new Counter();
    const tasksCounter = new Counter();

    const subjectIterator = new ArrayIterator(subjects);

    const projectStats = this.getProjectStats(project);
    const { tasksPerDay, remainingTasks, daysPerRemainingTask } = projectStats;

    const remainingTasksCounter = new Counter(remainingTasks);

    const tasksTodo = (task) => {
      if (task.done && task.doneAt) {
        return false;
      }

      return true;
    };

    while (subjectIterator.hasNext()) {
      const subject = subjectIterator.next();

      const taskIterator = new TaskStackedIterator(subject);

      while (taskIterator.hasNext()) {
        const task = taskIterator.next();

        if (tasksTodo(task)) {
          const currentDate = dateIterator.peek();
          const formattedCurrentDate = currentDate.formattedDate;

          this.#scheduleTodoTask(project, task, formattedCurrentDate);

          dailyTasksCounter.increment();
          tasksCounter.increment();

          if (dailyTasksCounter.greaterThanEqual(tasksPerDay)) {
            this.#handleRemainingTasks(
              project,
              dateIterator,
              taskIterator,
              tasksCounter,
              remainingTasksCounter,
              daysPerRemainingTask
            );

            dateIterator.next();
            dailyTasksCounter.reset();

            if (!dateIterator.hasNext()) {
              break;
            }
          }
        }
      }
    }
  }

  #scheduleTask(domain, project, task, formattedDate) {
    if (this.#scheduler === undefined) {
      this.#scheduler = {};
    }

    if (!this.#scheduler[domain]) {
      this.#scheduler[domain] = {};
    }

    const domainObj = this.#scheduler[domain];

    if (!domainObj[formattedDate]) {
      domainObj[formattedDate] = {};
    }

    if (!domainObj[formattedDate][project.id]) {
      domainObj[formattedDate][project.id] = [];
    }

    const projectTasks = domainObj[formattedDate][project.id];

    projectTasks.push(task);
  }

  #scheduleDoneTask(project, task) {
    this.#scheduleTask("done", project, task, task.doneAt);
  }

  #scheduleTodoTask(project, task, formattedDate) {
    this.#scheduleTask("todo", project, task, formattedDate);
  }
}

export { Scheduler };
