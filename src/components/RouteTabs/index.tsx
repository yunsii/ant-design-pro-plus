import React from 'react';
import { useLocation } from 'umi';

import PageTabs from './components/PageTabs';
import { RouteTabsProps } from './data';
import { isPathInMenus } from './utils';

function RouteTabs(props: RouteTabsProps): JSX.Element {
  const { originalMenuData, children } = props;
  const location = useLocation();

  if (!isPathInMenus(location.pathname, originalMenuData)) {
    return children as JSX.Element;
  }

  return <PageTabs {...props} />;
}

export default RouteTabs;
