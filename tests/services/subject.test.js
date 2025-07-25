import { getSubject, getSubjects } from "#services/subject";

describe("Subject Service", () => {
  test("Get subjects", () => {
    const subjects = getSubjects({ projectId: 1 });

    expect(subjects).toStrictEqual([
      {
        id: 1,
        name: "English",
        localId: 1,
        projectId: 1,
      },
      {
        id: 2,
        name: "Math",
        localId: 2,
        projectId: 1,
      },
      {
        id: 3,
        name: "Biology",
        localId: 3,
        projectId: 1,
      },
      {
        id: 4,
        name: "Chemistry",
        localId: 4,
        projectId: 1,
      },
    ]);

    expect(subjects.find((subject) => subject.projectId === 2)).toBeUndefined();
    expect(
      subjects.find((subject) => subject.name === "Psychology")
    ).toBeUndefined();
  });

  test("getSubject", () => {
    const subject = getSubject({ id: 1 });

    expect(subject).toStrictEqual({
      id: 1,
      name: "English",
      localId: 1,
      projectId: 1,
    });
  });
});
