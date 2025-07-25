import { getProjects } from "#services/project";

import {
  printBlankLine,
  printLine,
  printObject,
  printSeparatorBlock,
} from "#utils/printer";

const printProjects = (schedulerInstance) => {
  printLine("PROJECTS");
  printBlankLine();

  getProjects().forEach((project, index, projects) => {
    const projectStats = schedulerInstance.getProjectStats(project);

    printObject(project);

    printBlankLine();
    printLine("PROJECT STATS");
    printBlankLine();

    printObject(projectStats);

    if (index != projects.length - 1) {
      printSeparatorBlock();
    }
  });
};

export { printProjects };
