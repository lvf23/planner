import dotenv from "dotenv";

import { renderScheduler } from "#facades/scheduler";
import { renderUnifiedTree } from "#facades/unified-tree";

import { printHeader } from "#helpers/header-printer";
import { printProjects } from "#helpers/projects-printer";

import { Scheduler } from "#services/scheduler";

import { printSeparatorBlock } from "#utils/printer";

dotenv.config();

const schedulerInstance = new Scheduler();

printHeader();

printSeparatorBlock({
  numLinesStart: 0,
  separator: {
    character: "=",
  },
});

printProjects(schedulerInstance);

printSeparatorBlock({
  separator: {
    character: "=",
  },
});

renderUnifiedTree();

printSeparatorBlock({
  separator: {
    character: "=",
  },
});

renderScheduler(schedulerInstance);
