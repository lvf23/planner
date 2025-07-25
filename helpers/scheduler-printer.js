import { getProject } from "#services/project";
import { getSubject } from "#services/subject";
import { getTask } from "#services/task";

import { getWeekDayLabel, parseDate, sortDates } from "#utils/date";
import {
  printBlankLine,
  printLine,
  printTitleWithSeparator,
} from "#utils/printer";

const formatTaskPath = (taskPath) => {
  const { project, subject, ancestors, task } = taskPath;

  const doneStr = task.done ? "x" : " ";

  const checkboxStr = `[${doneStr}]`;
  const projectPath = `Project: (#${project.id}) ${project.name}`;
  const subjectPath = `Subject: (#${subject.id}) {$${subject.localId}} ${subject.name}`;
  const finalTaskPath = `Task: (#${task.id}) {$${task.localId}} [${task.type}] ${task.name}`;

  const ancestorsPath = ancestors
    .map((ancestor) => {
      return `Ancestor: (#${ancestor.id}) {$${ancestor.localId}} [${ancestor.type}] ${ancestor.name}`;
    })
    .join(" / ");

  const taskPathParts = [
    `${checkboxStr} ${projectPath}`,
    `${subjectPath}`,
    `${ancestorsPath}`,
    `${finalTaskPath}`,
  ];

  const formattedTaskPath = taskPathParts.filter((part) => part).join(" / ");

  return formattedTaskPath;
};

const getTaskPath = (task) => {
  const ancestors = [];

  let currentTask = task;

  while (!currentTask.subjectId) {
    currentTask = getTask({
      id: currentTask.parentId,
    });

    ancestors.push(currentTask);
  }

  ancestors.reverse();

  const subject = getSubject({
    id: currentTask.subjectId,
  });

  const project = getProject({
    id: subject.projectId,
  });

  return {
    project,
    subject,
    ancestors,
    task,
  };
};

const printSchedulerBlock = (scheduler, blockName, blockTitle) => {
  const block = scheduler[blockName];

  if (!block) {
    return;
  }

  const dates = Object.keys(block);

  sortDates(dates);

  printLine(blockTitle);
  printBlankLine();

  dates.forEach((formattedDate) => {
    const date = parseDate(formattedDate);

    const weekDay = date.getDay();
    const weekDayLabel = getWeekDayLabel(weekDay);

    const formattedDateTitle = `${formattedDate} - ${weekDayLabel}`;

    printTitleWithSeparator(formattedDateTitle);
    printBlankLine();

    const tasksPerProject = block[formattedDate];

    Object.entries(tasksPerProject).forEach(([projectId, tasks]) => {
      const project = getProject({
        id: Number(projectId),
      });

      printLine(
        `Project: (#${project.id}) ${project.name} - (${tasks.length}):`
      );
      printBlankLine();

      tasks.forEach((task) => {
        const taskPath = getTaskPath(task);

        const formattedTaskPath = formatTaskPath(taskPath);

        printLine(formattedTaskPath);
      });

      printBlankLine();
    });
  });
};

const printScheduler = (scheduler) => {
  printSchedulerBlock(scheduler, "done", "DONE");
  printSchedulerBlock(scheduler, "todo", "TODO");
};

export { printScheduler };
