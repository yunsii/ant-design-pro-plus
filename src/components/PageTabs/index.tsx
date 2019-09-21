import React from 'react';
import pathToRegexp from 'path-to-regexp';
import _find from 'lodash/find';
import withRouter from 'umi/withRouter';
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

function searchPathIdAndName(childrenPathname: string, originalMenuData: any[]): [string, string] {
  function getPathIdAndName(path: string, menuData: MenuItem[], parent: MenuItem | null) {
    let result: [string, string];
    menuData.forEach(item => {
      // match prefix iteratively
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        if (!parent && item.name) {
          result = [item.path, item.name];
        } else if (parent && !parent.component && item.name) {
          // create new tab if item has name and item's parant route has not component
          result = [item.path, item.name];
        }
        // get children pathIdAndName recursively
        if (item.children) {
          result = getPathIdAndName(path, item.children, item) || result;
        }
      }
    });
    return result;
  }
  return getPathIdAndName(childrenPathname, originalMenuData, null) || ['404', 'Error'];
}

function isChildrenEqualToProRootPath(children: UmiChildren, proRootPath: string) {
  return getChildrenPathname(children) === proRootPath;
}

// function isPathChildrenHasName(pathChildren) {
//   return pathChildren && pathChildren.length && _find(pathChildren, 'name');
// }

export interface PageTabsProps {
  proRootPath?: string;
  children?: UmiChildren;
  originalMenuData: MenuItem[];
  location: Location;
}

function PageTabs(props: PageTabsProps) {
  const { proRootPath = '/', children, originalMenuData, location } = props;

  // return children to redirect if children pathname equal proRootPath
  if (isChildrenEqualToProRootPath(children, proRootPath)) {
    return children;
  }
  const [pathId, pathName] = searchPathIdAndName(getChildrenPathname(children), originalMenuData);

  const handleTabChange = (keyToSwitch: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: keyToSwitch });
    router.push(`${targetTab.path}${targetTab.search}`);
  };
  const afterRemoveTab = (removeKey: string, nextTabKey: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: nextTabKey });
    router.push(targetTab.path);
  };
  return (
    <ChildrenTabs
      activeKey={pathId}
      activeTitle={pathName}
      extraTabProperties={{ path: getChildrenPathname(children), search: location.search }}
      handleTabChange={handleTabChange}
      afterRemoveTab={afterRemoveTab}
    >
      {children}
    </ChildrenTabs>
  );
}

export default withRouter(PageTabs as any);
