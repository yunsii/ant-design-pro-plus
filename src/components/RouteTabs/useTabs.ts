import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, history } from 'umi';
import * as H from 'history-with-query';
import { Route } from '@ant-design/pro-layout/lib/typings';
import { usePersistFn } from 'ahooks';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

import { useReallyPrevious } from '@/hooks/common';
import Logger from '@/utils/Logger';
import { getActiveTabInfo } from './utils';
import { Mode } from './config';
import { RouteTab } from '.';

const logger = new Logger('useTabs');

export interface CustomRoute extends Route {
  /** 配置该路由标签页紧跟指定的某个路由 */
  follow?: string;
}
export interface SetTabTitlePayload {
  path: string;
  locale: string;
  params: any;
  location: H.Location;
}

export interface UseTabsOptions {
  mode?: Mode;
  children?: JSX.Element;
  originalRoutes: CustomRoute[];

  /**
   *
   *
   * @param path 标签页路由
   * @param locale 国际化后的标题
   * @param params 根据路由解析得到的参数
   * @param location
   */
  setTabTitle?: (payload: SetTabTitlePayload) => React.ReactNode | void;
}

function useTabs(options: UseTabsOptions) {
  const { mode = Mode.Route, setTabTitle, originalRoutes, children } = options;
  const location = useLocation();

  const [tabs, setTabs] = useState<RouteTab[]>([]);
  const { id: activeKey, hash, title: activeTitle, item: menuItem } = getActiveTabInfo(
    location as H.Location,
  )(mode, originalRoutes, setTabTitle);

  /** 可指定 key，默认使用 activeKey */
  const getTabKey = useCallback(
    (key?: string) =>
      mode === Mode.Dynamic && hash ? `${key || activeKey}-${hash}` : key || activeKey,
    [activeKey, hash],
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
      history.push(targetTab ? targetTab.extraProperties.location : (keyToSwitch as any));

      if (force) {
        callback?.();
      } else {
        targetTab && callback?.();
      }
    },
  );

  /** 删除标签页处理事件，可接收一个 `nextTabKey` 参数，自定义需要返回的标签页 */
  const handleRemove = usePersistFn(
    (removeKey: string, nextTabKey?: string, callback?: () => void, force?: boolean) => {
      if (tabs.length === 1) {
        logger.warn('the final tab, can not remove.');
        return;
      }

      const getNextTabKeyByRemove = () =>
        removeKey === getTabKey() ? getNextTab()?.key : getTabKey();

      handleSwitch(nextTabKey || getNextTabKeyByRemove(), callback, force);

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
  const addTab = usePersistFn((newTab: RouteTab, follow?: string) => {
    setTabs(prevTabs => {
      let result = [...prevTabs];
      if (follow) {
        logger.log(`follow: ${follow}`);
        const targetIndex = _findIndex(prevTabs, { key: getTabKey(follow) });
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
      extraProperties?: any,
      content?: JSX.Element,
    ) => {
      if (tabs.length < 1) {
        return;
      }

      logger.log(`reload tab key: ${reloadKey}`);
      const updatedTabs = tabs.map(item => {
        if (item.key === reloadKey) {
          const {
            tab: prevTabTitle,
            extraProperties: prevExtraProperties,
            content: prevContent,
            ...rest
          } = item;
          return {
            ...rest,
            tab: tabTitle || prevTabTitle,
            extraProperties: extraProperties || prevExtraProperties,
            content:
              content ||
              React.cloneElement(item.content as JSX.Element, { key: new Date().valueOf() }),
          } as RouteTab;
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

  /** 关闭后自动切换到附近的标签页，如果是最后一个标签页不可删除 */
  const closeTab = usePersistFn((path?: string, callback?: () => void, force?: boolean) => {
    if (path && !getTab(path)) {
      logger.warn('close failed, target tab is closed.');
      return;
    }

    handleRemove(path || getTabKey(), undefined, callback, force);
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
      window.closeTab = hint;
      window.closeAndGoBackTab = hint;
    };
  }, []);

  useEffect(() => {
    const currentExtraProperties = { location: _omit(location, ['key']) };
    const activedTab = getTab(getTabKey());

    if (activedTab) {
      const { extraProperties: prevExtraProperties } = activedTab;
      if (!_isEqual(currentExtraProperties, prevExtraProperties)) {
        reloadTab(getTabKey(), activeTitle, currentExtraProperties, children);
      } else {
        logger.log(`no effect of tab key: ${getTabKey()}`);
      }
    } else {
      const newTab = {
        tab: activeTitle,
        key: getTabKey(),
        content: children as any,
        extraProperties: currentExtraProperties,
      };

      const { follow } = menuItem || {};

      logger.log(`add tab key: ${getTabKey()}`);
      addTab(newTab, follow);
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
