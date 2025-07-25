import fs from "node:fs";
import path from "node:path";

import { isTest } from "#utils/test";

const mainScript = process.argv[1];
const mainDir = path.dirname(mainScript);

const checkSample = (sample, location) => {
  if (isTest()) {
    return;
  }

  const templateFullPath = path.join(mainDir, "samples", sample);
  const locationFullPath = path.join(mainDir, location);

  if (!fs.existsSync(locationFullPath)) {
    if (fs.existsSync(templateFullPath)) {
      fs.copyFileSync(templateFullPath, locationFullPath);
    } else {
      throw new Error(
        `template '${sample}' not found in '${templateFullPath}'.`
      );
    }
  }
};

export { checkSample };
