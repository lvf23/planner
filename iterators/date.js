import { Iterator } from "#iterators/iterator";

import { Counter } from "#utils/counter";
import { formatDate, parseDate } from "#utils/date";

class DateIterator extends Iterator {
  #start;
  #end;
  #filter;

  #startDate;
  #endDate;

  #currentDate;

  #inclusive;
  #counter;

  constructor(start, end, filter, inclusive = false) {
    super();

    this.#start = start;
    this.#end = end;

    this.#startDate = parseDate(this.#start);
    this.#endDate = parseDate(this.#end);

    this.#filter = filter;

    const validDate = this.#getValidDate(this.#startDate);

    this.#setCurrentDate(validDate);

    this.#inclusive = inclusive;
    this.#counter = new Counter();
  }

  #applyFilter(date) {
    if (this.#filter) {
      return this.#filter(this.#getDateParams(date));
    }

    return true;
  }

  #clone() {
    const dateIterator = new DateIterator(
      this.#start,
      this.#end,
      this.#filter,
      this.#inclusive
    );

    return dateIterator;
  }

  count() {
    return this.#counter.getCounter();
  }

  #getDateParams(date) {
    return {
      date,
      formattedDate: formatDate(date),
    };
  }

  #getValidDate(date) {
    if (!this.#validateDate(date)) {
      return null;
    }

    let dateCopy = new Date(date);

    while (this.#isAvailableDate(dateCopy) && !this.#applyFilter(dateCopy)) {
      dateCopy = this.#incrementDate(dateCopy);
    }

    return dateCopy;
  }

  hasNext() {
    return this.#isAvailableDate(this.#currentDate);
  }

  #incrementDate(date, value = 1) {
    const dateCopy = new Date(date);

    dateCopy.setDate(dateCopy.getDate() + value);

    return dateCopy;
  }

  #isAvailableDate(date) {
    if (this.#inclusive) {
      return this.#validateDate(date) && date <= this.#endDate;
    } else {
      return this.#validateDate(date) && date < this.#endDate;
    }
  }

  next() {
    if (!this.#isAvailableDate(this.#currentDate)) {
      return null;
    }

    const validDate = this.#getValidDate(this.#currentDate);

    if (!this.#validateDate(validDate)) {
      return null;
    }

    let nextDate = this.#incrementDate(this.#currentDate);

    nextDate = this.#getValidDate(nextDate);

    this.#setCurrentDate(nextDate);

    this.#counter.increment();

    return this.#getDateParams(validDate);
  }

  peek() {
    if (
      this.#validateDate(this.#currentDate) &&
      this.#isAvailableDate(this.#currentDate)
    ) {
      return this.#getDateParams(this.#currentDate);
    }

    return null;
  }

  reset() {
    const validDate = this.#getValidDate(this.#startDate);

    this.#setCurrentDate(validDate);
    this.#counter.reset();
  }

  #setCurrentDate(date) {
    const copyDate = new Date(date);

    if (this.#validateDate(copyDate)) {
      this.#currentDate = copyDate;
      return true;
    }

    return false;
  }

  toArray() {
    const dateIterator = this.#clone();

    const dates = [];

    while (dateIterator.hasNext()) {
      const params = dateIterator.next();

      dates.push(params);
    }

    return dates;
  }

  #validateDate(date) {
    if (date instanceof Date && !isNaN(date)) {
      return true;
    }

    return false;
  }
}

export { DateIterator };
