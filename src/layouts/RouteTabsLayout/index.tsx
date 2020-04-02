/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import { MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';
import * as H from 'history';
import { Route } from '@ant-design/pro-layout/lib/typings';
import { formatMessage } from 'umi-plugin-react/locale';
import _isArray from 'lodash/isArray';
import memoizedOne from 'memoize-one';
import deepEqual from 'fast-deep-equal';

import { footerRender } from '@/layouts/BasicLayout';
import RouteTabs from '@/components/RouteTabs';
import { UmiChildren, RouteTabsMode } from '@/components/RouteTabs/data';
import PageLoading from '@/components/PageLoading';

/** 根据路由定义中的 name 本地化标题 */
function localeRoutes(routes: Route[], parent: MenuDataItem | null = null): MenuDataItem[] {
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
        children: localeRoutes(itemRoutes, newItem),
      };
    }

    result.push(newItem);
  });

  return result;
}

const memoizedOneLocaleRoutes = memoizedOne(localeRoutes, deepEqual);

export interface RouteTabsLayoutProps {
  mode?: RouteTabsMode | false;
  fixedPageTabs?: boolean;
  children: UmiChildren;
  routes?: Route[];
  setTabTitle?: (
    path: string,
    locale: string,
    params: any,
    location: H.Location,
  ) => React.ReactNode;
  menuLoading: boolean;
}

function RouteTabsLayout(props: RouteTabsLayoutProps): JSX.Element {
  const {
    mode,
    fixedPageTabs,
    menuLoading,
    routes,

    children,
  } = props;

  if (mode && menuLoading) {
    return <PageLoading />;
  }
  if (mode && routes) {
    return (
      <RouteTabs
        mode={mode}
        fixedPageTabs={fixedPageTabs}
        originalMenuData={memoizedOneLocaleRoutes(routes)}
        // animated={false}
      >
        <div>
          {children as UmiChildren}
          <footer>{footerRender()}</footer>
        </div>
      </RouteTabs>
    );
  }
  return children;
}

export default RouteTabsLayout;
