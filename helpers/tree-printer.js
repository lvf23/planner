import { printLine } from "#utils/printer";

const printTree = ({ parentNode }, level = 0) => {
  for (const [key, value] of Object.entries(parentNode)) {
    printLine(key, level);
    printTree({ parentNode: value }, level + 1);
  }
};

export { printTree };
