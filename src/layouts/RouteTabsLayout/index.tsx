/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import { MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';
import * as H from 'history-with-query';
import { useIntl, useLocation } from 'umi';
import _isArray from 'lodash/isArray';
import memoizedOne from 'memoize-one';
import deepEqual from 'fast-deep-equal';

import RouteTabs, { Mode } from '@/components/RouteTabs';
import { CustomRoute } from '@/components/RouteTabs/useTabs';
import { isRouteTab } from '@/components/RouteTabs/utils';
import PageLoading from '@/components/PageLoading';

/** 根据路由定义中的 name 本地化标题 */
function localeRoutes(
  routes: CustomRoute[],
  formatMessage: any,
  parent: MenuDataItem | null = null,
): MenuDataItem[] {
  const result: MenuDataItem[] = [];

  routes.forEach(item => {
    const { routes: itemRoutes, ...rest } = item;

    if (!item.name) {
      return;
    }

    // 初始化 locale 字段
    let newItem: MenuDataItem = {
      ...rest,
      routes: null,
      locale: item.name,
    };

    const localeId = parent ? `${parent.locale}.${newItem.locale}` : `menu.${newItem.locale}`;

    newItem = {
      ...rest,
      locale: localeId,
      name: formatMessage({ id: localeId }),
    };

    if (_isArray(itemRoutes) && itemRoutes.length) {
      newItem = {
        ...newItem,
        children: localeRoutes(itemRoutes, formatMessage, newItem),
      };
    }

    result.push(newItem);
  });

  return result;
}

const memoizedOneLocaleRoutes = memoizedOne(localeRoutes, deepEqual);

export interface RouteTabsLayoutProps {
  mode?: Mode | false;
  fixed?: boolean;
  children: React.ReactElement;
  routes?: CustomRoute[];
  setTabTitle?: (
    path: string,
    locale: string,
    params: any,
    location: H.Location,
  ) => React.ReactNode;
  loading?: boolean;
}

export default function RouteTabsLayout(props: RouteTabsLayoutProps): JSX.Element {
  const { mode, fixed, loading, routes, children } = props;

  const { formatMessage } = useIntl();
  const location = useLocation();
  const originalRoutes = memoizedOneLocaleRoutes(routes!, formatMessage);

  if (mode && isRouteTab(location.pathname, originalRoutes)) {
    if (loading) {
      return <PageLoading />;
    }
    if (routes) {
      return (
        <RouteTabs
          mode={mode}
          fixed={fixed}
          originalRoutes={originalRoutes}
          // animated={false}
        >
          {children}
        </RouteTabs>
      );
    }
  }
  return children;
}
