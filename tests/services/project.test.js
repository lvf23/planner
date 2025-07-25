import { getProjects, getProject } from "#services/project";

describe("Project Service", () => {
  test("Get projects", () => {
    const projects = getProjects();

    expect(projects).toStrictEqual([
      {
        id: 1,
        name: "College Semester",
        start: "01/01/2026",
        end: "01/07/2026",
      },
      {
        id: 2,
        name: "Public Tender",
        start: "01/01/2026",
        end: "31/12/2026",
      },
    ]);
  });

  test("getProject", () => {
    const project = getProject({
      id: 1,
    });

    expect(project).toStrictEqual({
      id: 1,
      name: "College Semester",
      start: "01/01/2026",
      end: "01/07/2026",
    });
  });
});
