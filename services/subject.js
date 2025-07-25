import { ArrayDB } from "#utils/array-db";
import { loadCSV } from "#utils/csv";
import { checkSample } from "#utils/sample";
import { isTest } from "#utils/test";

const mapSubject = (record) => {
  const { id, name, local_id: localId, project_id: projectId } = record;

  return {
    id: Number(id),
    name,
    localId: Number(localId),
    projectId: Number(projectId),
  };
};

const getSubject = (query) => {
  const subjects = getSubjects();

  const subject = new ArrayDB(subjects).findOne(query);

  return subject;
};

const getSubjects = (query = {}) => {
  const csvPath = isTest()
    ? "./tests/data/subjects.test.csv"
    : "./data/subjects.csv";

  checkSample("data/subjects.sample.csv", "data/subjects.csv");

  const records = loadCSV(csvPath);

  const subjects = records.map(mapSubject);

  const queriedAndSortedSubjects = new ArrayDB(subjects)
    .find(query)
    .sort({ localId: 1 })
    .value();

  return queriedAndSortedSubjects;
};

export { getSubject, getSubjects };
