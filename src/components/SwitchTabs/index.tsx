import React, { useEffect, useRef, useMemo } from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { history, useLocation } from 'umi';
import { TabsProps } from 'antd/lib/tabs';
import { MenuProps } from 'antd/lib/menu';
import * as H from 'history-with-query';
import { usePersistFn } from 'ahooks';
import useSwitchTabs, { UseSwitchTabsOptions, ActionType } from 'use-switch-tabs';
import classNames from 'classnames';
import _get from 'lodash/get';

import styles from './index.less';

enum CloseTabKey {
  Current = 'current',
  Others = 'others',
  ToRight = 'toRight',
}

export interface RouteTab {
  /** tab's title */
  tab: React.ReactNode;
  key: string;
  content: JSX.Element;
  closable?: boolean;
  /** used to extends tab's properties */
  location: Omit<H.Location, 'key'>;
}

export interface SwitchTabsProps
  extends Omit<UseSwitchTabsOptions, 'location' | 'history'>,
  Omit<TabsProps, 'hideAdd' | 'activeKey' | 'onEdit' | 'onChange' | 'children'> {
  fixed?: boolean;
  footerRender?: (() => React.ReactNode) | false,
}

export default function SwitchTabs(props: SwitchTabsProps): JSX.Element {
  const { mode, fixed, originalRoutes, setTabName, persistent, children, footerRender, ...rest } = props;

  const location = useLocation() as any;
  const actionRef = useRef<ActionType>();

  const { tabs, activeKey, handleSwitch, handleRemove, handleRemoveOthers, handRemoveRightTabs } =
    useSwitchTabs({
      children,
      setTabName,
      originalRoutes,
      mode,
      persistent,
      location,
      history,
      actionRef,
    });

  const remove = usePersistFn((key: string) => {
    handleRemove(key);
  });

  const handleTabEdit = usePersistFn((targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  });

  const handleTabsMenuClick = usePersistFn((tabKey: string): MenuProps['onClick'] => (event) => {
    const { key, domEvent } = event;
    domEvent.stopPropagation();

    if (key === CloseTabKey.Current) {
      handleRemove(tabKey);
    } else if (key === CloseTabKey.Others) {
      handleRemoveOthers(tabKey);
    } else if (key === CloseTabKey.ToRight) {
      handRemoveRightTabs(tabKey);
    }
  });

  const setMenu = usePersistFn((key: string, index: number) => (
    <Menu onClick={handleTabsMenuClick(key)}>
      <Menu.Item disabled={tabs.length === 1} key={CloseTabKey.Current}>
        closeCurrent
      </Menu.Item>
      <Menu.Item disabled={tabs.length === 1} key={CloseTabKey.Others}>
        closeOthers
      </Menu.Item>
      <Menu.Item disabled={tabs.length === index + 1} key={CloseTabKey.ToRight}>
        closeToRight
      </Menu.Item>
    </Menu>
  ));

  const setTab = usePersistFn((tab: React.ReactNode, key: string, index: number) => (
    <span onContextMenu={(event) => event.preventDefault()}>
      <Dropdown overlay={setMenu(key, index)} trigger={['contextMenu']}>
        <span className={styles.tabTitle}>{tab}</span>
      </Dropdown>
    </span>
  ));

  useEffect(() => {
    window.tabsAction = actionRef.current!;
  }, [actionRef.current]);

  const footer = useMemo(() => {
    if (typeof footerRender === 'function') {
      return footerRender();
    }
    return footerRender;
  }, [footerRender])

  return (
    <Tabs
      tabPosition='top'
      type='editable-card'
      tabBarStyle={{ margin: 0 }}
      tabBarGutter={0}
      animated
      className={classNames('switch-tabs', { 'page-tabs-fixed': fixed })}
      {...rest}
      hideAdd
      activeKey={activeKey}
      onEdit={handleTabEdit as TabsProps['onEdit']}
      onChange={handleSwitch}
    >
      {tabs.map((item, index) => (
        <Tabs.TabPane
          tab={setTab(item.title, item.key, index)}
          key={item.key}
          closable={item.closable}
          forceRender={_get(persistent, 'force', false)}
        >
          {item.content}
          {footer}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
