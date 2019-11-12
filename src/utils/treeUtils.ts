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

export interface UpdateTreeArrayConfig {
  parentIndexField?: string;
  childIndexField?: string;
  childrenFieldName?: string;
}
export type UpdateTreeArrayMode = 'update' | 'addChild' | 'deleteChild';
/**
 *
 * @param mode 'update' | 'addChild' | 'deleteChild', default 'update'.
 * @param array tree array.
 * @param target target child to update, add or delete.
 * @param config fields config. parentIndexField, childIndexField and childrenFieldName. default parent_id, id and children.
 */
export function updateTreeArray<T>(
  mode: UpdateTreeArrayMode = 'update',
  array: T[],
  target: T,
  config: UpdateTreeArrayConfig = {}
) {
  const treeConfig = {
    parentIndexField: 'parent_id',
    childIndexField: 'id',
    childrenFieldName: 'children',
    ...config,
  };
  const { parentIndexField, childIndexField, childrenFieldName } = treeConfig;

  function _update(item: T) {
    return {
      ...item,
      ...target,
    };
  }

  function _addChild(item: T) {
    const children: T[] = item[childrenFieldName] || [];
    return {
      ...item,
      [childrenFieldName]: [...children, target],
    };
  }

  function _deleteChild(item: T) {
    // console.log('delete item\'s parent', item);
    const children: T[] = item[childrenFieldName];
    if (children.length === 1) {
      const { [childrenFieldName]: oneChild, ...rest } = item as any;
      return rest;
    }
    return {
      ...item,
      [childrenFieldName]: children.filter(
        (child: T) => child[childIndexField] !== target[childIndexField]
      ),
    };
  }

  function traverseTreeArray(list: T[]) {
    return list.map(item => {
      if (item[childIndexField] === target[childIndexField] && mode === 'update') {
        return _update(item);
      }
      if (item[childIndexField] === target[parentIndexField]) {
        if (mode === 'addChild') {
          return _addChild(item);
        }
        if (mode === 'deleteChild') {
          return _deleteChild(item);
        }
      }
      const children: T[] = item[childrenFieldName];
      if (children && children.length) {
        return {
          ...item,
          [childrenFieldName]: traverseTreeArray(children),
        };
      }
      return item;
    });
  }

  return traverseTreeArray(array);
}

export function updateChild<T>(array: T[], target: T, config?: UpdateTreeArrayConfig) {
  return updateTreeArray('update', array, target, config);
}

export function addChild<T>(array: T[], target: T, config?: UpdateTreeArrayConfig) {
  return updateTreeArray('addChild', array, target, config);
}

export function deleteChild<T>(array: T[], target: T, config?: UpdateTreeArrayConfig) {
  return updateTreeArray('deleteChild', array, target, config);
}
