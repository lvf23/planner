import { buildDataTree } from "#composites/data-tree";

import { buildDisplayTree } from "#helpers/display-tree";
import { printTree } from "#helpers/tree-printer";

const renderUnifiedTree = () => {
  const dataTree = buildDataTree();
  const displayTree = buildDisplayTree(dataTree);

  printTree({
    parentNode: displayTree,
  });

  return {
    dataTree,
    displayTree,
  };
};

export { renderUnifiedTree };
