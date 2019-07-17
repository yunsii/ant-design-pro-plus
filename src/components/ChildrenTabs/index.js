import React from 'react';
import { Tabs, Dropdown, Menu, Icon } from 'antd';
import _findIndex from 'lodash/findIndex';

import styles from './index.less';

const { TabPane } = Tabs;
// tabs 菜单选项 key 值
const closeCurrentTabMenuKey = 'closeCurrent';
const closeOthersTabMenuKey = 'closeOthers';

function addTab(newTab, activedTabs) {
  // filter 过滤路由 为 '/' 的 children
  // map 添加第一个 tab 不可删除
  return [...activedTabs, newTab]
    .filter(item => item.path !== '/')
    .map((item, index) =>
      activedTabs.length === 0 && index === 0
        ? { ...item, closable: false }
        : { ...item, closable: true }
    );
}

function switchAndUpdateTab(activeIndex, tabName, extraTabProperties, children, activedTabs) {
  const { path, content, ...rest } = activedTabs[activeIndex];
  activedTabs.splice(activeIndex, 1, {
    tab: tabName,
    content: children,
    ...rest,
    ...extraTabProperties,
  });
  // map 删除后的 activedTabs 长度为 1 时不可删除
  return activedTabs.map(item => (activedTabs.length === 1 ? { ...item, closable: false } : item));
}

export default class ChildrenTabs extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // children 可能用于新建 tab ，切换并更新 tab ，切换到被删除 tab 的相邻 tab
    const { children, activeKey, activetTitle, extraTabProperties } = props;
    const { activedTabs } = state;

    const activedTabIndex = _findIndex(activedTabs, { key: activeKey });
    if (activedTabIndex > -1) {
      // return state after switch or delete tab
      return {
        activedTabs: switchAndUpdateTab(
          activedTabIndex,
          activetTitle,
          extraTabProperties,
          children,
          activedTabs
        ),
        activeKey,
      };
    }
    const newTab = {
      tab: activetTitle,
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
  };

  handleSwitch = keyToSwitch => {
    const { beforeSwtichTab, handleTabChange } = this.props;
    const { activedTabs, activeKey } = this.state;
    if (keyToSwitch === activeKey) return;

    if (handleTabChange) {
      handleTabChange(keyToSwitch, activedTabs);
    }
    this.setState({
      activeKey: beforeSwtichTab ? beforeSwtichTab(keyToSwitch) : keyToSwitch,
    });
  };

  handleTabEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = key => {
    const { beforeRemoveTab } = this.props;
    const { activedTabs } = this.state;
    const targetIndex = _findIndex(activedTabs, { key });
    const nextIndex = targetIndex > 0 ? targetIndex - 1 : targetIndex + 1;
    const nextTabKey = activedTabs[nextIndex].key;
    beforeRemoveTab(nextTabKey, activedTabs);
    this.setState({
      activedTabs: activedTabs.filter(item => item.key !== key),
      activeKey: nextTabKey,
    });
  };

  handleTabsMenuClick = event => {
    const { key } = event;
    const { activeKey, activedTabs } = this.state;

    if (key === closeCurrentTabMenuKey) {
      this.remove(activeKey);
    } else if (key === closeOthersTabMenuKey) {
      const currentTab = activedTabs.filter(item => item.key === activeKey);
      this.setState({
        activedTabs: currentTab.map(item => ({ ...item, closable: false })),
        activeKey,
      });
    }
  };

  render() {
    const { activedTabs, activeKey } = this.state;
    // console.log(activedTabs);

    const menu = (
      <Menu onClick={this.handleTabsMenuClick}>
        <Menu.Item disabled={activedTabs.length === 1} key={closeCurrentTabMenuKey}>
          关闭当前标签页
        </Menu.Item>
        <Menu.Item disabled={activedTabs.length === 1} key={closeOthersTabMenuKey}>
          关闭其他标签页
        </Menu.Item>
      </Menu>
    );
    const operations = (
      <Dropdown overlay={menu}>
        <a className={styles.tabsMenu}>
          标签菜单&nbsp;
          <Icon type="down" />
        </a>
      </Dropdown>
    );
    return (
      <Tabs
        // className={styles.tabs}
        activeKey={activeKey}
        // animated
        onChange={this.handleSwitch}
        tabBarExtraContent={operations}
        tabBarStyle={{ margin: 0 }}
        tabPosition="top"
        tabBarGutter={-1}
        hideAdd
        type="editable-card"
        onEdit={this.handleTabEdit}
      >
        {activedTabs && activedTabs.length
          ? activedTabs.map(item => {
              return (
                <TabPane tab={item.tab} key={item.key} closable={item.closable}>
                  {item.content}
                </TabPane>
              );
            })
          : null}
      </Tabs>
    );
  }
}
