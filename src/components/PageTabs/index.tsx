import React from 'react';
import pathToRegexp from 'path-to-regexp';
import _find from 'lodash/find';
import router from 'umi/router';
import ChildrenTabs, { ChildrenTab } from '@/components/ChildrenTabs';

function getChildrenPathname(children: UmiChildren) {
  const {
    props: {
      location: { pathname: childrenPathname },
    },
  } = children;
  return childrenPathname;
}

function searchPathIdAndNameAndChildren(
  childrenPathname: string,
  originalMenuData: any[]
): [string, string, UmiChildren | null] {
  function getPathIdAndName(path: string, menuData: any[]) {
    let result: [string, string, UmiChildren];
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
  return getPathIdAndName(childrenPathname, originalMenuData) || ['404', 'Error', null];
}

function isChildrenEqualToProRootPath(children: UmiChildren, proRootPath: string) {
  return getChildrenPathname(children) === proRootPath;
}

function isPathChildrenHasName(pathChildren) {
  return pathChildren && pathChildren.length && _find(pathChildren, 'name');
}

export interface PageTabsProps {
  proRootPath?: string;
  children?: UmiChildren;
  originalMenuData: MenuItem[];
}

export default function PageTabs(props: PageTabsProps) {
  const { proRootPath = '/', children, originalMenuData } = props;

  // return children to redirect if children pathname equal proRootPath
  if (isChildrenEqualToProRootPath(children, proRootPath)) {
    return children;
  }
  const [newOrSwitchOrNextPathId, pathName, pathChildren] = searchPathIdAndNameAndChildren(
    getChildrenPathname(children),
    originalMenuData
  );
  // return children to router to it's children to render
  if (isPathChildrenHasName(pathChildren)) {
    return children;
  }

  const handleTabChange = (keyToSwitch: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: keyToSwitch });
    router.push(targetTab.path);
  };
  const afterRemoveTab = (removeKey: string, nextTabKey: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: nextTabKey });
    router.push(targetTab.path);
  };
  return (
    <ChildrenTabs
      activeKey={newOrSwitchOrNextPathId}
      activeTitle={pathName}
      extraTabProperties={{ path: getChildrenPathname(children) }}
      handleTabChange={handleTabChange}
      afterRemoveTab={afterRemoveTab}
    >
      {children}
    </ChildrenTabs>
  );
}
