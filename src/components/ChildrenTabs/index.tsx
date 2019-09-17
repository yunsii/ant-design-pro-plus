import React from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { MenuProps } from 'antd/lib/menu';
import _findIndex from 'lodash/findIndex';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
import styles from './index.less';

const { TabPane } = Tabs;
// tabs 菜单选项 key 值
const closeCurrentTabMenuKey = 'closeCurrent';
const closeOthersTabMenuKey = 'closeOthers';

function addTab(newTab, activedTabs) {
  // filter 过滤路由 为 '/' 的 children
  // map 添加第一个 tab 不可删除
  // console.log(activedTabs, newTab);
  return [...activedTabs, newTab]
    .filter(item => item.path !== '/')
    .map((item, index) =>
      activedTabs.length === 0 && index === 0
        ? { ...item, closable: false }
        : { ...item, closable: true }
    );
}

function switchAndUpdateTab(activeIndex, tabName, extraTabProperties, children, activedTabs) {
  const { path, content, refresh, ...rest } = activedTabs[activeIndex];
  activedTabs.splice(activeIndex, 1, {
    tab: tabName,
    content: refresh ? content : children,
    ...rest,
    ...extraTabProperties,
  });
  // map 删除后的 activedTabs 长度为 1 时不可删除
  return activedTabs.map(item => (activedTabs.length === 1 ? { ...item, closable: false } : item));
}

export interface ChildrenTab {
  /** tab's title */
  tab: string;
  key: string;
  content: React.ReactChildren;
  /** used to extends tab's properties */
  [k: string]: any;
}

export interface ChildrenTabsProps {
  activeKey: string;
  activeTitle: string;
  handleTabChange: (keyToSwitch: string, activedTabs: any[]) => void;
  extraTabProperties?: {};
  tabsConfig?: TabsProps;
  afterRemoveTab?: (removeKey: string, nextTabKey: string, activedTabs: ChildrenTab[]) => void;
  /** children is used to create tab, switch and update tab */
  children: React.ReactChildren;
}

interface ChildrenTabsState {
  activedTabs: ChildrenTab[];
  activeKey: string | null;
  nextTabKey: string | null;
}

export default class ChildrenTabs extends React.Component<ChildrenTabsProps, ChildrenTabsState> {
  static getDerivedStateFromProps(props: ChildrenTabsProps, state: ChildrenTabsState) {
    const { children, activeKey, activeTitle, extraTabProperties } = props;
    const { activedTabs, nextTabKey } = state;
    // return state and set nextTabKey to `null` after delete tab
    if (nextTabKey) {
      return {
        activedTabs,
        activeKey: nextTabKey,
        nextTabKey: null,
      };
    }

    const activedTabIndex = _findIndex(activedTabs, { key: activeKey });
    // return state after switch or update tab
    if (activedTabIndex > -1) {
      return {
        activedTabs: switchAndUpdateTab(
          activedTabIndex,
          activeTitle,
          extraTabProperties,
          children,
          activedTabs
        ),
        activeKey,
      };
    }
    // return state to add tab
    const newTab = {
      tab: activeTitle,
      key: activeKey,
      content: children,
      ...extraTabProperties,
    };
    return {
      activedTabs: addTab(newTab, activedTabs),
      activeKey,
    };
  }

  state = {
    activedTabs: [],
    activeKey: null,
    nextTabKey: null,
  };

  handleSwitch = (keyToSwitch: string) => {
    const { handleTabChange } = this.props;
    const { activedTabs } = this.state;
    callFunctionIfFunction(handleTabChange)(keyToSwitch, activedTabs);
  };

  handleTabEdit = (targetKey: string, action: string) => {
    // console.log('handleTabEdit', targetKey);
    this[action](targetKey);
  };

  remove = (key: string) => {
    const { afterRemoveTab } = this.props;
    const { activedTabs, activeKey } = this.state;
    if (key !== activeKey) {
      this.setState(
        {
          activedTabs: activedTabs.filter(item => item.key !== key),
          nextTabKey: activeKey,
        },
        () => {
          callFunctionIfFunction(afterRemoveTab)(key, activeKey, activedTabs);
        }
      );
      return;
    }
    const targetIndex = _findIndex(activedTabs, { key });
    const nextIndex = targetIndex > 0 ? targetIndex - 1 : targetIndex + 1;
    const nextTabKey = activedTabs[nextIndex].key;
    this.setState(
      {
        activedTabs: activedTabs.filter(item => item.key !== key),
        nextTabKey,
      },
      () => {
        callFunctionIfFunction(afterRemoveTab)(key, nextTabKey, activedTabs);
      }
    );
  };

  handleTabsMenuClick = (tabKey: string): MenuProps['onClick'] => event => {
    const { key } = event;
    const { activedTabs } = this.state;

    if (key === closeCurrentTabMenuKey) {
      this.remove(tabKey);
    } else if (key === closeOthersTabMenuKey) {
      const currentTab = activedTabs.filter(item => item.key === tabKey);
      this.setState({
        activedTabs: currentTab.map(item => ({ ...item, closable: false })),
      });
    }
  };

  render() {
    const { tabsConfig } = this.props;
    const { activedTabs, activeKey } = this.state;
    window.childrenTabs = this;
    // console.log(activedTabs);

    const setMenu = (key: string) => (
      <Menu onClick={this.handleTabsMenuClick(key)}>
        <Menu.Item disabled={activedTabs.length === 1} key={closeCurrentTabMenuKey}>
          关闭页签
        </Menu.Item>
        <Menu.Item disabled={activedTabs.length === 1} key={closeOthersTabMenuKey}>
          关闭其他页签
        </Menu.Item>
      </Menu>
    );

    const setTab = (tab: string, key: string) => (
      <span onContextMenu={event => event.preventDefault()}>
        <Dropdown overlay={setMenu(key)} trigger={['contextMenu']}>
          <span className={styles.tabTitle}>{tab}</span>
        </Dropdown>
      </span>
    );

    return (
      <Tabs
        tabPosition="top"
        type="editable-card"
        tabBarStyle={{ margin: 0 }}
        tabBarGutter={0}
        hideAdd
        {...tabsConfig}
        activeKey={activeKey}
        onEdit={this.handleTabEdit}
        onChange={this.handleSwitch}
      >
        {activedTabs && activedTabs.length
          ? activedTabs.map((item: ChildrenTab) => {
              return (
                <TabPane tab={setTab(item.tab, item.key)} key={item.key} closable={item.closable}>
                  {item.content}
                </TabPane>
              );
            })
          : null}
      </Tabs>
    );
  }
}
