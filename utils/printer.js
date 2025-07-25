const printBlankLine = () => {
  console.log("");
};

const printBlankLines = (numLines) => {
  for (let i = 0; i < numLines; i++) {
    printBlankLine();
  }
};

const printLine = (text = "", spaces = 0, spaceSize = 2) => {
  const spacePad = " ".repeat(spaces * spaceSize);

  console.log(`${spacePad}${text}`);
};

const printObject = (obj) => {
  const keys = Object.keys(obj);

  const maxKeyLength = Math.max(...keys.map((key) => key.length));

  keys.forEach((key) => {
    const value = obj[key];
    const paddedKey = key.padEnd(maxKeyLength + 2, " ");
    console.log(`${paddedKey}: ${value}`);
  });
};

const printSeparator = (character = "-", length = 80) => {
  console.log(character.repeat(length));
};

const printSeparatorBlock = (params = {}) => {
  const { numLinesStart = 1, numLinesEnd = 1, separator = {} } = params;

  if (!separator.character) {
    separator.character = undefined;
  }

  if (!separator.length) {
    separator.length = undefined;
  }

  printBlankLines(numLinesStart);
  printSeparator(separator.character, separator.length);
  printBlankLine(numLinesEnd);
};

const printTitleWithSeparator = (title) => {
  const maxSeparatorLength = 80;

  const separatorLength = Math.max(maxSeparatorLength - title.length + 1, 0);

  const separatorStr = "-".repeat(separatorLength);
  const titleWithSeparator = `${title} ${separatorStr}`;

  console.log(titleWithSeparator);
};

export {
  printBlankLine,
  printLine,
  printObject,
  printSeparator,
  printSeparatorBlock,
  printTitleWithSeparator,
};
