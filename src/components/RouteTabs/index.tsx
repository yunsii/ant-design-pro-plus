import React from 'react';

import { useLocation } from '@/hooks/route';
import PageTabs from './components/PageTabs';
import { RouteTabsProps } from './data';
import { isPathInMenus } from './utils';

function RouteTabs(props: RouteTabsProps) {
  const { originalMenuData, children } = props;

  const location = useLocation();

  if (!isPathInMenus(location.pathname, originalMenuData)) {
    return children!;
  }

  return <PageTabs {...props} />;
}

export default RouteTabs;
