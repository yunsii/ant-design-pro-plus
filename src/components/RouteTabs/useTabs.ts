import React, { useEffect, useState } from 'react';
import { usePersistFn } from '@umijs/hooks';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _partial from 'lodash/partial';

import { useReallyPrevious } from '@/hooks/common';
import { useLocation } from '@/hooks/route';
import { logger } from '@/utils/utils';
import { UmiChildren, RouteTab, UseTabsOptions, BeautifulLocation } from './data';
import { getActiveTabInfo, routeTo } from './utils';

const Logger = _partial(logger, 'useTabs');

function useTabs(options: UseTabsOptions) {
  const location = useLocation() as BeautifulLocation;
  const { mode = 'route', setTabTitle, originalMenuData, children } = options;

  const [tabs, setTabs] = useState<RouteTab[]>([]);
  const [activeKey, activeTitle] = getActiveTabInfo(location)(mode, originalMenuData, setTabTitle);
  const prevActiveKey = useReallyPrevious(activeKey);

  const getTab = usePersistFn((tabKey: string) => _find(tabs, { key: tabKey }));

  const setTabsAfterDelete = (_tabs: RouteTab[]) => {
    setTabs(_tabs.map(item => (_tabs.length === 1 ? { ...item, closable: false } : item)));
  };

  /** 获取激活标签页的相邻标签页 */
  const getNextTab = usePersistFn(() => {
    const removeIndex = _findIndex(tabs, { key: activeKey });
    const nextIndex = removeIndex >= 1 ? removeIndex - 1 : removeIndex + 1;
    return tabs[nextIndex];
  });

  const handleSwitch = usePersistFn((keyToSwitch: string) => {
    if (!keyToSwitch) {
      return;
    }

    const targetTab = _find(tabs, { key: keyToSwitch })!;
    routeTo(targetTab);
  });

  /** 删除标签页处理事件，可接收一个 `nextTabKey` 参数，自定义需要返回的标签页 */
  const handleRemove = usePersistFn((removeKey: string, nextTabKey?: string) => {
    const getNextTabKeyByRemove = () => (removeKey === activeKey ? getNextTab()?.key : activeKey);
    handleSwitch(nextTabKey || getNextTabKeyByRemove());

    const restTabs = tabs.filter(item => item.key !== removeKey);
    setTabsAfterDelete(restTabs);
  });

  const handleRemoveOthers = usePersistFn((currentKey: string) => {
    handleSwitch(currentKey);

    const restTabs = tabs.filter(item => item.key === currentKey);
    setTabsAfterDelete(restTabs);
  });

  const handRemoveRightTabs = usePersistFn((currentKey: string) => {
    const currentIndex = _findIndex(tabs, { key: currentKey });
    handleSwitch(tabs[currentIndex].key);

    const restTabs = tabs.slice(0, currentIndex + 1);
    setTabsAfterDelete(restTabs);
  });

  /**
   * 新增第一个 tab 不可删除
   *
   * @param newTab
   */
  const addTab = usePersistFn((newTab: RouteTab) => {
    setTabs(
      [...tabs, newTab].map((item, index) =>
        tabs.length === 0 && index === 0
          ? { ...item, closable: false }
          : { ...item, closable: true },
      ),
    );
  });

  /**
   * 重载标签页，传入参数重写相关属性
   *
   * @param reloadKey 需要刷新的 tab key
   * @param tabTitle 需要刷新的 tab 标题
   * @param extraTabProperties 需要刷新的 tab 额外属性
   * @param content 需要刷新的 tab 渲染的内容
   */
  const reloadTab = usePersistFn(
    (
      reloadKey: string = activeKey,
      tabTitle?: React.ReactNode,
      extraTabProperties?: any,
      content?: UmiChildren,
    ) => {
      if (tabs.length < 1) {
        return;
      }

      Logger(`reload tab key: ${reloadKey}`);
      const updatedTabs = tabs.map(item => {
        if (item.key === reloadKey) {
          const {
            tab: prevTabTitle,
            extraTabProperties: prevExtraTabProperties,
            content: prevContent,
            ...rest
          } = item;
          return {
            ...rest,
            tab: tabTitle || prevTabTitle,
            extraTabProperties: extraTabProperties || prevExtraTabProperties,
            content: content || React.cloneElement(item.content, { key: new Date().valueOf() }),
          };
        }
        return item;
      });

      setTabs(updatedTabs);
    },
  );

  const goBackTab = usePersistFn(() => {
    if (!prevActiveKey || !getTab(prevActiveKey)) {
      Logger('go back failed, no previous actived key or previous tab is closed.', 'warn');
      return;
    }

    handleSwitch(prevActiveKey);
  });

  /** 关闭当前标签页并返回到上次打开的标签页 */
  const closeAndGoBackTab = usePersistFn(() => {
    if (!prevActiveKey || !getTab(prevActiveKey)) {
      Logger(
        'close and go back failed, no previous actived key or previous tab is closed.',
        'warn',
      );
      return;
    }

    handleRemove(activeKey, prevActiveKey);
  });

  useEffect(() => {
    window.reloadCurrentTab = () => reloadTab();
    window.goBackTab = goBackTab;
    window.closeAndGoBackTab = closeAndGoBackTab;

    return () => {
      const hint = () => {
        Logger(`PageTabs had unmounted.`);
      };

      window.reloadCurrentTab = hint;
      window.goBackTab = hint;
      window.closeAndGoBackTab = hint;
    };
  }, []);

  useEffect(() => {
    const currentExtraTabProperties = { location: _omit(location, ['key']) };
    const activedTab = _find(tabs, { key: activeKey });

    if (activedTab) {
      const { extraTabProperties: prevExtraTabProperties } = activedTab;
      if (!_isEqual(currentExtraTabProperties, prevExtraTabProperties)) {
        reloadTab(activeKey, activeTitle, currentExtraTabProperties, children);
      }
      Logger(`no effect of tab key: ${activeKey}`);
    } else {
      const newTab = {
        tab: activeTitle,
        key: activeKey,
        content: children as any,
        extraTabProperties: currentExtraTabProperties,
      };
      Logger(`add tab key: ${activeKey}`);
      addTab(newTab);
    }
  }, [children]);

  return {
    tabs,
    activeKey,
    handleSwitch,
    handleRemove,
    handleRemoveOthers,
    handRemoveRightTabs,
  };
}

export default useTabs;
