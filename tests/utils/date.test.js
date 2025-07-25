import { copyDate, formatDate, parseDate } from "#utils/date";

describe("Date Utility", () => {
  describe("copyDate", () => {
    test("right", () => {
      const date = new Date(2025, 5, 9);
      const dateCopy = copyDate(date);

      date.setDate(date.getDate() + 1);

      expect(date.getDate()).not.toBe(dateCopy.getDate());
    });

    test("wrong", () => {
      const date = new Date(2025, 5, 9);
      const dateCopy = date;

      date.setDate(date.getDate() + 1);

      expect(date.getDate()).toBe(dateCopy.getDate());
    });
  });

  test("formatDate", () => {
    expect(formatDate(new Date(2025, 11, 25))).toBe("25/12/2025");
  });

  describe("parseDate", () => {
    test("string", () => {
      const date = parseDate("01/01/2025");

      expect(date.getDate()).toBe(1);
      expect(date.getMonth()).toBe(0);
      expect(date.getFullYear()).toBe(2025);
    });

    test("date", () => {
      const inputDate = new Date(2025, 3, 22);

      const parsedDate = parseDate(inputDate);

      expect(parsedDate instanceof Date).toBeTruthy();

      expect(parsedDate.getDate()).toBe(22);
      expect(parsedDate.getMonth()).toBe(3);
      expect(parsedDate.getFullYear()).toBe(2025);
    });
  });
});
