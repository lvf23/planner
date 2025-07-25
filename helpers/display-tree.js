const buildTaskDisplay = (task) => {
  const doneStr = task.allChildrenDone ?? task.done ? "x" : " ";

  return `[${doneStr}] (#${task.id}) {$${task.localId}} ${task.name}`;
};

const buildTasksDisplayTree = (tasks) => {
  if (!tasks.length) {
    return {};
  }

  const [firstTask] = tasks;

  if (!firstTask) {
    return {};
  }

  const taskType = firstTask.type + "s";

  const tasksObj = tasks.reduce((obj, task) => {
    obj[buildTaskDisplay(task)] = buildTasksDisplayTree(task.children);

    return obj;
  }, {});

  return {
    [taskType]: tasksObj,
  };
};

const buildSubjectDisplayTree = (subject) => {
  return buildTasksDisplayTree(subject.tasks);
};

const buildProjectDisplayTree = (project) => {
  const subjects = project.subjects.reduce((obj, subject) => {
    const doneStr = subject.allTasksDone ? "x" : " ";

    const displaySubjectLabel = `[${doneStr}] (#${subject.id}) {$${subject.localId}} ${subject.name}`;

    obj[displaySubjectLabel] = buildSubjectDisplayTree(subject);

    return obj;
  }, {});

  return {
    subjects,
  };
};

const buildDisplayTree = (dataTree) => {
  let projects = dataTree.projects.reduce((obj, project) => {
    const doneStr = project.allSubjectsDone ? "x" : " ";
    const displayProjectLabel = `[${doneStr}] (#${project.id}) ${project.name} - ${project.start} - ${project.end}`;

    obj[displayProjectLabel] = buildProjectDisplayTree(project);

    return obj;
  }, {});

  return {
    projects,
  };
};

export { buildDisplayTree };
