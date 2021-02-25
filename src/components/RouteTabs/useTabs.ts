import React, { useEffect, useState, useCallback } from 'react';
import { usePersistFn } from 'ahooks';
import { useLocation, history } from 'umi';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

import { useReallyPrevious } from '@/hooks/common';
import Logger from '@/utils/Logger';
import { RouteTab, UseTabsOptions, BeautifulLocation } from './data';
import { getActiveTabInfo } from './utils';

const logger = new Logger('useTabs');

function useTabs(options: UseTabsOptions) {
  const { mode = 'route', setTabTitle, originalMenuData, children } = options;
  const location = useLocation() as BeautifulLocation<{}, {}>;

  const [tabs, setTabs] = useState<RouteTab[]>([]);
  const { id: activeKey, hash, title: activeTitle, item: menuItem } = getActiveTabInfo(location)(
    mode,
    originalMenuData,
    setTabTitle,
  );

  /** 可指定 key，默认使用 activeKey */
  const getTabKey = useCallback(
    (key?: string) => (mode === 'args' ? `${key || activeKey}-${hash}` : key || activeKey),
    [activeKey],
  );

  const prevActiveKey = useReallyPrevious(getTabKey());

  const getTab = usePersistFn((tabKey: string) => _find(tabs, { key: tabKey }));

  const processTabs = usePersistFn((_tabs: RouteTab[]) =>
    _tabs.map(item => (_tabs.length === 1 ? { ...item, closable: false } : item)),
  );

  /** 获取激活标签页的相邻标签页 */
  const getNextTab = usePersistFn(() => {
    const removeIndex = _findIndex(tabs, { key: getTabKey() });
    const nextIndex = removeIndex >= 1 ? removeIndex - 1 : removeIndex + 1;
    return tabs[nextIndex];
  });

  /**
   * force: 是否在目标标签页不存在的时候强制回调函数
   */
  const handleSwitch = usePersistFn(
    (keyToSwitch: string, callback?: () => void, force: boolean = false) => {
      if (!keyToSwitch) {
        return;
      }

      /**
       * `keyToSwitch` 有值时，`targetTab` 可能为空。
       *
       * 如：一个会调用 `window.closeAndGoBackTab(path)` 的页面在 F5 刷新之后
       */
      const targetTab = getTab(keyToSwitch);
      // history.push(targetTab.extraTabProperties.location);
      history.push(targetTab ? targetTab.extraTabProperties.location : (keyToSwitch as any));

      if (force) {
        callback?.();
      } else {
        targetTab && callback?.();
      }
    },
  );

  /** 删除标签页处理事件，可接收一个 `nextTabKey` 参数，自定义需要返回的标签页 */
  const handleRemove = usePersistFn(
    (removeKey: string, nextTabKey?: string | false, callback?: () => void, force?: boolean) => {
      const getNextTabKeyByRemove = () =>
        removeKey === getTabKey() ? getNextTab()?.key : getTabKey();

      /** 如果 nextTabKey 为 false 时，不执行切换便签页操作，因此需要注意如此调用后应该还有已打开的标签页 */
      if (nextTabKey !== false) {
        handleSwitch(nextTabKey || getNextTabKeyByRemove(), callback, force);
      }

      setTabs(prevTabs => processTabs(prevTabs.filter(item => item.key !== removeKey)));
    },
  );

  const handleRemoveOthers = usePersistFn((currentKey: string, callback?: () => void) => {
    handleSwitch(currentKey, callback);

    setTabs(prevTabs => processTabs(prevTabs.filter(item => item.key === currentKey)));
  });

  const handRemoveRightTabs = usePersistFn((currentKey: string, callback?: () => void) => {
    handleSwitch(getTab(currentKey)!.key, callback);

    setTabs(prevTabs =>
      processTabs(prevTabs.slice(0, _findIndex(prevTabs, { key: currentKey }) + 1)),
    );
  });

  /**
   * 新增第一个 tab 不可删除
   *
   * @param newTab
   */
  const addTab = usePersistFn((newTab: RouteTab, followPath?: string) => {
    setTabs(prevTabs => {
      let result = [...prevTabs];
      if (followPath) {
        const targetIndex = _findIndex(prevTabs, { key: getTabKey(followPath) });
        if (targetIndex >= 0) {
          result.splice(targetIndex + 1, 0, newTab);
        } else {
          result = [...result, newTab];
        }
      } else {
        result = [...result, newTab];
      }

      return result.map((item, index) =>
        tabs.length === 0 && index === 0
          ? { ...item, closable: false }
          : { ...item, closable: true },
      );
    });
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
      reloadKey: string = getTabKey(),
      tabTitle?: React.ReactNode,
      extraTabProperties?: any,
      content?: React.ReactNode,
    ) => {
      if (tabs.length < 1) {
        return;
      }

      logger.log(`reload tab key: ${reloadKey}`);
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
            content:
              content ||
              React.cloneElement(item.content as JSX.Element, { key: new Date().valueOf() }),
          };
        }
        return item;
      });

      setTabs(updatedTabs);
    },
  );

  const goBackTab = usePersistFn((path?: string, callback?: () => void, force?: boolean) => {
    if (!path && (!prevActiveKey || !getTab(prevActiveKey))) {
      logger.warn('go back failed, no previous actived key or previous tab is closed.');
      return;
    }

    handleSwitch(path || prevActiveKey!, callback, force);
  });

  /** 关闭后切记需要激活另一个标签页，否则会导致页面空白 */
  const closeTab = usePersistFn((path?: string, callback?: () => void, force?: boolean) => {
    if (path && !getTab(path)) {
      logger.warn('close failed, target tab is closed.');
      return;
    }

    handleRemove(path || getTabKey(), false, callback, force);
  });

  /** 关闭当前标签页并返回到上次打开的标签页 */
  const closeAndGoBackTab = usePersistFn(
    (path?: string, callback?: () => void, force?: boolean) => {
      if (!path && (!prevActiveKey || !getTab(prevActiveKey))) {
        logger.warn('close and go back failed, no previous actived key or previous tab is closed.');
        return;
      }

      handleRemove(getTabKey(), path || prevActiveKey, callback, force);
    },
  );

  useEffect(() => {
    window.reloadTab = reloadTab;
    window.goBackTab = goBackTab;
    window.closeTab = closeTab;
    window.closeAndGoBackTab = closeAndGoBackTab;

    return () => {
      const hint = () => {
        logger.warn(`PageTabs had unmounted.`);
      };

      window.reloadTab = hint;
      window.goBackTab = hint;
      window.closeAndGoBackTab = hint;
    };
  }, []);

  useEffect(() => {
    const currentExtraTabProperties = { location: _omit(location, ['key']) };
    const activedTab = getTab(getTabKey());

    if (activedTab) {
      const { extraTabProperties: prevExtraTabProperties } = activedTab;
      if (!_isEqual(currentExtraTabProperties, prevExtraTabProperties)) {
        reloadTab(getTabKey(), activeTitle, currentExtraTabProperties, children);
      }
      logger.log(`no effect of tab key: ${getTabKey()}`);
    } else {
      const newTab = {
        tab: activeTitle,
        key: getTabKey(),
        content: children as any,
        extraTabProperties: currentExtraTabProperties,
      };

      const { followPath } = menuItem || {};

      logger.log(`add tab key: ${getTabKey()}`);
      addTab(newTab, followPath);
    }
  }, [children]);

  return {
    tabs,
    activeKey: getTabKey(),
    handleSwitch,
    handleRemove,
    handleRemoveOthers,
    handRemoveRightTabs,
  };
}

export default useTabs;
