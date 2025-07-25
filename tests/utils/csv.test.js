import { loadCSV } from "#utils/csv";

describe("CSV Utility", () => {
  test("loadCSV", () => {
    const cars = loadCSV("./tests/data/cars.test.csv");

    const expectedCars = [
      {
        id: "1",
        name: "ford",
        year: "1974",
      },
      {
        id: "2",
        name: "byd",
        year: "2025",
      },
      {
        id: "3",
        name: "ferrari",
        year: "1984",
      },
      {
        id: "4",
        name: "toyota",
        year: "1991",
      },
    ];

    expect(cars).toStrictEqual(expectedCars);
  });
});
