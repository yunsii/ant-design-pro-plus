export interface TreeToListConfig {
  childrenFieldName: string;
  nodeTransfer?: (node: any) => any;
}

const defaultTreeToListConfig = {
  childrenFieldName: 'children',
};

export function flatTreeToList<T>(tree: T[], customConfig: TreeToListConfig): T[] {
  const config = {
    ...defaultTreeToListConfig,
    ...customConfig,
  };
  const { childrenFieldName, nodeTransfer } = config;
  const result = [];

  function flatTree(item: T[]) {
    item.forEach(node => {
      if (nodeTransfer) {
        result.push(nodeTransfer(node));
      } else {
        result.push(node);
      }
      if (node[childrenFieldName] && node[childrenFieldName].length > 0) {
        flatTree(node[childrenFieldName]);
      }
    });
  }

  flatTree(tree);
  return result;
}
