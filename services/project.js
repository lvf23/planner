import { ArrayDB } from "#utils/array-db";
import { loadCSV } from "#utils/csv";
import { checkSample } from "#utils/sample";
import { isTest } from "#utils/test";

const mapProject = (record) => {
  const { id, name, start, end } = record;

  return {
    id: Number(id),
    name,
    start,
    end,
  };
};

const getProject = (query) => {
  const projects = getProjects();

  const project = new ArrayDB(projects).findOne(query);

  return project;
};

const getProjects = (query = {}) => {
  const csvPath = isTest()
    ? "./tests/data/projects.test.csv"
    : "./data/projects.csv";

  checkSample("data/projects.sample.csv", "data/projects.csv");

  const records = loadCSV(csvPath);
  const projects = records.map(mapProject);

  const queriedProjects = new ArrayDB(projects).find(query).value();

  return queriedProjects;
};

export { getProject, getProjects };
