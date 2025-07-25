import { ArrayDB } from "#utils/array-db";
import { parseBoolean } from "#utils/boolean";
import { loadCSV } from "#utils/csv";
import { checkSample } from "#utils/sample";
import { isTest } from "#utils/test";

const mapTask = (record) => {
  const {
    id,
    name,
    type,
    local_id: localId,
    subject_id: subjectId,
    parent_id: parentId,
    done,
    done_at: doneAt,
  } = record;

  return {
    id: Number(id),
    name,
    type,
    localId: Number(localId),
    subjectId: Number(subjectId),
    parentId: Number(parentId),
    done: parseBoolean(done),
    doneAt,
  };
};

const getTasks = (query = {}) => {
  const csvPath = isTest() ? "./tests/data/tasks.test.csv" : "./data/tasks.csv";

  checkSample("data/tasks.sample.csv", "data/tasks.csv");

  const records = loadCSV(csvPath);

  const tasks = records.map(mapTask);

  const queriedAndSortedTasks = new ArrayDB(tasks)
    .find(query)
    .sort({ localId: 1 })
    .value();

  return queriedAndSortedTasks;
};

const getTask = (query = {}) => {
  const tasks = getTasks();

  const task = new ArrayDB(tasks).findOne(query);

  return task;
};

export { getTask, getTasks };
