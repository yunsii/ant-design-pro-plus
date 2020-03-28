/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import {
  MenuDataItem,
} from '@ant-design/pro-layout';
import React from 'react';
import * as H from 'history';

import { footerRender } from '@/layouts/BasicLayout';
import RouteTabs from '@/components/RouteTabs';
import { UmiChildren } from '@/components/RouteTabs/data';
import PageLoading from '@/components/PageLoading';

export interface RouteTabsLayoutProps {
  pageTabs?: 'route' | 'path' | false;
  fixedPageTabs?: boolean;
  children: UmiChildren;
  originalMenuData?: MenuDataItem[];
  setTabTitle?: (
    path: string,
    locale: string,
    params: any,
    location: H.Location,
  ) => React.ReactNode;
  menuLoading: boolean;
}

export function RouteTabsLayout(props: RouteTabsLayoutProps): JSX.Element {
  const {
    pageTabs,
    fixedPageTabs,
    menuLoading,
    originalMenuData,

    children,
  } = props;

  if (pageTabs && menuLoading) {
    return <PageLoading />;
  }
  if (pageTabs && originalMenuData) {
    return (
      <RouteTabs
        pageTabs={pageTabs}
        fixedPageTabs={fixedPageTabs}
        originalMenuData={originalMenuData}
      // animated={false}
      >
        <div>
          {children as UmiChildren}
          <footer>
            {footerRender()}
          </footer>
        </div>
      </RouteTabs>
    );
  }
  return children;
};

export default RouteTabsLayout;
