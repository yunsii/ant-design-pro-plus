import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import router, { RouteData } from 'umi/router';
import { MenuDataItem } from '@ant-design/pro-layout';

import { PageTab } from './data';
import { pathToRegexp, match as pathToRegexpMatch } from './dependencies/path-to-regexp-v6';

/**
 * 如果是根据路径来展示标签页，可动态配置标签页标题
 *
 * @param pathID 预定义的标签页路由，可据此动态配置标题
 * @param predefinePathName 预定义的已转义的国际化标题
 * @param params 路由中的参数
 * @param location RouteData
 */
export function setPathName(pathID: string, predefinePathName: string, params: any, location: RouteData) {
  if (pathID.includes('dynamic')) {
    return `${predefinePathName} - ${location.query.name}`;
  }
  return predefinePathName;
}

// result: [pathID, pathName]
export function getMetadataOfTab(
  childrenPathname: string,
  originalMenuData: MenuDataItem[]
): [string, string] {
  function getMetadata(path: string, menuData: MenuDataItem[], parent: MenuDataItem | null) {
    let result: [string, string] = ['', ''];
    menuData.forEach(item => {
      /** match prefix iteratively */
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        if (!parent && item.name) {
          result = [item.path!, item.name];
        } else if (parent && !parent.component && item.component && item.name) {
          /** create new tab if item has name and item's parant route has not component */
          result = [item.path!, item.name];
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
 * 解析路由定义中参数
 * 
 * 如： `path = /user/:id` ，`pathname = /user/48` ，可解析得到 `{ id: "48" }`
 * 
 * @param path 路由定义
 * @param pathname 当前的页面路由
 */
export function getParams(path: string, pathname: string): { [key: string]: string } {
  const match = pathToRegexpMatch(path);
  const result = match(pathname) as {
    index: number;
    params: { [k: string]: string };
    path: string;
  };
  return result.params;
}

export function routeTo(targetTab: PageTab<{ location: any }>) {
  router.push(targetTab.extraTabProperties.location);
}

export function addTab<T>(activedTabs: PageTab<T>[]) {
  console.log("addTab");
  return (newTab: PageTab<T>) => {
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
}

export const updateTab: <T>(activedTabs: PageTab<T>[]) => (activeIndex: number, tabName: string, extraTabProperties: any, children: any) => PageTab<T>[]
  = activedTabs => (activeIndex, tabName, extraTabProperties, children) => {
    console.log("updateTab");
    const { extraTabProperties: prevExtraTabProperties, ...rest } = activedTabs[
      activeIndex
    ];

    activedTabs.splice(activeIndex, 1, {
      tab: tabName,
      extraTabProperties,
      content: children,
      ...rest,
    });

    /** map 删除后更新的 activedTabs 长度为 1 时不可删除 */
    return activedTabs.map(item => (activedTabs.length === 1 ? { ...item, closable: false } : item));
  };
