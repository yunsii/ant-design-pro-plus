import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import router from 'umi/router';
import { MenuDataItem } from '@ant-design/pro-layout';
import * as H from 'history';

import { PageTab, PageTabsProps } from './data';
import { pathToRegexp, match as pathToRegexpMatch } from './dependencies/path-to-regexp-v6';

/**
 * 解析当前 `pathname` 的 `pathID` 和 `pathName`
 *
 * @param pathname 必须是 `withRouter` 注入的 `location` 的 `pathname`
 * @param originalMenuData 原始菜单数据
 */
export function getPathnameMetadata(
  pathname: string,
  originalMenuData: MenuDataItem[],
): [string, string] {
  function getMetadata(_pathname: string, menuData: MenuDataItem[], parent: MenuDataItem | null) {
    let result: [string, string] = ['', ''];
    menuData.forEach(item => {
      /** match prefix iteratively */
      if (pathToRegexp(`${item.path}(.*)`).test(_pathname)) {
        if (!parent && item.name) {
          result = [item.path!, item.name];
        } else if (parent && !parent.component && item.component && item.name) {
          /** create new tab if item has name and item's parant route has not component */
          result = [item.path!, item.name];
        }
        /** get children pathID, pathName, shouldUpdate recursively */
        if (item.children) {
          result = getMetadata(_pathname, item.children, item) || result;
        }
      }
    });
    return result;
  }
  return getMetadata(pathname, originalMenuData, null) || ['404', 'Error'];
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

/**
 * 获取要激活的标签页信息
 *
 * @param location 必须是 `withRouter` 注入的 `location`
 */
export function getActiveTabInfo(location: H.Location) {
  function getInfo(pageTabs: 'route' | 'path', originalMenuData: MenuDataItem[], setTabTitle: PageTabsProps["setTabTitle"]): [string, React.ReactNode] {
    const [pathID, pathName] = getPathnameMetadata(location.pathname!, originalMenuData);
  
    if (pageTabs === 'route') {
      return [pathID, pathName];
    }
    return [location.pathname as string, setTabTitle!(pathID, pathName, getParams(pathID, location.pathname!), location) || pathName];
  }
  return getInfo;
}

export function routeTo(targetTab: PageTab<{ location: any }>) {
  router.push(targetTab.extraTabProperties.location);
}
