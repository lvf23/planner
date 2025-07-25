import { formatDate } from "#utils/date";
import { translate } from "#utils/i18n";
import { printBlankLine, printLine } from "#utils/printer";
import { checkSample } from "#utils/sample";

checkSample(".env.sample", ".env");

const printHeader = () => {
  const date = new Date();

  const formattedDate = formatDate(date);

  const time = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((d) => String(d).padStart(2, "0"))
    .join(":");

  printLine(
    translate("headerTitle", {
      formattedDate,
      time,
      interpolation: { escapeValue: false },
    })
  );
  printBlankLine();
};

export { printHeader };
