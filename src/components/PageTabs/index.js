import React from 'react';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import _find from 'lodash/find';
import router from 'umi/router';

import ChildrenTabs from '@/components/ChildrenTabs';
import { flatTreeToList } from '@/utils/treeUtils'; // 引入工具函数

function getChildrenPathname(children) {
  const {
    props: {
      location: { pathname: childrenPathname },
    },
  } = children;
  return childrenPathname;
}

function flatMenuTreeToList(menu) {
  function nodeTransfer(node) {
    return {
      path: node.path,
      name: node.name,
      locale: node.locale,
      // content: node.component,
    };
  }
  return flatTreeToList(menu, {
    nodeTransfer,
  });
}

const memoizeOneFlatMenuTreeToList = memoizeOne(flatMenuTreeToList, isEqual);

function searchPathIdAndName(childrenPathname, originalMenuData) {
  let result = ['404', 'Error'];
  let pathToSearchPathId = childrenPathname;
  const routeDepthInMenu = 2;
  const pathSegments = childrenPathname.split(/\//g).filter(item => item);
  if (pathSegments.length > routeDepthInMenu) {
    pathToSearchPathId = `/${pathSegments.slice(0, routeDepthInMenu).join('/')}`;
  }
  // console.log(pathSegments, pathToSearchPathId);

  const flatedMenu = memoizeOneFlatMenuTreeToList(originalMenuData);
  for (let i = 0; i < flatedMenu.length; i += 1) {
    if (pathToRegexp(flatedMenu[i].path).test(pathToSearchPathId)) {
      result = [flatedMenu[i].path, flatedMenu[i].name];
      break;
    }
  }
  return result;
}

export default function PageTabs(props) {
  const { children, originalMenuData } = props;
  console.log(originalMenuData);
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
