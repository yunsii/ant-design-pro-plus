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

/**
 * 如果是根据路径来展示标签页，可动态配置标签页标题
 *
 * @param pathID 预定义的标签页路由，可据此动态配置标题
 * @param predefinePathName 预定义的已转义的国际化标题
 * @param params 路由中的参数
 * @param location RouteData
 */
function setPathName(pathID: string, predefinePathName: string, params: any, location: RouteData) {
  if (pathID.includes('dynamic')) {
    return `${predefinePathName} - ${location.query.name}`;
  }
  return predefinePathName;
}

function getParams(path: string, pathname: string): { [key: string]: string } {
  const match = pathToRegexp.match(path);
  const result = match(pathname) as {
    index: number;
    params: { [k: string]: string };
    path: string;
  };
  return result.params;
}

function routeTo(targetTab: ChildrenTab<{ location: any }>) {
  router.push(targetTab.extraTabProperties.location);
}

export interface PageTabsProps {
  proRootPath?: string;
  pageTabs?: 'route' | 'path';
  children?: UmiChildren;
  originalMenuData: MenuItem[];
  location: RouteData;
}

function PageTabs(props: PageTabsProps) {
  const { proRootPath = '/', pageTabs, children, originalMenuData, location } = props;
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

  const activeKey = pageTabs === 'path' ? location.pathname : pathID;
  const activeTitle =
    pageTabs === 'path'
      ? setPathName(pathID, pathName, getParams(pathID, location.pathname), location)
      : pathName;
  return (
    <ChildrenTabs
      activeKey={activeKey}
      activeTitle={activeTitle}
      extraTabProperties={{ location }}
      handleTabChange={handleTabChange}
      afterRemoveTab={afterRemoveTab}
      tabsConfig={{
        animated: true,
      }}
    >
      {children}
    </ChildrenTabs>
  );
}

export default withRouter(PageTabs as any);
