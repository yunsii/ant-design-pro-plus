import React from 'react';
import pathToRegexp from 'path-to-regexp';
import _find from 'lodash/find';
import router from 'umi/router';
import ChildrenTabs from '@/components/ChildrenTabs';

function getChildrenPathname(children) {
  const {
    props: {
      location: { pathname: childrenPathname },
    },
  } = children;
  return childrenPathname;
}

function searchPathIdAndNameAndChildren(childrenPathname, originalMenuData) {
  function getPathIdAndName(path, menuData) {
    let result;
    menuData.forEach(item => {
      // match prefix
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        if (item.name) {
          result = [item.path, item.name, item.children];
        }
        // get children pathIdAndName recursively
        if (item.children) {
          result = getPathIdAndName(path, item.children) || result;
        }
      }
    });
    return result;
  }
  return getPathIdAndName(childrenPathname, originalMenuData) || ['404', 'Error'];
}

function isChildrenEqualProRootPath(children, proRootPath) {
  return getChildrenPathname(children) === proRootPath;
}

function isPathChildrenHaveName(pathChildren) {
  return pathChildren && pathChildren.length && _find(pathChildren, 'name');
}

export default function PageTabs(props) {
  const { proRootPath = '/', children, originalMenuData } = props;
  // console.log(children);
  // console.log(originalMenuData);

  // return children to redirect if children pathname equal proRootPath
  if (isChildrenEqualProRootPath(children, proRootPath)) return children;
  // return children if menu originalMenuData is empty, because can't get pathId and pathName
  if (!originalMenuData.length) return children;
  const [newOrSwitchOrNextPathId, pathName, pathChildren] = searchPathIdAndNameAndChildren(
    getChildrenPathname(children),
    originalMenuData
  );
  if (isPathChildrenHaveName(pathChildren)) return children;

  const handleTabChange = (keyToSwitch, activedTabs) => {
    const targetTab = _find(activedTabs, { key: keyToSwitch });
    router.push(targetTab.path); // key is not work fine with dynamic router
  };
  const handleRemoveTab = (removeKey, nextTabKey, activedTabs) => {
    const targetTab = _find(activedTabs, { key: nextTabKey });
    router.push(targetTab.path); // key is not work fine with dynamic router
  };
  return (
    <ChildrenTabs
      activeKey={newOrSwitchOrNextPathId}
      activetTitle={pathName}
      extraTabProperties={{ path: getChildrenPathname(children) }}
      handleTabChange={handleTabChange}
      handleRemoveTab={handleRemoveTab}
    >
      {children}
    </ChildrenTabs>
  );
}
