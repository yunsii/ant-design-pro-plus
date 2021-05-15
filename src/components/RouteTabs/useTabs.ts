import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, history } from 'umi';
import * as H from 'history-with-query';
import { Route } from '@ant-design/pro-layout/lib/typings';
import { useLocalStorageState, usePersistFn } from 'ahooks';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _isArray from 'lodash/isArray';

import { useReallyPrevious } from '@/hooks/common';
import Logger from '@/utils/Logger';
import { getRenderRoute, getRenderRouteKey, getRouteTabComponent } from './utils';
import { Mode } from './config';
import { RouteTab } from '.';
import { RouteTabsOptions } from 'config/defaultSettings';

const logger = new Logger('useTabs');

export interface MakeUpRoute extends Route {
  /** 配置该路由标签页紧跟指定的某个路由 */
  follow?: string;
  component?: React.ComponentType<{ location: H.Location }>;
}

export interface RenderRoute extends MakeUpRoute {
  renderKey: string;
  /** Mode.Dynamic 会计算路由参数的 hash 值 */
  hash?: string;
}

export interface SetTabTitlePayload {
  path: string;
  locale: string;
  params: any;
  location: H.Location;
}

export interface UseTabsOptions {
  mode?: Mode;
  /** tabs 持久化 */
  persistent?: RouteTabsOptions['persistent'];
  children?: JSX.Element;
  originalRoutes: MakeUpRoute[];

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
  const { mode = Mode.Route, setTabTitle, originalRoutes, persistent, children } = options;
  const location = useLocation() as H.Location;

  const [tabLocations, setTabLocations] = useLocalStorageState<RouteTab['location'][]>(
    'tabLocations',
    [],
  );
  const [tabs, setTabs] = useState<RouteTab[]>(() => {
    if (persistent && _isArray(tabLocations) && tabLocations.length) {
      return tabLocations.map((tabLocation) => {
        const renderRoute = getRenderRoute({
          location: tabLocation,
          mode,
          originalRoutes,
          setTabTitle,
        });
        return {
          tab: renderRoute.name,
          key: getRenderRouteKey(renderRoute, mode),
          content: React.createElement(getRouteTabComponent(tabLocation as any, originalRoutes), {
            location: tabLocation,
          }),
          location: tabLocation,
        };
      });
    }
    return [];
  });
  const currentRenderRoute = getRenderRoute({
    location,
    mode,
    originalRoutes,
    setTabTitle,
  });

  const currentTabKey = useMemo(() => {
    return getRenderRouteKey(currentRenderRoute, mode);
  }, [mode, currentRenderRoute]);

  const prevActiveKey = useReallyPrevious(currentTabKey);

  const getTab = usePersistFn((tabKey: string) => _find(tabs, { key: tabKey }));

  const processTabs = usePersistFn((_tabs: RouteTab[]) =>
    _tabs.map((item) => (_tabs.length === 1 ? { ...item, closable: false } : item)),
  );

  /** 获取激活标签页的相邻标签页 */
  const getNextTab = usePersistFn(() => {
    const removeIndex = _findIndex(tabs, { key: currentTabKey });
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
      history.push(targetTab ? targetTab.location : (keyToSwitch as any));

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
        removeKey === currentTabKey ? getNextTab()?.key : currentTabKey;

      handleSwitch(nextTabKey || getNextTabKeyByRemove(), callback, force);

      setTabs((prevTabs) => processTabs(prevTabs.filter((item) => item.key !== removeKey)));
    },
  );

  const handleRemoveOthers = usePersistFn((currentKey: string, callback?: () => void) => {
    handleSwitch(currentKey, callback);

    setTabs((prevTabs) => processTabs(prevTabs.filter((item) => item.key === currentKey)));
  });

  const handRemoveRightTabs = usePersistFn((currentKey: string, callback?: () => void) => {
    handleSwitch(getTab(currentKey)!.key, callback);

    setTabs((prevTabs) =>
      processTabs(prevTabs.slice(0, _findIndex(prevTabs, { key: currentKey }) + 1)),
    );
  });

  /**
   * 新增第一个 tab 不可删除
   *
   * @param newTab
   */
  const addTab = usePersistFn((newTab: RouteTab, follow?: string) => {
    setTabs((prevTabs) => {
      let result = [...prevTabs];
      if (follow) {
        logger.log(`follow: ${follow}`);
        const targetIndex = _findIndex(prevTabs, (tab) => {
          if (mode === Mode.Route) {
            return tab.key === follow;
          }
          const followReg = new RegExp(`^${follow}`);
          return followReg.test(tab.key);
        });
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
   * @param location 需要刷新的 tab location
   * @param content 需要刷新的 tab 渲染的内容
   */
  const reloadTab = usePersistFn(
    (
      reloadKey: string = currentTabKey,
      tabTitle?: React.ReactNode,
      tabLocation?: RouteTab['location'],
      content?: JSX.Element,
    ) => {
      if (tabs.length < 1) {
        return;
      }

      logger.log(`reload tab key: ${reloadKey}`);
      const updatedTabs = tabs.map((item) => {
        if (item.key === reloadKey) {
          const { tab: prevTabTitle, location: prevLocation, content: prevContent, ...rest } = item;
          return {
            ...rest,
            tab: tabTitle || prevTabTitle,
            location: tabLocation || prevLocation,
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

    handleRemove(path || currentTabKey, undefined, callback, force);
  });

  /** 关闭当前标签页并返回到上次打开的标签页 */
  const closeAndGoBackTab = usePersistFn(
    (path?: string, callback?: () => void, force?: boolean) => {
      if (!path && (!prevActiveKey || !getTab(prevActiveKey))) {
        logger.warn('close and go back failed, no previous actived key or previous tab is closed.');
        return;
      }

      handleRemove(currentTabKey, path || prevActiveKey, callback, force);
    },
  );

  useEffect(() => {
    if (persistent) {
      setTabLocations(tabs.map((item) => item.location));
      return;
    }
    if (tabLocations) {
      setTabLocations();
    }
  }, [persistent, tabs]);

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
    const currentTabLocation = _omit(location, ['key']);
    const activedTab = getTab(currentTabKey);

    if (activedTab) {
      const { location: prevTabLocation } = activedTab;
      if (!_isEqual(currentTabLocation, prevTabLocation)) {
        reloadTab(currentTabKey, currentRenderRoute.name, currentTabLocation, children);
      } else {
        logger.log(`no effect of tab key: ${currentTabKey}`);
      }
    } else {
      const newTab = {
        tab: currentRenderRoute.name,
        key: currentTabKey,
        content: children as any,
        location: currentTabLocation,
      };

      const { follow } = currentRenderRoute || {};

      logger.log(`add tab key: ${currentTabKey}`);
      addTab(newTab, follow);
    }
  }, [children, currentTabKey]);

  return {
    tabs,
    activeKey: currentTabKey,
    handleSwitch,
    handleRemove,
    handleRemoveOthers,
    handRemoveRightTabs,
  };
}

export default useTabs;
