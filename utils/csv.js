import { readFileSync } from "node:fs";

import { parse } from "csv-parse/sync";

const loadCSV = (csvFile) => {
  const fileContent = readFileSync(csvFile, "utf8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return records;
};

export { loadCSV };
