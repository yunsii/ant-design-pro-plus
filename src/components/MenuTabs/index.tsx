import React from 'react';
import _find from 'lodash/find';
import withRouter from 'umi/withRouter';

import PageTabs from './components/PageTabs';
import { MenuTabsProps } from './data';
import { isPathInMenus } from './utils';

function MenuTabs(props: MenuTabsProps) {
  const {
    location,
    originalMenuData,
    children,
  } = props;

  if (!isPathInMenus(location.pathname, originalMenuData)) {
    return children;
  }

  return <PageTabs {...props} />;

}

export default withRouter<MenuTabsProps, React.FC>(MenuTabs as React.FC);
