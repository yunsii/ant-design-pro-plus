import React from 'react';
import pathToRegexp from 'path-to-regexp';
import _find from 'lodash/find';
import withRouter from 'umi/withRouter';
import router, { RouteData } from 'umi/router';
import ChildrenTabs, { ChildrenTab } from '@/components/ChildrenTabs';

// result: [pathID, pathName]
function getMetadataOfTab(
  childrenPathname: string,
  originalMenuData: MenuItem[]
): [string, string] {
  function getMetadata(path: string, menuData: MenuItem[], parent: MenuItem | null) {
    let result: [string, string];
    menuData.forEach(item => {
      /** match prefix iteratively */
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        if (!parent && item.name) {
          result = [item.path, item.name];
        } else if (parent && !parent.component && item.component && item.name) {
          /** create new tab if item has name and item's parant route has not component */
          result = [item.path, item.name];
        }
        /** get children pathID, pathName, shouldUpdate recursively */
        if (item.children) {
          result = getMetadata(path, item.children, item) || result;
        }
      }
    });
    return result;
  }
  return getMetadata(childrenPathname, originalMenuData, null) || ['404', 'Error'];
}

function routeTo(targetTab: ChildrenTab<{ location: any }>) {
  router.push(targetTab.extraTabProperties.location);
}

export interface PageTabsProps {
  proRootPath?: string;
  children?: UmiChildren;
  originalMenuData: MenuItem[];
  location: RouteData;
}

function PageTabs(props: PageTabsProps) {
  const { proRootPath = '/', children, originalMenuData, location } = props;

  /** return children to redirect if children pathname equal proRootPath */
  if (location.pathname === proRootPath) {
    return children;
  }
  const [pathID, pathName] = getMetadataOfTab(location.pathname, originalMenuData);

  const handleTabChange = (keyToSwitch: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: keyToSwitch });
    routeTo(targetTab);
  };
  const afterRemoveTab = (removeKey: string, nextTabKey: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: nextTabKey });
    routeTo(targetTab);
  };

  return (
    <ChildrenTabs
      activeKey={pathID}
      activeTitle={pathName}
      extraTabProperties={{ location }}
      handleTabChange={handleTabChange}
      afterRemoveTab={afterRemoveTab}
    >
      {children}
    </ChildrenTabs>
  );
}

export default withRouter(PageTabs as any);
