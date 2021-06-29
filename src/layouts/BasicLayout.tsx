/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, history, useIntl } from 'umi';
import { getMatchMenu } from '@umijs/route-utils';
import { Result, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  DefaultFooter,
} from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { isProductionEnv } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import { DefaultSettings } from '../../config/defaultSettings';
import SwitchTabsLayout from './SwitchTabsLayout';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';

const noMatch = (
  <Result
    status={403}
    title='403'
    subTitle='Sorry, you are not authorized to access this page.'
    extra={
      <Button type='primary'>
        <Link to='/user/login'>Go Login</Link>
      </Button>
    }
  />
);

export interface BasicLayoutProps extends Omit<ProLayoutProps, 'children'> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: DefaultSettings;
  dispatch: Dispatch;
  children: React.ReactElement;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright='2021 theprimone 出品'
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/theprimone/ant-design-pro-plus',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    location = {
      pathname: '/',
    },
    settings,
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  if (isProductionEnv) {
    setAuthority('admin');
  }

  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      className={settings.routeTabs?.mode && styles.customByPageTabs}
      logo={logo}
      formatMessage={formatMessage}
      {...props}
      {...settings}
      onCollapse={collapsed => {
        handleMenuCollapse(collapsed);
      }}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
            <span>{route.breadcrumbName}</span>
          );
      }}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        <SwitchTabsLayout
          mode={settings?.routeTabs?.mode}
          persistent={settings?.routeTabs?.persistent}
          fixed={settings?.routeTabs?.fixed}
          routes={props.route.routes!}
          footerRender={() => {
            if (settings.footerRender || settings.footerRender === undefined) {
              return defaultFooterDom;
            }
            return null;
          }}
        >
          {children}
        </SwitchTabsLayout>
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
