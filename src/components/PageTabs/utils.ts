import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import router from 'umi/router';
import memoizeOne from 'memoize-one';
import { MenuDataItem } from '@ant-design/pro-layout';
import * as H from 'history';

import { PageTab, PageTabsProps } from './data';
import { pathToRegexp, match as pathToRegexpMatch } from './dependencies/path-to-regexp-v6';

/**
 * 解析当前 `pathname` 的 `pathID` 和 `title`
 *
 * @param pathname 必须是 `withRouter` 注入的 `location` 的 `pathname`
 * @param originalMenuData 原始菜单数据
 */
export function getPathnameMetadata(
  pathname: string,
  originalMenuData: MenuDataItem[],
): [string, string] {
  console.log('call getPathnameMetadata:', pathname, originalMenuData);
  function getMetadata(_pathname: string, menuData: MenuDataItem[], parent: MenuDataItem | null) {
    let result: [string, string] | null = null;
    menuData.forEach(item => {
      if (pathToRegexp(`${item.path}(.*)`).test(_pathname)) {
        /** match prefix iteratively */

        console.log('matched path', item.path, _pathname);
        console.log('parent', parent);
        console.log('item', item);

        if (!parent && item.name) {
          /** BasicLayout 下的子路由(一级路由) */
          result = [item.path!, item.name];
        } else if (
          parent &&
          !parent.component &&
          item.component &&
          item.name &&
          !item.hideChildrenInMenu
        ) {
          /** 嵌套路由，子菜单 */
          result = [item.path!, item.name];
        }
        if (Array.isArray(item.children) && item.children.length) {
          /** 必须判断 `children` 长度，否则当长度为 0 时，会重置 `result` */
          /** get children pathID, title, shouldUpdate recursively */
          result = getMetadata(_pathname, item.children, item) || result;
        }
      }
    });
    return result;
  }
  return getMetadata(pathname, originalMenuData, null) || ['404', 'Error'];
}

const memoizeOneGetPathnameMetadata = memoizeOne(getPathnameMetadata, _isEqual);

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
  /**
   * 获取标签页的 id 和标题
   *
   * @param pageTabs
   * @param originalMenuData
   * @param setTabTitle
   */
  function getInfo(
    pageTabs: 'route' | 'path',
    originalMenuData: MenuDataItem[],
    setTabTitle: PageTabsProps['setTabTitle'],
  ): [string, React.ReactNode] {
    console.log('location.pathname:', location.pathname);
    const [pathID, title] = memoizeOneGetPathnameMetadata(location.pathname!, originalMenuData);

    if (pageTabs === 'route') {
      return [pathID, title];
    }
    return [
      // location.pathname as string,
      pathID,
      setTabTitle?.(pathID, title, getParams(pathID, location.pathname!), location) || title,
    ];
  }
  return getInfo;
}

export function routeTo(targetTab: PageTab<{ location: any }>) {
  router.push(targetTab.extraTabProperties.location);
}
