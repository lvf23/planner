import { printScheduler } from "#helpers/scheduler-printer";

const renderScheduler = (schedulerInstance) => {
  const scheduler = schedulerInstance.getScheduler();

  printScheduler(scheduler);
};

export { renderScheduler };
