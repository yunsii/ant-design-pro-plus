type TreeType = any[];
type TreeToListConfigType = {
  childrenFieldName: string;
  nodeTransfer?: (node: any) => any;
};

const defaultTreeToListConfig = {
  childrenFieldName: 'children',
};

export function flatTreeToList(tree: TreeType, customConfig: TreeToListConfigType): any[] {
  const config = {
    ...defaultTreeToListConfig,
    ...customConfig,
  } as TreeToListConfigType;
  const { childrenFieldName, nodeTransfer } = config;
  const result = [];
  function flatTree(item: TreeType) {
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
