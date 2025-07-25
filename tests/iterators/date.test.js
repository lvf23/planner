import { DateIterator } from "#iterators/date";

describe("Date Iterator Class", () => {
  test("calculate duration", () => {
    const dateIntervalIterator = new DateIterator(
      "01/01/2025",
      "08/01/2025",
      ({ date }) => {
        const day = date.getDay();

        if (day == 0 || day == 6) {
          return false;
        }

        return true;
      }
    );

    const duration = dateIntervalIterator.toArray().length;

    expect(duration).toBe(5);
  });

  describe("toArray", () => {
    const start = "01/06/2025";
    const end = "30/06/2025";

    const skipWeekends = ({ date }) => {
      const day = date.getDay();

      if (day == 0 || day == 6) {
        return false;
      }

      return true;
    };

    test("inclusive = true", () => {
      const dateIterator = new DateIterator(start, end, skipWeekends, true);

      const dates = [];

      while (dateIterator.hasNext()) {
        const date = dateIterator.next();

        dates.push(date);
      }

      const dateArray = dateIterator.toArray();

      expect(dates).toStrictEqual(dateArray);
      expect(dates.length).toBe(21);
    });

    test("inclusive = false", () => {
      const dateIterator = new DateIterator(start, end, null, false);

      const dates = [];

      while (dateIterator.hasNext()) {
        const date = dateIterator.next();

        dates.push(date);
      }

      const dateArray = dateIterator.toArray();

      expect(dates).toStrictEqual(dateArray);
      expect(dates.length).toBe(29);
    });
  });

  test("manual iteration", () => {
    const dateIterator = new DateIterator(
      "01/01/2025",
      "31/12/2025",
      null,
      true
    );

    const dates = [];

    const dateArray = dateIterator.toArray();

    while (dateIterator.hasNext()) {
      const date = dateIterator.peek();

      dates.push(date);

      dateIterator.next();
    }

    expect(dates.length).toBe(365);
    expect(dateArray.length).toBe(365);
    expect(dates).toStrictEqual(dateArray);
  });
});
