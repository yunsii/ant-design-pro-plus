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

function searchPathIdAndName(childrenPathname, originalMenuData) {
  const getPathIdAndName = (path, menuData) => {
    let result;
    menuData.forEach(item => {
      // match prefix
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        result = [item.path, item.name];

        // get children authority recursively
        if (item.children) {
          result = searchPathIdAndName(path, item.children) || result;
        }
      }
    });
    return result;
  };
  return getPathIdAndName(childrenPathname, originalMenuData) || ['404', 'Error'];
}

export default function PageTabs(props) {
  const { children, originalMenuData } = props;
  // console.log(originalMenuData);
  if (!originalMenuData.length) return children;
  const [newOrSwitchOrNextPathId, pathName] = searchPathIdAndName(
    getChildrenPathname(children),
    originalMenuData
  );
  const handleTabChange = (keyToSwitch, activedTabs) => {
    const targetTab = _find(activedTabs, { key: keyToSwitch });
    router.push(targetTab.path); // key is not work fine with dynamic router
  };
  const beforeRemoveTab = (nextTabKey, activedTabs) => {
    const targetTab = _find(activedTabs, { key: nextTabKey });
    router.push(targetTab.path); // key is not work fine with dynamic router
  };
  return getChildrenPathname(children) === '/' ? (
    children
  ) : (
    <ChildrenTabs
      tabKey={newOrSwitchOrNextPathId}
      tabName={pathName}
      extraTabProperties={{ path: getChildrenPathname(children) }}
      handleTabChange={handleTabChange}
      beforeRemoveTab={beforeRemoveTab}
    >
      {children}
    </ChildrenTabs>
  );
}
