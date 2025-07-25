import { translate } from "#utils/i18n";

const copyDate = (date) => {
  return new Date(date);
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

const getWeekDayLabel = (weekDay) => {
  const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const translatedWeekDays = weekDays.map((weekDay) => {
    return translate(weekDay, { postProcess: "capitalize" });
  });

  return translatedWeekDays[weekDay];
};

const parseDate = (dateString) => {
  if (dateString instanceof Date) {
    return dateString;
  }

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return date;
};

const sortDates = (dates) => {
  dates.sort((dateA, dateB) => {
    return parseDate(dateA) - parseDate(dateB);
  });
};

export { copyDate, formatDate, getWeekDayLabel, parseDate, sortDates };
