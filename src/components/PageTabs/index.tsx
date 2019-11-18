import React from 'react';
import pathToRegexp from 'path-to-regexp';
import _find from 'lodash/find';
import _get from 'lodash/get';
import withRouter from 'umi/withRouter';
import router, { RouteData } from 'umi/router';
import ChildrenTabs, { ChildrenTab } from '@/components/ChildrenTabs';

class StaticChildren extends React.Component {
  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate false');
    // console.log(_get(this.props, 'children.props.location.pathname'));
    return false;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

// result: [pathID, pathName, shouldUpdate]
function getMetadataOfTab(
  childrenPathname: string,
  originalMenuData: MenuItem[]
): [string, string, boolean] {
  function getMetadata(path: string, menuData: MenuItem[], parent: MenuItem | null) {
    let result: [string, string, boolean];
    menuData.forEach(item => {
      /** match prefix iteratively */
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        if (!parent && item.name) {
          result = [item.path, item.name, false];
        } else if (parent && !parent.component && item.component && item.name) {
          /** create new tab if item has name and item's parant route has not component */
          result = [item.path, item.name, !!item.children];
        }
        /** get children pathID, pathName, shouldUpdate recursively */
        if (item.children) {
          result = getMetadata(path, item.children, item) || result;
        }
      }
    });
    return result;
  }
  return getMetadata(childrenPathname, originalMenuData, null) || ['404', 'Error', false];
}

function routeTo(targetTab: ChildrenTab) {
  router.push({
    ...targetTab.location,
  });
}

export interface PageTabsProps {
  proRootPath?: string;
  children?: UmiChildren;
  originalMenuData: MenuItem[];
  location: RouteData;
}

function PageTabs(props: PageTabsProps) {
  const { proRootPath = '/', children, originalMenuData, location } = props;

  /** return children to redirect if children pathname equal proRootPath */
  if (location.pathname === proRootPath) {
    return children;
  }
  const [pathID, pathName, shouldUpdate] = getMetadataOfTab(location.pathname, originalMenuData);
  const renderChildren = shouldUpdate ? children : <StaticChildren>{children}</StaticChildren>;

  const handleTabChange = (keyToSwitch: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: keyToSwitch });
    routeTo(targetTab);
  };
  const afterRemoveTab = (removeKey: string, nextTabKey: string, activedTabs: ChildrenTab[]) => {
    const targetTab = _find(activedTabs, { key: nextTabKey });
    routeTo(targetTab);
  };
  return (
    <ChildrenTabs
      activeKey={pathID}
      activeTitle={pathName}
      extraTabProperties={{
        location,
      }}
      handleTabChange={handleTabChange}
      afterRemoveTab={afterRemoveTab}
    >
      {renderChildren}
    </ChildrenTabs>
  );
}

export default withRouter(PageTabs as any);
