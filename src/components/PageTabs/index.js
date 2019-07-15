import React from 'react';
import router from 'umi/router';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { Tabs, Dropdown, Menu, Icon, Spin } from 'antd';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';

import { flatTreeToList } from '@/utils/treeUtils'; // 引入工具函数
import styles from './index.less';

const { TabPane } = Tabs;

// tabs 菜单选项 key 值
const closeCurrentTabMenuKey = 'closeCurrent';
const closeOthersTabMenuKey = 'closeOthers';

function getChildrenPathname(children) {
  const {
    props: {
      location: { pathname: childrenPathname },
    },
  } = children;
  return childrenPathname;
}

function flatMenuTreeToList(menu) {
  function nodeTransfer(node) {
    return {
      path: node.path,
      name: node.name,
      locale: node.locale,
      // content: node.component,
    };
  }
  return flatTreeToList(menu, {
    nodeTransfer,
  });
}

const memoizeOneFlatMenuTreeToList = memoizeOne(flatMenuTreeToList, isEqual);

function searchPathIdAndName(childrenPathname, originalMenuData) {
  let result = ['404', 'Error'];
  let pathToSearchPathId = childrenPathname;
  const routeDepthInMenu = 2;
  const pathSegments = childrenPathname.split(/\//g).filter(item => item);
  if (pathSegments.length > routeDepthInMenu) {
    pathToSearchPathId = `/${pathSegments.slice(0, routeDepthInMenu).join('/')}`;
  }
  // console.log(pathSegments, pathToSearchPathId);

  const flatedMenu = memoizeOneFlatMenuTreeToList(originalMenuData);
  for (let i = 0; i < flatedMenu.length; i += 1) {
    if (pathToRegexp(flatedMenu[i].path).test(pathToSearchPathId)) {
      result = [flatedMenu[i].path, flatedMenu[i].name];
      break;
    }
  }
  return result;
}

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

function switchAndUpdateTab(activeIndex, children, activedTabs) {
  const { path, content, ...rest } = activedTabs[activeIndex];
  activedTabs.splice(activeIndex, 1, {
    path: getChildrenPathname(children),
    content: children,
    ...rest,
  });
  // map 删除后的 activedTabs 长度为 1 时不可删除
  return activedTabs.map(item => (activedTabs.length === 1 ? { ...item, closable: false } : item));
}

export default class PageTabs extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // children 可能用于新建 tab ，切换并更新 tab ，切换到被删除 tab 的相邻 tab
    const { children, originalMenuData } = props;
    const { activedTabs } = state;
    // console.log(children);
    if (originalMenuData.length === 0) return null;

    const [newOrSwitchOrNextPathId, pathName] = searchPathIdAndName(
      getChildrenPathname(children),
      originalMenuData
    );
    const activedTabIndex = _findIndex(activedTabs, { key: newOrSwitchOrNextPathId });
    if (activedTabIndex > -1) {
      // return state after switch or delete tab
      return {
        activedTabs: switchAndUpdateTab(activedTabIndex, children, activedTabs),
        activeKey: newOrSwitchOrNextPathId,
      };
    }
    const newTab = {
      tab: pathName,
      path: getChildrenPathname(children),
      key: newOrSwitchOrNextPathId,
      closable: true,
      content: children,
    };
    return {
      activedTabs: addTab(newTab, activedTabs),
      activeKey: newOrSwitchOrNextPathId,
    };
  }

  state = {
    activedTabs: [],
    activeKey: null,
  };

  handleTabChange = key => {
    const { activedTabs, activeKey } = this.state;
    if (activeKey === key) return;

    const targetTab = _find(activedTabs, { key });
    router.push(targetTab.path); // key is not work fine with dynamic router
  };

  handleTabEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = key => {
    const { activedTabs } = this.state;
    const targetIndex = _findIndex(activedTabs, { key });
    const nextIndex = targetIndex > 0 ? targetIndex - 1 : targetIndex + 1;
    const nextTabKey = activedTabs[nextIndex].key;
    router.push(nextTabKey);
    this.setState({
      activedTabs: activedTabs.filter(item => item.key !== key),
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
    const { menuLoading } = this.props;
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
        <a className={styles.tabsMenu} href="#">
          标签菜单&nbsp;
          <Icon type="down" />
        </a>
      </Dropdown>
    );
    return (
      <Spin spinning={menuLoading}>
        <Tabs
          // className={styles.tabs}
          activeKey={activeKey}
          // animated
          onChange={this.handleTabChange}
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
      </Spin>
    );
  }
}
