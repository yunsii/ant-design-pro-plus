import React from 'react';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import _mapValues from 'lodash/mapValues';
import hash from 'hash-string';
import { pathToRegexp, match as pathMatch } from '@qixian.cs/path-to-regexp';
import * as H from 'history-with-query';

import { useConsole } from '@/hooks/test/lifeCycle';
import Logger from '@/utils/Logger';
import { CustomRoute } from './useTabs';
import { Mode } from './config';
import { RouteTabsProps } from '.';

export function isRouteTab(pathname: string, originalRoutes: CustomRoute[]): boolean {
  function isInMenus(menuData: CustomRoute[]) {
    const targetMenuItem = _find(menuData, item => pathToRegexp(`${item.path}(.*)`).test(pathname));

    return !!targetMenuItem;
  }

  return isInMenus(originalRoutes);
}

const mapCache: {
  [k: string]: any;
} = {};

/**
 * 解析当前 `pathname` 的 `pathID` 和 `title`
 *
 * @param pathname 必须是 `withRouter` 注入的 `location` 的 `pathname`
 * @param originalMenuData 原始菜单数据，未经过滤处理
 */
export function getPathnameMetadata(
  pathname: string,
  originalMenuData: CustomRoute[],
): [string, string, CustomRoute | undefined] {
  if (mapCache[pathname]) {
    return mapCache[pathname];
  }

  function getMetadata(
    menuData: CustomRoute[],
    parent: CustomRoute | null,
  ): [string, string, CustomRoute | undefined] | null {
    let result: [string, string, CustomRoute | undefined] | null = null;

    /** 根据前缀匹配菜单项，因此，`BasicLayout` 下的 **一级路由** 只要配置了 `name` 属性，总能找到一个 `pathID` 和 `title` 的组合 */
    const targetMenuItem = _find(
      menuData,
      item => pathToRegexp(`${item.path}(.*)`).test(pathname) && !!item.name,
    );

    /** 如果为 **一级路由** 直接写入 `result` ，否则父级没有 `component` 时才能写入 `result` */
    if ((!parent && targetMenuItem) || (parent && !parent.component && targetMenuItem)) {
      result = [targetMenuItem.path!, targetMenuItem.name!, targetMenuItem];
    }
    /** 如果父级配置了 `hideChildrenInMenu` ，子级配置了 `name` 则重写 `result` */
    if (parent?.hideChildrenInMenu && targetMenuItem) {
      result = [parent.path!, targetMenuItem.name!, targetMenuItem];
    }

    /** 递归设置 `pathID` 和 `title` */
    if (Array.isArray(targetMenuItem?.children) && targetMenuItem?.children.length) {
      result = getMetadata(targetMenuItem!.children!, targetMenuItem!) || result;
    }

    return result;
  }

  const result = getMetadata(originalMenuData, null) || ['404', 'Error', undefined];

  mapCache[pathname] = result;
  return result;
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
  const match = pathMatch(path);
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
   * @param originalRoutes
   * @param setTabTitle
   */
  function getInfo(
    mode: Mode,
    originalRoutes: CustomRoute[],
    setTabTitle: RouteTabsProps['setTabTitle'],
  ): {
    id: string;
    hash?: string;
    title: React.ReactNode;
    item?: CustomRoute;
  } {
    const [pathID, title, item] = getPathnameMetadata(location.pathname!, originalRoutes);

    if (mode === Mode.Route) {
      return {
        id: pathID,
        title,
        item,
      };
    }

    // 以下为 **路径** 模式的处理逻辑：
    // 核心是根据路由中所带的参数算出参数的哈希值，并将其与算出的 `pathID` 拼成一个标签页的唯一 id
    // 这样，不同的参数就能得到不同的标签页了

    const params = getParams(pathID, location.pathname!);
    const { query, state = {} } = location;

    let hashString = '';

    if (!_isEmpty(params) || !_isEmpty(query) || !_isEmpty(state)) {
      hashString = hash(
        JSON.stringify({
          ...params,
          /**
           * 如果在 router.push 的时候设置 query ，可能导致查询参数为 number 类型，在点击标签页标题的时候又会变为 string 类型
           * 导致了计算的 hash 值可能不唯一
           * 故统一转换为 string 类型
           */
          ..._mapValues(query, String),
          ...(state as any),
        }),
      );
    }

    return {
      id: pathID,
      hash: hashString,
      title: setTabTitle?.({ path: pathID, locale: title, params, location }) || title,
      item,
    };
  }

  return getInfo;
}

const logger = new Logger('PropsAreEqual');

export const routePagePropsAreEqual = (prevProps: any, nextProps: any) => {
  const {
    children: prevChildren,
    computedMatch: prevComputedMatch,
    history: prevHistory,
    location: prevLocation,
    match: prevMatch,
    route: prevRoute,
    staticContext: prevStaticContext,
    ...prevRest
  } = prevProps;
  const {
    children: nextChildren,
    computedMatch: nextComputedMatch,
    history: nextHistory,
    location: nextLocation,
    match: nextMatch,
    route: nextRoute,
    staticContext: nextStaticContext,
    ...nextRest
  } = nextProps;
  if (!_isEqual(prevRest, nextRest)) {
    logger.log(`${prevLocation.pathname}: update by props`);
    // console.log(prevRest);
    // console.log(nextRest);
    return false;
  }

  const { pathname: prevPathname, search: prevSearch, state: prevState } = prevLocation || {};
  const { pathname: nextPathname, search: nextSearch, state: nextState } = nextLocation || {};
  const isLocationChange =
    prevPathname !== nextPathname || prevSearch !== nextSearch || !_isEqual(prevState, nextState);
  if (isLocationChange) {
    logger.log(`${prevLocation.pathname} -> ${nextPathname}: update by route or params`);
    // console.log({ prevPathname, prevSearch, prevState });
    // console.log({ nextPathname, nextSearch, nextState });
    return false;
  }

  logger.log(`without re-render: ${prevPathname}`);
  return true;
};

export function withRouteTab<Props = unknown>(
  WrappedComponent: React.ComponentType<Props>,
): React.MemoExoticComponent<any> {
  const WithRoutePage = React.memo((props: any) => {
    useConsole(props.location.pathname);

    return <WrappedComponent {...props} />;
  }, routePagePropsAreEqual);

  WithRoutePage.displayName = `WithRoutePage(${getDisplayName(WrappedComponent)})`;

  return WithRoutePage;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
