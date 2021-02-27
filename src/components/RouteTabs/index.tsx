import React from 'react';
import { FormattedMessage } from 'umi';
import { Tabs, Dropdown, Menu } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { MenuProps } from 'antd/lib/menu';
import * as H from 'history-with-query';
import { usePersistFn } from 'ahooks';
import classNames from 'classnames';

import useTabs, { UseTabsOptions } from './useTabs';
import styles from './index.less';

export { Mode } from './config';

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
  extraProperties: { location: H.LocationDescriptorObject<any> };
}

export interface RouteTabsProps
  extends UseTabsOptions,
    Omit<TabsProps, 'hideAdd' | 'activeKey' | 'onEdit' | 'onChange' | 'children'> {
  fixed?: boolean;
}

export default function RouteTabs(props: RouteTabsProps): JSX.Element {
  const { mode, fixed, originalRoutes, setTabTitle, children, ...rest } = props;

  const {
    tabs,
    activeKey,
    handleSwitch,
    handleRemove,
    handleRemoveOthers,
    handRemoveRightTabs,
  } = useTabs({
    children,
    setTabTitle,
    originalRoutes,
    mode,
  });

  const remove = usePersistFn((key: string) => {
    handleRemove(key);
  });

  const handleTabEdit = usePersistFn((targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  });

  const handleTabsMenuClick = usePersistFn((tabKey: string): MenuProps['onClick'] => event => {
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
        <FormattedMessage id='component.childrenTabs.closeCurrent' />
      </Menu.Item>
      <Menu.Item disabled={tabs.length === 1} key={CloseTabKey.Others}>
        <FormattedMessage id='component.childrenTabs.closeOthers' />
      </Menu.Item>
      <Menu.Item disabled={tabs.length === index + 1} key={CloseTabKey.ToRight}>
        <FormattedMessage id='component.childrenTabs.closeToRight' />
      </Menu.Item>
    </Menu>
  ));

  const setTab = usePersistFn((tab: React.ReactNode, key: string, index: number) => (
    <span onContextMenu={event => event.preventDefault()}>
      <Dropdown overlay={setMenu(key, index)} trigger={['contextMenu']}>
        <span className={styles.tabTitle}>{tab}</span>
      </Dropdown>
    </span>
  ));

  return (
    <Tabs
      tabPosition='top'
      type='editable-card'
      tabBarStyle={{ margin: 0 }}
      tabBarGutter={0}
      animated
      className={classNames('route-tabs', { 'page-tabs-fixed': fixed })}
      {...rest}
      hideAdd
      activeKey={activeKey}
      onEdit={handleTabEdit as TabsProps['onEdit']}
      onChange={handleSwitch}
    >
      {tabs.map((item: RouteTab, index) => (
        <Tabs.TabPane
          tab={setTab(item.tab, item.key, index)}
          key={item.key}
          closable={item.closable}
        >
          {item.content}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
