import React from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
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
    // children 可能用于新建 tab ，切换并更新 tab
    const { children, activeKey, activeTitle, extraTabProperties } = props;
    const { activedTabs, nextTabKey } = state;
    // return state after delete tab
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

  tabMenu = null;

  state = {
    activedTabs: [],
    activeKey: null,
    nextTabKey: null,
  };

  handleSwitch = keyToSwitch => {
    const { handleTabChange } = this.props;
    const { activedTabs } = this.state;
    callFunctionIfFunction(handleTabChange)(keyToSwitch, activedTabs);
  };

  handleTabEdit = (targetKey, action) => {
    // console.log('handleTabEdit', targetKey);
    this[action](targetKey);
  };

  remove = key => {
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

  handleTabsMenuClick = tabKey => event => {
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
    // console.log(activedTabs);

    const setMenu = key => (
      <Menu onClick={this.handleTabsMenuClick(key)} onContextMenu={event => event.preventDefault()}>
        <Menu.Item disabled={activedTabs.length === 1} key={closeCurrentTabMenuKey}>
          关闭页签
        </Menu.Item>
        <Menu.Item disabled={activedTabs.length === 1} key={closeOthersTabMenuKey}>
          关闭其他页签
        </Menu.Item>
      </Menu>
    );

    const setTab = (tab, key) => (
      <Dropdown
        overlay={setMenu(key)}
        trigger={['contextMenu']}
        onVisibleChange={this.handleDropMenuVisibleChange}
      >
        <span className={styles.tabTitle}>{tab}</span>
      </Dropdown>
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
          ? activedTabs.map(item => {
              return (
                <TabPane
                  tab={setTab(item.tab, item.key)}
                  key={item.key}
                  closable={item.closable}
                  onContextMenu={event => event.preventDefault()}
                >
                  {item.content}
                </TabPane>
              );
            })
          : null}
      </Tabs>
    );
  }
}
