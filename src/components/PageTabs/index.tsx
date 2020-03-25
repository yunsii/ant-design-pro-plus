import React, { useEffect, useState } from 'react';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import withRouter from 'umi/withRouter';
import * as H from 'history';
import classNames from 'classnames';

import MenuTabs from '@/components/PageTabs/components/MenuTabs';
import {
  setPathName,
  getMetadataOfTab,
  getParams,
  routeTo,
  addTab,
  updateTab,
} from './utils';
import { UmiChildren, PageTab, PageTabsProps } from './data';
import './index.less';

function PageTabs(props: PageTabsProps) {
  const {
    proRootPath = '/',
    location,
    pageTabs,
    fixedPageTabs,
    originalMenuData,
    children,
  } = props;

  /** return children to redirect if children pathname equal proRootPath */
  if (location.pathname === proRootPath) {
    return children;
  }

  const [tabs, setTabs] = useState<PageTab<{ location: H.Location }>[]>([]);

  // TODO: 与 `updateTab` 函数整合
  const reloadCurrentTab = (children?: UmiChildren) => {
    if (Array.isArray(tabs) && tabs.length) {
      const updatedTabs = tabs.map(item => {
        if (item.key === activeKey) {
          return {
            ...item,
            content: children || React.cloneElement(item.content, { key: (new Date()).valueOf() }),
          };
        }
        return item;
      });
      setTabs(updatedTabs);
    }
  }

  useEffect(() => {
    window.reloadCurrentTab = reloadCurrentTab;
  }, [tabs]);

  const [pathID, pathName] = getMetadataOfTab(location.pathname!, originalMenuData);
  const activeKey = pageTabs === 'path' ? location.pathname! : pathID;
  const activeTitle =
    pageTabs === 'path'
      ? setPathName(pathID, pathName, getParams(pathID, location.pathname!), location)
      : pathName;

  useEffect(() => {
    const activedTabIndex = _findIndex(tabs, { key: activeKey });
    if (activedTabIndex > -1) {
      const { extraTabProperties: prevExtraTabProperties } = tabs[activedTabIndex];
      console.log("current location", { location });
      console.log("prev location", prevExtraTabProperties);
      if (!_isEqual({ location }, prevExtraTabProperties)) {
        const refreshedTabs = updateTab(tabs)(
          activedTabIndex,
          activeTitle,
          { location },
          children
        );
        setTabs(refreshedTabs);
      }
    } else {
      const newTab = {
        tab: activeTitle,
        key: activeKey,
        content: children as any,
        extraTabProperties: { location },
      };
      const addedTabs = addTab(tabs)(newTab);
      setTabs(addedTabs);
    }
  }, [children]);

  const handleSwitch = (keyToSwitch: string) => {
    const targetTab = _find(tabs, { key: keyToSwitch })!;
    routeTo(targetTab);
  };

  const handleRemove = (removeKey: string) => {
    let nextTabKey: string;
    if (removeKey !== activeKey) {
      nextTabKey = activeKey;
    } else {
      const removeIndex = _findIndex(tabs, { key: removeKey });
      const nextIndex = removeIndex >= 1 ? removeIndex - 1 : removeIndex + 1;
      nextTabKey = tabs[nextIndex].key;
    }
    handleSwitch(nextTabKey);
    setTabs(tabs.filter(item => item.key !== removeKey));
  };

  const handleRemoveOthers = (currentKey: string) => {
    const currentTab = tabs.filter(item => item.key === currentKey);
    handleSwitch(currentKey);
    setTabs(currentTab.map(item => ({ ...item })));
  };

  const handRemoveRightTabs = (currentKey: string) => {
    const currentIndex = _findIndex(tabs, { key: currentKey });
    handleSwitch(tabs[currentIndex].key);
    setTabs(tabs.slice(0, currentIndex + 1));
  };

  console.log(tabs);
  return (
    <MenuTabs
      activeKey={activeKey}
      onSwitch={handleSwitch}
      onRemove={handleRemove}
      onRemoveOthers={handleRemoveOthers}
      onRemoveRightTabs={handRemoveRightTabs}
      tabsProps={{
        animated: true,
        className: classNames({ 'page-tabs-fixed': fixedPageTabs }),
      }}
      tabs={tabs}
    />
  );
}

export default withRouter<PageTabsProps, React.FC>(PageTabs as React.FC);
