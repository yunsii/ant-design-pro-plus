import React, { useEffect, useState } from 'react';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import withRouter from 'umi/withRouter';
import classNames from 'classnames';

import MenuTabs from '@/components/PageTabs/components/MenuTabs';
import {
  getActiveTabInfo,
  routeTo,
} from './utils';
import { UmiChildren, PageTab, PageTabsProps, BeautifulLocation } from './data';
import './index.less';

function PageTabs(props: PageTabsProps) {
  const {
    proRootPath = '/',
    location,
    pageTabs = 'route',
    fixedPageTabs,
    setTabTitle,
    originalMenuData,
    children,
  } = props;

  /** return children to redirect if children pathname equal proRootPath */
  if (location.pathname === proRootPath) {
    return children;
  }

  const [tabs, setTabs] = useState<PageTab<{ location: BeautifulLocation }>[]>([]);
  const [activeKey, activeTitle] = getActiveTabInfo(location)(pageTabs, originalMenuData, setTabTitle);

  /**
   * 新增第一个 tab 不可删除
   * 
   * @param newTab 
   */
  const addTab = (newTab: PageTab<{ location: BeautifulLocation }>) => {
    setTabs([...tabs, newTab].map((item, index) =>
      tabs.length === 0 && index === 0
        ? { ...item, closable: false }
        : { ...item, closable: true },
    ));
  }


  /**
   * 
   * @param reloadKey 需要刷新的 tab key
   * @param tabTitle 需要刷新的 tab 标题
   * @param extraTabProperties 需要刷新的 tab 额外属性
   * @param content 需要刷新的 tab 渲染的内容
   */
  const reloadTab = (reloadKey: string, tabTitle?: React.ReactNode, extraTabProperties?: any, content?: UmiChildren) => {
    if (Array.isArray(tabs) && tabs.length) {
      const updatedTabs = tabs.map(item => {
        if (item.key === reloadKey) {
          const { tab: prevTabTitle, extraTabProperties: prevExtraTabProperties, content: prevContent, ...rest } = item;
          return {
            ...rest,
            tab: tabTitle || prevTabTitle,
            extraTabProperties: extraTabProperties || prevExtraTabProperties,
            content: content || React.cloneElement(item.content, { key: (new Date()).valueOf() }),
          };
        }
        return item;
      });
      setTabs(updatedTabs);
    }
  }

  useEffect(() => {
    window.reloadCurrentTab = () => reloadTab(activeKey);
  }, [tabs]);

  useEffect(() => {
    console.log("children effect", children);
    const activedTab = _find(tabs, { key: activeKey });
    if (activedTab) {
      const { extraTabProperties: prevExtraTabProperties } = activedTab;
      console.log("current location", { location });
      console.log("prev location", prevExtraTabProperties);
      if (!_isEqual({ location }, prevExtraTabProperties)) {
        reloadTab(activeKey, activeTitle, { location }, children);
      }
    } else {
      const newTab = {
        tab: activeTitle,
        key: activeKey,
        content: children as any,
        extraTabProperties: { location },
      };
      addTab(newTab);
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
    const restTabs = tabs.filter(item => item.key !== removeKey);
    setTabs(restTabs.map(item => (restTabs.length === 1 ? { ...item, closable: false } : item)));
  };

  const handleRemoveOthers = (currentKey: string) => {
    const restTabs = tabs.filter(item => item.key === currentKey);
    handleSwitch(currentKey);
    setTabs(restTabs.map(item => ({ ...item, closable: false })));
  };

  const handRemoveRightTabs = (currentKey: string) => {
    const currentIndex = _findIndex(tabs, { key: currentKey });
    handleSwitch(tabs[currentIndex].key);
    const restTabs = tabs.slice(0, currentIndex + 1);
    setTabs(restTabs.map(item => (restTabs.length === 1 ? { ...item, closable: false } : item)));
  };

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
