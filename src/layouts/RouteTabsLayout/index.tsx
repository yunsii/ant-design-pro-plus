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
import { UmiChildren, RouteTabsMode } from '@/components/RouteTabs/data';
import PageLoading from '@/components/PageLoading';

export interface RouteTabsLayoutProps {
  mode?: RouteTabsMode | false;
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
    mode,
    fixedPageTabs,
    menuLoading,
    originalMenuData,

    children,
  } = props;

  if (mode && menuLoading) {
    return <PageLoading />;
  }
  if (mode && originalMenuData) {
    return (
      <RouteTabs
        mode={mode}
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
