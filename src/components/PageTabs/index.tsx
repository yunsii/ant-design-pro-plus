import React, { useEffect, useState } from 'react';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import withRouter from 'umi/withRouter';
import router, { RouteData } from 'umi/router';

import MenuTabs, { MenuTab } from '@/components/MenuTabs';
import { pathToRegexp, match as pathToRegexpMatch } from '@/utils/dependencies/path-to-regexp';


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
  const match = pathToRegexpMatch(path);
  const result = match(pathname) as {
    index: number;
    params: { [k: string]: string };
    path: string;
  };
  return result.params;
}

function routeTo(targetTab: MenuTab<{ location: any }>) {
  router.push(targetTab.extraTabProperties.location);
}

function addTab<T>(newTab: MenuTab<T>, activedTabs: MenuTab<T>[]) {
  /**
   * filter 过滤路由 为 '/' 的 children
   * map 添加第一个 tab 不可删除
   */
  return [...activedTabs, newTab].map((item, index) =>
    activedTabs.length === 0 && index === 0
      ? { ...item, closable: false }
      : { ...item, closable: true }
  );
}

const switchAndUpdateTab: <T>(
  activedTabs: MenuTab<T>[]
) => (
    activeIndex: number,
    tabName: string,
    extraTabProperties: any,
    children: any
  ) => MenuTab<T>[] = activedTabs => (activeIndex, tabName, extraTabProperties, children) => {
    const { content, refresh, extraTabProperties: prevExtraTabProperties, ...rest } = activedTabs[
      activeIndex
    ];

    activedTabs.splice(activeIndex, 1, {
      tab: tabName,
      content: refresh ? content : children,
      extraTabProperties,
      ...rest,
    });

    /** map 删除后更新的 activedTabs 长度为 1 时不可删除 */
    return activedTabs.map(item => (activedTabs.length === 1 ? { ...item, closable: false } : item));
  };

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
  const [tabs, setTabs] = useState<MenuTab[]>([]);

  const [pathID, pathName] = getMetadataOfTab(location.pathname, originalMenuData);
  const activeKey = pageTabs === 'path' ? location.pathname : pathID;
  const activeTitle =
    pageTabs === 'path'
      ? setPathName(pathID, pathName, getParams(pathID, location.pathname), location)
      : pathName;

  useEffect(() => {
    window.handleTabRefresh = () => {
      setTabs(
        tabs.map(item => {
          if (item.key === activeKey) {
            return {
              ...item,
              content: React.cloneElement(item.content, { key: item.key ? item.key + 1 : 1 }),
            };
          }
          return item;
        })
      );
    };
  }, [tabs]);

  useEffect(() => {
    const activedTabIndex = _findIndex(tabs, { key: activeKey });
    if (activedTabIndex > -1) {
      const { extraTabProperties: prevExtraTabProperties } = tabs[activedTabIndex];
      if (!_isEqual({ location }, prevExtraTabProperties)) {
        const refreshedTabs = switchAndUpdateTab(tabs)(
          activedTabIndex,
          activeTitle,
          { location },
          children
        );
        setTabs(refreshedTabs);
      }
    } else {
      const newTab = {
        tab: activeTitle,
        key: activeKey,
        content: children as any,
        extraTabProperties: { location },
      };
      const addedTabs = addTab(newTab, tabs);
      setTabs(addedTabs);
    }
  }, [children]);

  const handleSwitch = (keyToSwitch: string) => {
    const targetTab = _find(tabs, { key: keyToSwitch });
    routeTo(targetTab);
  };

  const handleRemove = (removeKey: string) => {
    let nextTabKey: string;
    if (removeKey !== activeKey) {
      nextTabKey = activeKey;
    } else {
      const targetIndex = _findIndex(tabs, { key: removeKey });
      const nextIndex = targetIndex > 0 ? targetIndex - 1 : targetIndex + 1;
      nextTabKey = tabs[nextIndex].key;
    }
    setTabs(tabs.filter(item => item.key !== removeKey));
    const targetTab = _find(tabs, { key: nextTabKey });
    routeTo(targetTab);
  };

  const handleRemoveOthers = (currentKey: string) => {
    const currentTab = tabs.filter(item => item.key === currentKey);
    setTabs(currentTab.map(item => ({ ...item, closable: false })));
  };

  const handRemoveRightTabs = (currentKey: string) => {
    const currentIndex = _findIndex(tabs, { key: currentKey });
    setTabs(tabs.slice(0, currentIndex + 1));
  };

  return (
    <MenuTabs
      activeKey={activeKey}
      onSwitch={handleSwitch}
      onRemove={handleRemove}
      onRemoveOthers={handleRemoveOthers}
      onRemoveRightTabs={handRemoveRightTabs}
      tabsProps={{
        animated: true,
      }}
      tabs={tabs}
    />
  );
}

export default withRouter(PageTabs as any);
