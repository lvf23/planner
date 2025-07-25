import { getProjects } from "#services/project";
import { getSubjects } from "#services/subject";
import { getTasks } from "#services/task";

const buildTaskTree = (task) => {
  delete task.parentId;
  delete task.subjectId;

  const childrenTasks = getTasks({
    parentId: task.id,
  }).map(buildTaskTree);

  task.children = childrenTasks;

  if (childrenTasks.length) {
    task.allChildrenDone = childrenTasks.every((childTask) => {
      return childTask.allChildrenDone ?? childTask.done;
    });
  }

  return task;
};

const buildSubjectTree = (subject) => {
  delete subject.projectId;

  const tasks = getTasks({
    subjectId: subject.id,
  }).map(buildTaskTree);

  subject.tasks = tasks;

  if (tasks.length) {
    subject.allTasksDone = tasks.every((task) => {
      return task.allChildrenDone ?? task.done;
    });
  }

  return subject;
};

const buildProjectTree = (project) => {
  const subjects = getSubjects({
    projectId: project.id,
  }).map(buildSubjectTree);

  project.subjects = subjects;

  if (subjects.length) {
    project.allSubjectsDone = subjects.every((subject) => {
      return subject.allTasksDone ?? subject.done;
    });
  }

  return project;
};

const buildDataTree = () => {
  const projects = getProjects().map(buildProjectTree);

  return {
    projects,
  };
};

export { buildDataTree };
