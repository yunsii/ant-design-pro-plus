import React from 'react';
import withRouter from 'umi/withRouter';

import PageTabs from './components/PageTabs';
import { RouteTabsProps } from './data';
import { isPathInMenus } from './utils';

function RouteTabs(props: RouteTabsProps) {
  const { location, originalMenuData, children } = props;

  if (!isPathInMenus(location.pathname, originalMenuData)) {
    return children;
  }

  return <PageTabs {...props} />;
}

export default withRouter<RouteTabsProps, React.FC>(RouteTabs as React.FC);
