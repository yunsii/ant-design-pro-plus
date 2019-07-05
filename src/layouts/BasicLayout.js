import React, { Suspense } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import router from 'umi/router';

import { Layout, Tabs, Dropdown, Menu, Icon, Spin } from 'antd';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import { flatTreeToList } from '@/utils/treeUtils'; // 引入工具函数

import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';

const { TabPane } = Tabs;

// tabs 菜单选项 key 值
const closeCurrentTabMenuKey = 'closeCurrent';
const closeOthersTabMenuKey = 'closeOthers';

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

function getTabName(pathId, menuData) {
  const flatedMenu = flatMenuTreeToList(menuData);
  const targetMenuItem = _find(flatedMenu, { path: pathId });
  return targetMenuItem.name;
}

function generatePathId(childrenPathname) {
  let pathId = childrenPathname;
  const pathSegment = childrenPathname.split('/').filter(item => item);
  if (pathSegment.length > 2) {
    pathId = `/${pathSegment[0]}/${pathSegment[1]}`;
  }
  return pathId;
}

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { children, menuData } = props;
    const { activedTabs, activeKey } = state;
    const activedTabsLength = activedTabs.length;
    const {
      props: {
        location: { pathname: childrenPathname },
      },
    } = children;
    console.log(activeKey);
    console.log(childrenPathname);

    const pathId = generatePathId(childrenPathname);
    if (_find(activedTabs, { tabId: pathId })) {
      const index = _findIndex(activedTabs, { tabId: pathId });
      if (index > -1) {
        const { content, ...rest } = activedTabs[index];
        activedTabs.splice(index, 1, {
          content: children,
          ...rest,
        });
        return {
          activedTabs,
          activeKey: pathId,
        };
      }
    }
    return {
      activedTabs: [
        ...activedTabs,
        {
          tab: getTabName(pathId, menuData),
          path: childrenPathname,
          tabId: pathId,
          closable: true,
          content: children,
        },
      ].map((item, index) =>
        activedTabsLength === 0 && index === 0
          ? { ...item, closable: false }
          : { ...item, closable: true }
      ),
      activeKey: pathId,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activedTabs: [],
      activeKey: null,
    };
  }

  componentDidMount() {
    const {
      dispatch,
      // route: { routes, path, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    // dispatch({
    //   type: 'menu/getMenuData',
    //   payload: { routes, path, authority },
    // });
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    if (
      process.env.NODE_ENV === 'production' &&
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION !== 'site'
    ) {
      return null;
    }
    return <SettingDrawer />;
  };

  handleTabChange = key => {
    // console.log(key);
    // this.setState({ activeKey: key });
    router.push(key);
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    const { activedTabs } = this.state;
    const targetIndex = _findIndex(activedTabs, { tabId: targetKey });
    const nextTabKey = activedTabs[targetIndex > 0 ? targetIndex - 1 : targetIndex + 1].tabId;
    router.push(nextTabKey);
    this.setState(
      {
        activedTabs: activedTabs.filter(item => item.key !== targetKey),
      },
      () => {
        const { activedTabs: newActivedTabs } = this.state;
        if (newActivedTabs.length === 1) {
          this.setState({
            activedTabs: newActivedTabs.map(item => ({ ...item, closable: false })),
          });
        }
      }
    );
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
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
      menuLoading,
    } = this.props;
    const { activedTabs, activeKey } = this.state;

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const menu = (
      <Menu onClick={this.handleTabsMenuClick}>
        <Menu.Item key={closeCurrentTabMenuKey}>关闭当前标签页</Menu.Item>
        <Menu.Item key={closeOthersTabMenuKey}>关闭其他标签页</Menu.Item>
      </Menu>
    );
    const operations = (
      <Dropdown overlay={menu}>
        <a className={styles.antDropdownLink} href="#">
          标签菜单&nbsp;
          <Icon type="down" />
        </a>
      </Dropdown>
    );
    const tabsPage =
      activedTabs && activedTabs.length ? (
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
          onEdit={this.onEdit}
        >
          {activedTabs.map(item => {
            return (
              <TabPane tab={item.tab} key={item.tabId} closable={item.closable}>
                {/* <Route key={item.key} path={item.path} component={item.content} exact={item.exact} /> */}
                {item.content}
                {/* {children} */}
              </TabPane>
            );
          })}
        </Tabs>
      ) : (
        children
      );
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            minHeight: '100vh',
            ...this.getLayoutStyle(),
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {!menuLoading && tabsPage}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <Spin spinning={menuLoading}>
            <ContainerQuery query={query}>
              {params => (
                <Context.Provider value={this.getContext()}>
                  <div className={classNames(params)}>{layout}</div>
                </Context.Provider>
              )}
            </ContainerQuery>
          </Spin>
        </DocumentTitle>
        <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel, loading }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,

  routerData: menuModel.routerData,
  menuLoading: loading.effects['menu/getMenuData'],
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
